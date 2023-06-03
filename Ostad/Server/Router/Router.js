const express = require("express");
const router = express.Router();
const verifyAuth = require("../Meddleware/verifyAuth")
const AuthController = require("../Controller/AuthController");

// Authentication routes
router.post('/register', AuthController.register);
router.post('/userLogin', AuthController.userLogin);

// User routes
router.post('/update', verifyAuth, AuthController.update);
router.get('/getUserDetails', verifyAuth, AuthController.getUserDetails);

// Password recovery routes
router.post('/RecoverRestPassword', AuthController.RecoverRestPassword);
router.get('/RecoverVerifyEmail/:email', AuthController.RecoverVerifyEmail);
router.get('/RecoverVerifyOTP/:email/:otp', AuthController.RecoverVerifyOTP);

module.exports= router;