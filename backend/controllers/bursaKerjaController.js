const BursaKerja = require('../models/bursaKerja');

exports.createBursaKerja = async (req, res) => {
  try {
    const { posisi, perusahaan, lokasi, deadline, status } = req.body;
    
    const lowonganBaru = new BursaKerja({
      posisi,
      perusahaan,
      lokasi,
      deadline: new Date(deadline),
      status
    });

    const savedData = await lowonganBaru.save();
    res.status(201).json({ success: true, data: savedData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllBursaKerja = async (req, res) => {
  try {
    const daftarLowongan = await BursaKerja.find().sort({ createdAt: -1 });
    res.status(200).json(daftarLowongan);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data dari database' });
  }
};
exports.getBursaKerjaById = async (req, res) => {
  try {
    const lowongan = await BursaKerja.findById(req.params.id);
    if (!lowongan) {
      return res.status(404).json({ success: false, message: 'Lowongan tidak ditemukan' });
    }
    res.status(200).json(lowongan);
  } catch (error) {
    res.status(500).json({ success: false, message: 'ID tidak valid atau terjadi kesalahan' });
  }
};
exports.updateBursaKerja = async (req, res) => {
  try {
    const updatedData = await BursaKerja.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ success: false, message: 'Lowongan tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteBursaKerja = async (req, res) => {
  try {
    const deletedLowongan = await BursaKerja.findByIdAndDelete(req.params.id);
    
    if (!deletedLowongan) {
      return res.status(404).json({ success: false, message: 'Lowongan tidak ditemukan' });
    }

    res.status(200).json({ success: true, message: 'Lowongan kerja berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};