const express = require('express');
const router = express.Router();

const Present = require('../models/present.model');
const SubmitAbsenService = require('../services/submit.absen.service');
const {submitAbsen} = require('../controllers/submit.absen.controller');
const tokenValidation = require('../middlewares/token.validation');

const submitAbsenService = new SubmitAbsenService(Present);

router.use(tokenValidation);
router.post('/',(req,res,next)=>submitAbsen(req,res,submitAbsenService));

module.exports = router;
