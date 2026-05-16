const User = require('../models/User');
const Blog = require('../models/Blog');
const mongoose = require('mongoose');
 
const makeSlug = (title) => {
    if (!title) return '';
    return title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
        .replace(/\-+/g, '-');
};

const buildPhotoUrl = (req, filename) =>
    `${req.protocol}://${req.get('host')}/images/${filename}`;
 

exports.getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBlogs = await Blog.countDocuments();
        const usersByRole = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);
        const recentUsers = await User.find().select('-password').sort({ createdAt: -1 }).limit(5);
        const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);
 
        res.json({ stats: { totalUsers, totalBlogs, usersByRole }, recentUsers, recentBlogs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User tidak ditemukan' 
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.updateSocialLinks = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId; 

        const { linkedin, github, instagram } = req.body;

        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "ID User tidak valid atau token kadaluarsa." 
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'socialLinks.linkedin.url': linkedin || "",
                    'socialLinks.linkedin.isEnabled': !!linkedin,
                    'socialLinks.github.url': github || "",
                    'socialLinks.github.isEnabled': !!github,
                    'socialLinks.instagram.url': instagram || "",
                    'socialLinks.instagram.isEnabled': !!instagram
                }
            },
            { returnDocument: 'after', runValidators: false }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ 
                success: false, 
                message: "User tidak ditemukan." 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Social links berhasil diperbarui", 
            data: updatedUser.socialLinks 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
        await user.deleteOne();
        res.json({ message: 'User berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const allowedRoles = ['admin', 'editor', 'viewer'];
        if (!allowedRoles.includes(role))
            return res.status(400).json({ message: 'Role tidak valid' });
 
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json({ message: 'Role berhasil diupdate', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const data = await Blog.find({}).sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPostByIdentifier = async (req, res) => {
    try {
        const idOrSlug = req.params.slug;
        let post = null;
        if (mongoose.Types.ObjectId.isValid(idOrSlug)) post = await Blog.findById(idOrSlug);
        if (!post) post = await Blog.findOne({ slug: idOrSlug });
        if (!post) return res.status(404).json({ message: 'Berita tidak ditemukan' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil data' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content, author, category, tags, status, slug, date } = req.body || {};
 
        if (!title || !content) {
            return res.status(400).json({ message: 'Judul dan konten berita diperlukan' });
        }
 
        let finalSlug = slug || makeSlug(title);
        const exists = await Blog.findOne({ slug: finalSlug });
        if (exists) finalSlug = `${finalSlug}-${Date.now()}`;
 
        const postData = {
            title,
            slug: finalSlug,
            content: Array.isArray(content)
                ? content
                : content
                    ? content.split('\n').filter(Boolean)
                    : [],
            author,
            category,
            tags: typeof tags === 'string'
                ? tags.split(',').map(t => t.trim()).filter(Boolean)
                : (tags || []),
            status: status || 'draft',
            date: date || new Date(),
        };

        if (req.file) {
            postData.photo = {
                url:     buildPhotoUrl(req, req.file.filename),
                context: req.file.originalname,
            };
        }
 
        const post = await Blog.create(postData);
        res.status(201).json(post);
    } catch (err) {
        if (err.code === 11000)
            return res.status(409).json({ message: 'Slug sudah digunakan' });
        res.status(500).json({ message: err.message });
    }
};
 
// PUT /api/admin/berita/:id
exports.updatePost = async (req, res) => {
    try {
        const update = { ...(req.body || {}) };
 
        if (req.file) {
            update.photo = {
                url:     buildPhotoUrl(req, req.file.filename),
                context: req.file.originalname,
            };
        }
 
        if (update.title && !update.slug) update.slug = makeSlug(update.title);
 
        if (update.tags && typeof update.tags === 'string') {
            update.tags = update.tags.split(',').map(t => t.trim()).filter(Boolean);
        }
 
        if (update.content && !Array.isArray(update.content)) {
            update.content = update.content.split('\n').filter(Boolean);
        }
 
        const post = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!post) return res.status(404).json({ message: 'Berita tidak ditemukan' });
        res.json(post);
    } catch (err) {
        if (err.code === 11000)
            return res.status(409).json({ message: 'Slug sudah digunakan' });
        res.status(500).json({ message: err.message });
    }
};
 
exports.deletePost = async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Berita tidak ditemukan' });
        await post.deleteOne();
        res.json({ message: 'Berita berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};