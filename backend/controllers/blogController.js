const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
  const { search, category } = req.query;

  // Filter berdasarkan search dan kategori
  const query = {
    ...(search && { title: { $regex: search, $options: 'i' } }), // Pencarian berdasarkan judul
    ...(category && { category: category }), // Filter berdasarkan kategori
  };

  try {
    const blogs = await Blog.find(query);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog', error: error.message });
  }
};

const createBlog = async (req, res) => {
  const { title, category, content, author } = req.body;
  const thumbnail = req.file ? req.file.path : null;

  if (!thumbnail) {
    return res.status(400).json({ message: 'Thumbnail is required' });
  }

  try {
    const newBlog = await Blog.create({
      title,
      category,
      thumbnail,
      content,
      author,
    });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog', error: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { title, category, content, author } = req.body;
  const thumbnail = req.file ? req.file.path : undefined;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, category, content, author, ...(thumbnail && { thumbnail }), updatedDate: Date.now() },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog', error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog', error: error.message });
  }
};



module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
