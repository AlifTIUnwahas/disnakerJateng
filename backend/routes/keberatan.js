const express = require('express');
const router = express.Router();
const keberatanController = require('../controllers/keberatanController');
const upload = require('../middleware/upload');

router.route('/')
  .get(keberatanController.getAllKeberatan)
  .post(upload.single('fileSuratKeberatan'), keberatanController.createKeberatan);
router.post('/cek-validasi', keberatanController.cekValidasiPermohonan);

module.exports = router;