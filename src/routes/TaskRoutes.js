const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController')

router.post('/task', TaskController.create);

module.exports = router;