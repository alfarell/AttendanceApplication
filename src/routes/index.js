const express = require('express');
const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('../../swagger.json');

const authRoutes = require('./auth.route');
const employeeRoutes = require('./employee.route.js');
const scanRoutes = require('./scan.route.js');
const listAbsensiRoutes = require('./list.absensi.route');
const absensiSubmitRoutes = require('./absensi.submit.route');

const logRoute = require('./log.route');
const noRoute = require('./no.route');

router.use(logRoute);
router.use('/api-docs', swaggerUI.serve,swaggerUI.setup(swaggerDoc));
router.use('/auth',authRoutes);
router.use('/employee',employeeRoutes);
router.use('/scan',scanRoutes);
router.use('/listAbsensi',listAbsensiRoutes);
router.use('/absensiSubmit',absensiSubmitRoutes);
router.use(noRoute);


module.exports = router;
