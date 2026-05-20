const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getAllAgenda,
  getAgendaById,
  createAgenda,
  updateAgenda,
  deleteAgenda
} = require('../controllers/agendaController');

// ── Konfigurasi multer untuk upload foto ─────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: (req, file, cb) => {
    const unique = `agenda-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, unique);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Hanya file gambar (jpg, png, webp) yang diperbolehkan'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 3 * 1024 * 1024 } }); // maks 3 MB

// ── Routes ────────────────────────────────────────────────────────────────────
router.route('/')
  .get(getAllAgenda)
  .post(upload.single('foto'), createAgenda);

router.route('/:id')
  .get(getAgendaById)
  .put(upload.single('foto'), updateAgenda)
  .delete(deleteAgenda);

module.exports = router;