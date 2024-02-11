const express = require("express");
const passport = require("passport");

const router = express.Router();

const userController = require("../controller/userController");

router.get("/", userController.SignInPage);
router.get("/signUp", userController.signUp);
router.get("/home", passport.checkAuthentication,userController.signIn);
router.post("/user/create",passport.checkAuthentication,userController.createUser);
router.get("/addStudent",passport.checkAuthentication,userController.addStudent);
router.post("/create-student",passport.checkAuthentication,userController.createStudent);
router.get('/deleteStudent/:id',passport.checkAuthentication,userController.deleteStudent);
router.get('/download-csv-report',passport.checkAuthentication,userController.csvReportDownload);


router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/",failureFlash:true}),
  userController.createSession
);

module.exports = router;
