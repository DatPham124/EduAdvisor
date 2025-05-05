const express = require('express');

const ExamGroupController = require('../controllers/examGroup.controller');

const router = express.Router();

router.route('/').get(ExamGroupController.getAll);

module.exports = router;