const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Post = require('../models/Blog');
const Structure = require('../models/Struktur'); 
const { auth, isAdmin } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const beritaRouter = require('./berita');

router.get('/dashboard', auth, isAdmin, adminController.getDashboard);
router.put('/user/update-socials', auth, isAdmin, adminController.updateSocialLinks);

router.get('/struktur', async (req, res) => {
    try {
        const data = await Structure.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data" });
    }
});


router.get('/users', auth, isAdmin, adminController.getAllUsers);

router.get('/users/:id', auth, isAdmin, adminController.getUserById);

router.delete('/users/:id', auth, isAdmin, adminController.deleteUser);
router.patch('/users/:id/role', auth, isAdmin, adminController.updateUserRole);

router.use('/berita', auth, isAdmin, beritaRouter);

module.exports = router;