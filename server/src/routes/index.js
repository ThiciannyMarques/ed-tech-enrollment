const express = require('express');
const authRoutes = require('./auth.routes');
const studentRoutes = require('./student.routes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);

module.exports = router;
