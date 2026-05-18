const mongoose = require('mongoose');

const bursaKerjaSchema = new mongoose.Schema({
  posisi: {
    type: String,
    required: [true, 'Posisi atau judul lowongan wajib diisi']
  },
  perusahaan: {
    type: String,
    required: [true, 'Nama perusahaan wajib diisi']
  },
  lokasi: {
    type: String,
    required: [true, 'Lokasi (Kabupaten/Kota) wajib diisi']
  },
  deadline: {
    type: Date,
    required: [true, 'Tanggal batas lamaran wajib diisi']
  },
  status: {
    type: String,
    enum: ['Aktif', 'Nonaktif'],
    default: 'Aktif'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  collection: 'bursaKerja' 
});

module.exports = mongoose.model('BursaKerja', bursaKerjaSchema);