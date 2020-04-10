const express = require('express');
const router = express.Router();

const {getList}  = require('../controllers/list.absen.controller');
const ListAbsenService = require('../services/list.absen.service');
const Present = require('../models/present.model');
const Employee = require('../models/employee.model');
const PersonalInfo = require('../models/personal.info.model');
const ContactInfo = require('../models/contact.info.model');
const WorkInfo = require('../models/work.info.model');
const Address = require('../models/address.model');
const tokenValidation = require('../middlewares/token.validation');

const listAbsenService = new ListAbsenService(Employee,Present,PersonalInfo,ContactInfo,WorkInfo,Address);

router.use(tokenValidation);
router.get('/',(req,res,next)=>getList(req,res,listAbsenService));

module.exports = router;
