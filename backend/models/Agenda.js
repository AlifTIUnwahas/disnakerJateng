const mongoose = require('mongoose');
const AgendaSchema = new mongoose.Schema({
        photo: {
            url: { type: String },
            context: { type: String }
        },
        title: { type: String, required: true },
        pimpinan: { type: String },
        oleh: { type: String },
        tempat: { type: String },
        tanggal: { type: Date, required: true },
        waktu: { type: String },
    }, { timestamps: true, collection: 'agenda' });

module.exports = mongoose.model('Agenda', AgendaSchema);