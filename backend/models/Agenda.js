const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  namaAgenda: {
    type: String,
    required: [true, 'Nama agenda harus diisi'],
    trim: true
  },
  pimpinanRapat: {
    type: String,
    required: [true, 'Pimpinan rapat harus diisi'],
    default: '-'
  },
  oleh: {
    type: String,
    required: [true, 'Pihak penyelenggara (Oleh) harus diisi'],
    default: 'Sekretariat'
  },
  waktuPelaksanaan: {
    type: Date,
    required: [true, 'Waktu pelaksanaan harus diisi']
  },
  tempat: {
    type: String,
    required: [true, 'Tempat pelaksanaan harus diisi'],
    trim: true
  },
  keterangan: {
    type: String,
    default: ''
  },
  foto: { type: String, 
    default: '' 
  },
  status: {
    type: String,
    enum: ['Mendatang', 'Selesai', 'Batal'],
    default: 'Mendatang'
  }
}, { 
  collection: 'agenda', 
  timestamps: true 
});

module.exports = mongoose.model('Agenda', AgendaSchema);