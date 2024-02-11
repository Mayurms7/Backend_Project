const express = require("express");
const passport = require("passport");

const router =express.Router();

const companyController = require("../controller/companyController");

router.get('/interviewslist',passport.checkAuthentication, companyController.companyHomePage);
router.get('/scheduleInterview', passport.checkAuthentication,companyController.scheduleInterview);
router.post('/allocateStudent',passport.checkAuthentication,companyController.allocateStudentForInterview);
router.post('/update-status/:id', passport.checkAuthentication,companyController.updateStatus);

module.exports = router;