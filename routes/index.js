const express = require('express');

const router = express.Router();
const userRoutes = require('./userRoutes');
const companyRoutes = require('./companyRoutes');

router.use('/',userRoutes);
router.use('/company/',companyRoutes);

module.exports = router;