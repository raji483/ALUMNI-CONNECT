const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const userController=require('../controllers/userController');
const interviewExperienceController=require('../controllers/interviewExperiece');
const referralController=require('../controllers/referralController');
const paymentController=require('../controllers/paymentController');
const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:id', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', viewsController.getSignUpForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/get-all-alumni/:id',authController.protect,userController.getAlumniByCompany);
router.get('/interview-experiences/:id',authController.protect,interviewExperienceController.getInterviewExperiencesById);
router.get('/me/interview-experience',authController.protect,viewsController.createInterviewExperience);
router.post('/interview-experience',authController.isLoggedIn,interviewExperienceController.createInterviewExperience);
router.get('/me/referrals',authController.protect,viewsController.createReferral);
router.post('/referral',authController.isLoggedIn,referralController.createReferral);
router.get('/referrals',authController.isLoggedIn,referralController.getReferrals);
router.get('/me/contribute',authController.isLoggedIn,paymentController.contrinuteForm);
router.get('/paymentSuccess',paymentController.showSuccessPage);
router.get('/admin',authController.protect,viewsController.adminOverview);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
