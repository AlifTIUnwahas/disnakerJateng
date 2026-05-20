const Agenda = require('../models/Agenda');

// ── GET ALL ───────────────────────────────────────────────────────────────────
exports.getAllAgenda = async (req, res) => {
  try {
    const agendas = await Agenda.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: agendas.length,
      data: agendas
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data agenda', error: error.message });
  }
};

// ── GET BY ID ─────────────────────────────────────────────────────────────────
exports.getAgendaById = async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id);
    if (!agenda) {
      return res.status(404).json({ success: false, message: 'Agenda tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: agenda });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil detail agenda', error: error.message });
  }
};

// ── CREATE ────────────────────────────────────────────────────────────────────
exports.createAgenda = async (req, res) => {
  try {
    const { namaAgenda, pimpinanRapat, oleh, waktuPelaksanaan, tempat, keterangan, status } = req.body;

    let fotoPath = '';
    if (req.file) {
      fotoPath = `/images/${req.file.filename}`;
    }

    const newAgenda = await Agenda.create({
      namaAgenda,
      pimpinanRapat,
      oleh,
      waktuPelaksanaan,
      tempat,
      keterangan,
      foto: fotoPath,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Agenda berhasil ditambahkan',
      data: newAgenda
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── UPDATE ────────────────────────────────────────────────────────────────────
exports.updateAgenda = async (req, res) => {
  try {
    const existing = await Agenda.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Agenda tidak ditemukan' });
    }

    const { namaAgenda, pimpinanRapat, oleh, waktuPelaksanaan, tempat, keterangan, status } = req.body;

    // Jika ada file baru, ganti foto; jika tidak, pertahankan foto lama
    let fotoPath = existing.foto;
    if (req.file) {
      fotoPath = `/images/${req.file.filename}`;
    }

    const updatedAgenda = await Agenda.findByIdAndUpdate(
      req.params.id,
      { namaAgenda, pimpinanRapat, oleh, waktuPelaksanaan, tempat, keterangan, foto: fotoPath, status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Agenda berhasil diperbarui',
      data: updatedAgenda
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── DELETE ────────────────────────────────────────────────────────────────────
exports.deleteAgenda = async (req, res) => {
  try {
    const deleted = await Agenda.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Agenda tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Agenda berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};