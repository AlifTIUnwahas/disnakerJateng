const Permohonan = require('../models/Permohonan');

exports.getAllPermohonan = async (req, res) => {
    try {
        const permohonanList = await Permohonan.find().sort({ createdAt: -1 }).lean();
        res.status(200).json({
            success: true,
            count: permohonanList.length,
            data: permohonanList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data permohonan.',
            error: error.message
        });
    }
};

exports.createPermohonan = async (req, res) => {
    try {
        if (!req.files || !req.files['fileKtp']) {
            return res.status(400).json({ 
                success: false, 
                message: 'Gagal mengirim! Berkas file KTP wajib diunggah.' 
            });
        }

        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        const kodeUnik = `PPID-${randomDigits}`;

        const fileKtpPath = `/images/${req.files['fileKtp'][0].filename}`;
        
        let fileDokumenTambahanPath = null;
        if (req.files['fileDokumenTambahan']) {
            fileDokumenTambahanPath = `/images/${req.files['fileDokumenTambahan'][0].filename}`;
        }
        const dataPermohonan = new Permohonan({
            kodePermohonan: kodeUnik,
            kategoriPermohonan: req.body.kategoriPermohonan,
            nikIdentitas: req.body.nikIdentitas,
            namaPemohon: req.body.namaPemohon,
            alamat: req.body.alamat,
            email: req.body.email,
            nomorTelepon: req.body.nomorTelepon,
            pekerjaan: req.body.pekerjaan || "",
            fileKtp: fileKtpPath,
            fileDokumenTambahan: fileDokumenTambahanPath,
            rincianInformasi: req.body.rincianInformasi,
            tujuanPenggunaan: req.body.tujuanPenggunaan,
            caraMemperolehInformasi: req.body.caraMemperolehInformasi,
            mendapatkanSalinan: req.body.mendapatkanSalinan,
            caraMendapatkanSalinan: req.body.caraMendapatkanSalinan
        });
        const savedData = await dataPermohonan.save();

        res.status(201).json({
            success: true,
            message: 'Permohonan Informasi Publik berhasil disimpan ke database!',
            data: savedData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan sistem server saat memproses permohonan.',
            error: error.message
        });
    }
};