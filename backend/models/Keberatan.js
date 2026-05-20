const mongoose = require('mongoose');

const KeberatanSchema = new mongoose.Schema({
    permohonanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permohonan',
        required: true
    },
    kodePermohonan: {
        type: String,
        required: true
    },
    nik: {
        type: String,
        required: true
    },
    alasanKeberatan: [{
        type: String,
        required: true
    }],
    kronologi: {
        type: String,
        required: true
    },
    fileSuratKeberatan: {
        type: String,
        required: true
    },
    statusKeberatan: {
        type: String,
        enum: ['Dalam Tinjauan', 'Diterima', 'Ditolak'],
        default: 'Dalam Tinjauan'
    }
}, { collection: 'keberatanInfo', timestamps: true });

module.exports = mongoose.model('Keberatan', KeberatanSchema);