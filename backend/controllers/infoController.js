const infoBerkala = require('../models/Berkala');
const infoSertaMerta = require('../models/Serta');
const infoSelalu = require('../models/tiapSaat');
const infoKecuali = require('../models/infoKecuali');
const infoPublik = require('../models/InfoPublik');

const getModelByKategori = (kategori) => {
  if (!kategori) return null;
  
  const cleanKategori = kategori.toLowerCase().trim();

  if (cleanKategori.includes('berkala')) return infoBerkala;
  if (cleanKategori.includes('serta_merta') || cleanKategori.includes('serta merta')) return infoSertaMerta;
  if (cleanKategori.includes('setiap_saat') || cleanKategori.includes('setiap saat')) return infoSelalu;
  if (cleanKategori.includes('dikecualikan')) return infoKecuali;
  if (cleanKategori.includes('publik')) return infoPublik;

  return null;
};

exports.getAllInformasi = async (req, res) => {
  try {
    const [berkala, sertaMerta, setiapSaat, dikecualikan, publik] = await Promise.all([
      infoBerkala.find().lean(),
      infoSertaMerta.find().lean(),
      infoSelalu.find().lean(),
      infoKecuali.find().lean(),
      infoPublik.find().lean()
    ]);

    const dataBerkala = berkala.map(item => ({ ...item, _id: item._id.toString(), kategori: 'berkala' }));
    const dataSertaMerta = sertaMerta.map(item => ({ ...item, _id: item._id.toString(), kategori: 'serta_merta' }));
    const dataSetiapSaat = setiapSaat.map(item => ({ ...item, _id: item._id.toString(), kategori: 'setiap_saat' }));
    const dataDikecualikan = dikecualikan.map(item => ({ ...item, _id: item._id.toString(), kategori: 'dikecualikan' }));
    const dataPublik = publik.map(item => ({ ...item, _id: item._id.toString(), kategori: 'publik' }));

    const allData = [...dataBerkala, ...dataSertaMerta, ...dataSetiapSaat, ...dataDikecualikan, ...dataPublik];

    allData.sort((a, b) => b.tahun - a.tahun);

    res.status(200).json({ success: true, count: allData.length, data: allData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createInformasi = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: 'Body data tidak boleh kosong' });
    }

    const { kategori } = req.body;
    const TargetModel = getModelByKategori(kategori);

    if (!TargetModel) {
      return res.status(400).json({ 
        success: false, 
        message: `Kategori '${kategori}' tidak cocok dengan koleksi database manapun` 
      });
    }
    const dataBaru = await TargetModel.create(req.body);
    
    res.status(201).json({ 
      success: true, 
      message: `Data berhasil disimpan ke koleksi ${kategori}`, 
      data: dataBaru 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateInformasi = async (req, res) => {
  try {
    const { id } = req.params;
    const { kategori } = req.body;
    const TargetModel = getModelByKategori(kategori);

    if (!TargetModel) {
      return res.status(400).json({ success: false, message: 'Kategori tidak valid untuk memperbarui data' });
    }

    const dataUpdated = await TargetModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!dataUpdated) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan di koleksi tersebut' });
    }

    res.status(200).json({ success: true, message: 'Data berhasil diperbarui', data: dataUpdated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 6. Delete Informasi
exports.deleteInformasi = async (req, res) => {
  try {
    const { id } = req.params;
    const { kategori } = req.query;
    const TargetModel = getModelByKategori(kategori);

    if (!TargetModel) {
      return res.status(400).json({ success: false, message: 'Kategori diperlukan untuk menghapus data' });
    }

    const dataDeleted = await TargetModel.findByIdAndDelete(id);
    if (!dataDeleted) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan di database' });
    }

    res.status(200).json({ success: true, message: 'Data berhasil dihapus dari database' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};