const Keberatan = require('../models/Keberatan');
const Permohonan = require('../models/Permohonan');

exports.getAllKeberatan = async (req, res) => {
    try {
        const keberatanList = await Keberatan.find().sort({ createdAt: -1 }).lean();
        res.status(200).json({
            success: true,
            count: keberatanList.length,
            data: keberatanList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data keberatan.',
            error: error.message
        });
    }
};

exports.cekValidasiPermohonan = async (req, res) => {
    try {
        const { kodePermohonan, nik } = req.body;
        const dataPermohonan = await Permohonan.findOne({ 
            kodePermohonan: kodePermohonan, 
            nikIdentitas: nik 
        });

        if (!dataPermohonan) {
            return res.status(404).json({ 
                success: false, 
                message: 'Data permohonan tidak ditemukan. Pastikan Kode Permohonan dan NIK Anda benar.' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Data permohonan valid!',
            permohonanId: dataPermohonan._id,
            namaPemohon: dataPermohonan.namaPemohon
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createKeberatan = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'File surat keberatan wajib diunggah!' 
            });
        }

        const fileSuratPath = `/images/${req.file.filename}`;
        let alasan = req.body.alasanKeberatan;
        if (typeof alasan === 'string') {
            alasan = JSON.parse(alasan);
        }

        const dataKeberatan = new Keberatan({
            permohonanId: req.body.permohonanId,
            kodePermohonan: req.body.kodePermohonan,
            nik: req.body.nik,
            alasanKeberatan: alasan,
            kronologi: req.body.kronologi,
            fileSuratKeberatan: fileSuratPath
        });

        const savedData = await dataKeberatan.save();

        res.status(201).json({
            success: true,
            message: 'Pengajuan keberatan Anda berhasil dikirim dan akan segera ditinjau!',
            data: savedData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memproses pengajuan keberatan',
            error: error.message
        });
    }
};