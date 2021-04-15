const express = require("express");
const router = express.Router();

//Controller Imports
var authController = require("../controllers/authController");


//Auth Routes
router.post("/signUp", authController.signUp);
router.post("/signIn", authController.signIn);
router.post("/facebook", authController.signUpOrLoginWithFacebook);
router.post("/instagram", authController.signUpOrLoginWithFacebook);
router.get("/signOut", authController.signOut);
router.get("/isSignedIn", authController.isSignedIn);

module.exports = router;
