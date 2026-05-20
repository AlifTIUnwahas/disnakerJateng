const mongoose = require('mongoose');

const KecualiSchema =new mongoose.Schema({ 
  sub_kategori: { type: String, required: true },
  judul: { type: String, required: true },
  ringkasan_informasi: { type: String, required: true },
  unit_menguasai: { type: String, required: true },
  penanggung_jawab: { type: String, required: true },
  tahun: { type: Number, required: true },
  retensi_arsip: { type: String, required: true },
  file_url: { type: String, required: true }
}, { collection: 'infoKecuali' });

module.exports = mongoose.model('infoKecuali', KecualiSchema);