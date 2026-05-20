const mongoose = require('mongoose');

const PermohonanSchema = new mongoose.Schema({
    kodePermohonan: {
        type: String,
        required: true,
        unique: true
    },
    kategoriPermohonan: {
        type: String,
        enum: ['Perorangan', 'Lembaga', 'Kelompok'],
        required: true
    },
    nikIdentitas: {
        type: String,
        required: true,
        trim: true
    },
    namaPemohon: {
        type: String,
        required: true,
        trim: true
    },
    alamat: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    nomorTelepon: {
        type: String,
        required: true
    },
    pekerjaan: {
        type: String,
        default: ""
    },
    fileKtp: {
        type: String, 
        required: true
    },
    fileDokumenTambahan: {
        type: String,
        default: null
    },
    rincianInformasi: {
        type: String,
        required: true
    },
    tujuanPenggunaan: {
        type: String,
        required: true
    },
    caraMemperolehInformasi: {
        type: String,
        enum: ['Melihat', 'Membaca', 'Mendengarkan', 'Mencatat'],
        required: true
    },
    mendapatkanSalinan: {
        type: String,
        enum: ['Softcopy', 'Hardcopy'],
        required: true
    },
    caraMendapatkanSalinan: {
        type: String,
        enum: ['Mengambil Langsung', 'Faksimili', 'Email'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Diproses', 'Selesai', 'Ditolak'],
        default: 'Pending'
    }
}, { collection: 'permohonanInfo', timestamps: true });

module.exports = mongoose.model('Permohonan', PermohonanSchema);