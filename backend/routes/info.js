const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');

router.route('/')
  .get(infoController.getAllInformasi)
  .post(infoController.createInformasi);

router.route('/:id')
  .put(infoController.updateInformasi)
  .delete(infoController.deleteInformasi);

module.exports = router;