const express = require('express');
const router = express.Router();
const { getAllAgenda, getAgendaById } = require('../controllers/agendaController');

router.route('/').get(getAllAgenda);
router.route('/:id').get(getAgendaById); // Endpoint baru: /api/agenda/:id

module.exports = router;