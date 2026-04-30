const mongoose = require('mongoose');

const StructureSchema = new mongoose.Schema({
    struktur_organisasi: [{
        no: Number,
        nama: String,
        jabatan_kedinasan: String,
        jabatan_ppid: String
    }]}, { collection: 'struktur' });

module.exports = mongoose.model('Structure', StructureSchema);