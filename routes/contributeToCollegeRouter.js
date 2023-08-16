const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const userController=require('../controllers/userController');
const interviewExperienceController=require('../controllers/interviewExperiece');
const referralController=require('../controllers/referralController')
const paymentController=require('../controllers/paymentController')
const router = express.Router();



router.get('/checkout-session/:id/:amount',authController.isLoggedIn,paymentController.getCheckoutSession)

module.exports = router;