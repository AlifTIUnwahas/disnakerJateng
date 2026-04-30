const User = require('../models/User');
const Blog = require('../models/Blog');

// GET /api/admin/dashboard
exports.getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBlogs = await Blog.countDocuments();

        const usersByRole = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);

        const recentUsers = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);

        const recentBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            stats: {
                totalUsers,
                totalBlogs,
                usersByRole
            },
            recentUsers,
            recentBlogs
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/admin/users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User tidak ditemukan' });

        await user.deleteOne();
        res.json({ message: 'User berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PATCH /api/admin/users/:id/role
exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        const allowedRoles = ['admin', 'editor', 'viewer'];
        if (!allowedRoles.includes(role))
            return res.status(400).json({ message: 'Role tidak valid' });

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');

        if (!user)
            return res.status(404).json({ message: 'User tidak ditemukan' });

        res.json({ message: 'Role berhasil diupdate', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};