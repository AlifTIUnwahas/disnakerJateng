const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Ganti dengan URI MongoDB Anda (Lokal atau Atlas)
        const mongoURI = 'mongodb://localhost:27017/dbPpid'; 
        
        await mongoose.connect(mongoURI);
        console.log('MongoDB Terhubung...');
    } catch (err) {
        console.error('Koneksi Gagal:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;