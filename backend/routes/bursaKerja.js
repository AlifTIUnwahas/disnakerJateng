const express = require('express');
const router = express.Router();
const bursaKerjaController = require('../controllers/bursaKerjaController');

router.route('/')
  .get(bursaKerjaController.getAllBursaKerja)
  .post(bursaKerjaController.createBursaKerja);

router.route('/:id')
  .get(bursaKerjaController.getBursaKerjaById)
  .put(bursaKerjaController.updateBursaKerja)
  .delete(bursaKerjaController.deleteBursaKerja);

module.exports = router;