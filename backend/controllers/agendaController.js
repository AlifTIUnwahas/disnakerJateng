const Agenda = require('../models/Agenda');

exports.getAllAgenda = async (req, res) => {
  try {
    const agendas = await Agenda.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: agendas.length,
      data: agendas
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengambil data agenda',
      error: error.message 
    });
  }
};

exports.getAgendaById = async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id);

    if (!agenda) {
      return res.status(404).json({
        success: false,
        message: 'Agenda tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: agenda
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengambil detail agenda',
      error: error.message 
    });
  }
};

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
      message: 'Agenda baru dengan gambar berhasil ditambahkan',
      data: newAgenda
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};