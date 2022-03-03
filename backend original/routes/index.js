var express = require('express')
const router = express.Router()

var upload = require("../file_Upload");
// const { Op } = require("sequelize");

router.use('/auth', require('./user'))
router.use('/category', require('./CategoryMaster'))
router.use('/type', require('./TypeMaster'))
router.use('/make', require('./MakeMaster'))
router.use('/instrument', require('./InstrumentMaster'))
router.use('/equipment', require('./EquipmentMaster'))
router.use('/gauges', require('./GaugesMaster'))
router.use('/master', require('./master'))
router.use('/calibrationmaster', require('./Calibration_Master'))
router.use('/monthlyReport',require('./Monthly_report'))
router.use('/CalibrationRequest',require('./CalibrationEntiresRequest'))
router.use('/CalibrationEntry',require('./CalibrationEntry'))
router.use('/CalibrationRequestType',require('./calibrationRequestType'))
router.use('/CalibrationLocationMaster',require('./CalibrationLocationMaster'))
router.use('/BreakageDetails',require('./BreakageDetails'))
router.use('/IssueReturn',require('./IssueReturn'))
router.use('/Return',require('./Return'))
router.use('/BreakageRequest',require('./BreakageRequest'))
router.use('/BreakageListDetails',require('./BreakageListDetails'))
router.use('/ReturnList',require('./ReturnList'))
router.use('/ScrapApproval',require('./ScrapApproval'))
router.use('/ScrapApprovalList',require('./ScrapApprovalList'))
router.use('/calibrationtype',require('./calibrationtype'))
router.use('/CalibrationMasterList',require('./CalibrationMasterList'))
router.use('/CalibrationReport',require('./CalibrationReport'))
router.use('/CalibrationMasterListReport',require('./CalibrationMasterListReport'))


module.exports = router;
