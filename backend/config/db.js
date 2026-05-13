const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Ganti dengan URI MongoDB Anda (Lokal atau Atlas)
        const mongoURI = 'mongodb://blackSuede994:Azizyalif9@ac-ym7ujjt-shard-00-00.ldtl6zh.mongodb.net:27017,ac-ym7ujjt-shard-00-01.ldtl6zh.mongodb.net:27017,ac-ym7ujjt-shard-00-02.ldtl6zh.mongodb.net:27017/?ssl=true&replicaSet=atlas-m31a7c-shard-0&authSource=admin&appName=ppidDisnakertrans'; 
        
        await mongoose.connect(mongoURI);
        console.log('MongoDB Terhubung...');
    } catch (err) {
        console.error('Koneksi Gagal:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;