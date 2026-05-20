const express = require('express');
const router = express.Router();
const permohonanController = require('../controllers/permohonanController');
const upload = require('../middleware/upload');

router.route('/')
  .get(permohonanController.getAllPermohonan)
  .post(upload.fields([
    { name: 'fileKtp', maxCount: 1 },
    { name: 'fileDokumenTambahan', maxCount: 1 }
  ]), permohonanController.createPermohonan);

module.exports = router;