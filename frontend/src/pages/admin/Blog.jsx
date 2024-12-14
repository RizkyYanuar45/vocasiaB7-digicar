import React, { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar";
import { Search, Plus, Pen, Trash } from "lucide-react";
import axios from "axios";
import CreateModal from "../../components/admin/Create/CreateModalBlog";
import EditModal from "../../components/admin/Edit/EditModalBlog";
import AlertDelete from "../../components/admin/Notification/AlertDelete";

export const Blog = () => {
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setErrorMessage("Failed to load blogs.");
      }
    };
    fetchBlogs();
  }, []);

  const handleOpenCreateModal = () => setIsCreateModal(true);
  const handleCloseCreateModal = () => setIsCreateModal(false);

  const handleOpenEditModal = (blog) => {
    setSelectedBlog(blog);
    setIsEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModal(false);
    setSelectedBlog(null);
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = AlertDelete(() => deleteBlog(blogId));
    confirmDelete();
  };

  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog.");
    }
  };

  const handleBlogCreated = (newBlog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  const handleBlogUpdated = (updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      )
    );
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("id-ID", options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row w-screen bg-red-500 font-main">
      <Navbar />
      {/* Main Section */}
      <section className="relative w-full max-w-full overflow-hidden text-text pt-16 md:pt-0">
        <div className="bg-secondary relative shadow-md overflow-hidden lg:ml-44">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-2 p-4 bg-primary">
            <div className="w-full md:w-1/2">
              <form className="flex items-center w-full">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 bg-secondary"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="flex items-center justify-center text-text bg-white-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <Plus className="mr-3 w-4 h-4 md:w-6 md:h-6" />
                Add Blog
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-text table-fixed">
              <thead className="text-xs uppercase bg-primary text-white-50">
                <tr>
                  <th className="px-2 py-1">Thumbnail</th>
                  <th className="px-2 py-1">Title</th>
                  <th className="px-2 py-1">Author</th>
                  <th className="px-2 py-1">Content</th>
                  <th className="px-2 py-1">Category</th>
                  <th className="px-2 py-1">Published Date</th>
                  <th className="px-2 py-1">Updated Date</th>
                  <th className="px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map(
                  (
                    blog // Use filtered blogs for rendering
                  ) => (
                    <tr key={blog._id} className="border-b border-black">
                      <th
                        scope="row"
                        className="px-2 py-1 font-medium whitespace-nowrap"
                      >
                        <img
                          src={`http://localhost:5000/${blog.thumbnail}`}
                          alt="Thumbnail"
                          width={100}
                          height={100}
                          className="max-w-full"
                        />
                      </th>
                      <td className="px-2 py-1 truncate">{blog.title}</td>
                      <td className="px-2 py-1 truncate">{blog.author}</td>
                      <td className="px-2 py-1 max-w-[10rem] truncate">
                        {blog.content}
                      </td>
                      <td className="px-2 py-1">{blog.category}</td>
                      <td className="px-2 py-1">
                        {formatDate(blog.publishedDate)}
                      </td>
                      <td className="px-2 py-1">
                        {blog.updatedDate ? formatDate(blog.updatedDate) : "-"}
                      </td>
                      <td className="px-2 py-1">
                        <div
                          onClick={() => handleOpenEditModal(blog)}
                          className="flex items-center bg-blue-700 text-white-50 p-1 rounded-xl justify-center cursor-pointer"
                        >
                          <Pen width={15} className="mr-2 md:mr-6" />
                          Edit
                        </div>
                        <div
                          onClick={() => handleDelete(blog._id)}
                          className="flex items-center bg-red-700 justify-center text-white-50 p-1 rounded-xl cursor-pointer"
                        >
                          <Trash width={15} className="mr-2 md:mr-3" />
                          Delete
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Create Blog Modal */}
      <CreateModal
        isOpen={isCreateModal}
        onClose={handleCloseCreateModal}
        onBlogCreated={handleBlogCreated}
        blogs={blogs}
      />

      {/* Edit Blog Modal */}
      {selectedBlog && (
        <EditModal
          isOpen={isEditModal}
          onClose={handleCloseEditModal}
          blogData={selectedBlog}
          onBlogUpdated={handleBlogUpdated}
          blogs={blogs}
        />
      )}
    </div>
  );
};
