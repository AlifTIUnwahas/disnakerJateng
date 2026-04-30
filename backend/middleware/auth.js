const jwt  = require('jsonwebtoken');
const User = require('../models/User');


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
        if (!token)
            return res.status(401).json({ message: 'Tidak ada token, akses ditolak' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user)
            return res.status(401).json({ message: 'User tidak ditemukan' });

        next();
    } catch (err) {
        res.status(401).json({ message: 'Token tidak valid' });
    }
};


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Akses ditolak, Anda bukan admin!' });
    }
};


const isEditor = (req, res, next) => {
    if (req.user && req.user.role === 'editor') {
        next();
    } else {
        res.status(403).json({ message: 'Akses ditolak, Anda bukan editor!' });
    }
};




const requireRole = (...roles) => (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
        next();
    } else {
        res.status(403).json({ 
            message: `Akses ditolak, hanya untuk role: ${roles.join(', ')}` 
        });
    }
};

module.exports = { auth, isAdmin, isEditor, requireRole };