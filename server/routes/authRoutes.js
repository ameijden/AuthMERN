const express = require('express');
const router = express.Router();

//Controller Imports
var authController = require('../controllers/authController');

//Auth Routes
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/facebook', authController.continueWithFacebook);
router.post('/instagram', authController.continueWithInstagram);
router.post('/updateSelf', authController.updateSelf);
router.post('/addEmailLogin', authController.addEmailLogin);
router.get('/signOut', authController.signOut);
router.get('/isSignedIn', authController.isSignedIn);
router.get('/getSelf', authController.getSelf);

module.exports = router;
