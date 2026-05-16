const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const mongoose = require('mongoose');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const data = await Blog.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data' });
  }
});

// GET by id or slug
router.get('/:identifier', async (req, res) => {
  try {
    const idOrSlug = req.params.identifier;
    let post = null;
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      post = await Blog.findById(idOrSlug);
    }
    if (!post) post = await Blog.findOne({ slug: idOrSlug });
    if (!post) return res.status(404).json({ message: 'Berita tidak ditemukan' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
