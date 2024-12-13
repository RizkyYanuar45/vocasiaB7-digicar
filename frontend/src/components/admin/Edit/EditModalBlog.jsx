import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import axios from "axios";

function EditModal({ isOpen, onClose, blogData, onBlogUpdated, blogs }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      setAuthor(blogData.author);
      setCategory(blogData.category);
      setContent(blogData.content);
      setOldImage(blogData.thumbnail || ""); 
      setImage(null); 
    }
  }, [isOpen, blogData]);

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWFkOTQzMDQwMDQ0ODU2MzRjMDdjNiIsImlhdCI6MTczNDAyMDA3NCwiZXhwIjoxNzM2NjEyMDc0fQ.19rMe5i0d5KcY5pX1GVrrAx2PZd7NzOzwoyXFSOhSLM"; // Replace with a valid token

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogData || !blogData._id) {
      setErrorMessage("ID blog tidak ditemukan.");
      return;
    }

    const categoryCount = blogs.filter((blog) => blog.category === category).length;
    if (categoryCount >= 4) {
      setErrorMessage(`Kategori "${category}" sudah memiliki 4 blog. Tidak dapat mengedit lagi!`);
      return;s
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("content", content);
    
    if (image) formData.append("thumbnail", image); 
    else formData.append("thumbnail", oldImage);

    try {
      const response = await axios.put(`http://localhost:5000/api/blog/${blogData._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      console.log("Blog successfully updated:", response);

      onBlogUpdated(response.data); 

      onClose(); 
    } catch (error) {
      console.error("Error updating blog:", error);

      if (error.response && error.response.status === 401) {
        setErrorMessage("Unauthorized: Please login.");
      } else if (error.response && error.response.status === 400) {
        setErrorMessage("Bad Request: Check your input.");
      } else {
        setErrorMessage("An error occurred while updating the blog. Please try again.");
      }
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50" aria-hidden="true">
      <div className="relative p-6 w-full max-w-4xl">
        <div className="relative bg-secondary rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-text">Edit Blog</h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-text">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type blog title"
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="author" className="block mb-2 text-sm font-medium text-text">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  id="author"
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Ex: John Doe"
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-text">
                  Blog Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option value="">Select Category</option>
                  <option value="Seputar Mobil">Seputar Mobil</option>
                  <option value="Destinasi Populer">Destinasi Populer</option>
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-text">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                />
                {image ? (
                  <div className="mt-2">
                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-32 h-32 object-cover" />
                  </div>
                ) : oldImage ? (
                  <div className="mt-2">
                    <img src={`http://localhost:5000/${oldImage}`} alt="Old" className="w-32 h-32 object-cover" />
                  </div>
                ) : null}
              </div>

              <div className="col-span-2 sm:col-span-2">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-text">
                  Blog Content
                </label>
                <ReactQuill value={content} onChange={setContent} theme="snow" className="h-28 overflow-y-auto min-w-screen" />
              </div>
            </div>

            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Edit Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
