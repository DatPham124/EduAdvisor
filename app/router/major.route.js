const express = require('express');

const MajorController = require('../controllers/major.controller');

const router = express.Router();

router.route('/').get(MajorController.getAll);

module.exports = router;
// This code defines a simple Express router for the "/api/v1/major" endpoint.