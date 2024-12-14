import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import axios from "axios";

function CreateModal({ isOpen, onClose, onBlogCreated, blogs }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const categoryCount = blogs.filter((blog) => blog.category === category).length;
      if (categoryCount >= 4) {
        setErrorMessage(`Kategori "${category}" sudah memiliki 4 blog. Tidak dapat menambahkan lebih banyak.`);
        return;
      }
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("content", content);
      if (image) formData.append("thumbnail", image);
  
      try {
        const response = await axios.post("http://localhost:5000/api/blog/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
  
        onBlogCreated(response.data);
        onClose();
      } catch (error) {
        console.error("Error mengirim blog:", error);
        setErrorMessage("Terjadi kesalahan saat mengirim blog. Coba lagi.");
      }
    };

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
      aria-hidden="true"
    >
      <div className="relative p-6 w-full max-w-4xl">
        {/* Modal content */}
        <div className="relative bg-secondary rounded-lg shadow">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-text">Buat Blog Baru</h3>
            <button
              onClick={onClose} // Menutup modal
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Tutup modal</span>
            </button>
          </div>

          {/* Modal body */}
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            {/* Pesan Error */}
            {errorMessage && (
              <div className="text-red-600 mb-4">{errorMessage}</div>
            )}

            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Judul Blog
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Tulis judul blog"
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="author"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Nama Penulis
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  id="author"
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Misal: John Doe"
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Kategori Blog
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option value="">Pilih kategori</option>
                  <option value="Seputar Mobil">Seputar Mobil</option>
                  <option value="Destinasi Populer">Destinasi Populer</option>
                </select>
              </div>

              {/* Unggah Gambar Thumbnail */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="thumbnail"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Unggah Gambar Thumbnail
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                />
                {/* Preview Gambar */}
                {image && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Konten Blog */}
              <div className="col-span-2 sm:col-span-2">
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Konten Blog
                </label>
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  theme="snow"
                  className="h-28 overflow-y-auto min-w-screen"
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Tambahkan Blog Baru
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;