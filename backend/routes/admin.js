const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Post = require('../models/Blog');
const Structure = require('../models/Struktur'); 
const {auth, isAdmin} = require('../middleware/auth');
const adminController = require('../controllers/adminController');


router.get('/dashboard', auth, isAdmin, adminController.getDashboard);
router.get('/users', auth, isAdmin, adminController.getAllUsers);
router.delete('/users/:id', auth, isAdmin, adminController.deleteUser);
router.patch('/users/:id/role', auth, isAdmin, adminController.updateUserRole);
router.get('/berita', async (req, res) => {
    try {
        const data = await Post.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data" });
    }
});
router.get('/berita/:slug', async (req, res) => {
  try {
    const data = await Post.findOne({ slug: req.params.slug });
    if (!data) return res.status(404).json({ message: "Berita tidak ditemukan" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data" });
  }
});
router.get('/struktur', async (req, res) => {
    try {
        const data = await Structure.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data" });
    }
});

// router.get('/users', isAdmin, getAllUsers);

module.exports = router;