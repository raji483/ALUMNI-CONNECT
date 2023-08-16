const axios=require('axios');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Company = require('../models/companies');


exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  console.log(req.query)
  if(req.query.input){
    console.log(req.query.input,"weslfn");
    const companies = await Company.find({name:{ $regex: req.query.input, $options: "i" },usersCount:{$gt:0}});
    console.log(companies.length)
    // 2) Build template
    // 3) Render that template using tour data from 1)
    return res.status(200).json({
      title: 'Home',
      companies,
      status:"success"
    });


  }else if(req.query.fromForm){
    const companies = await Company.find({usersCount:{$gt:0}});
    console.log(companies.length)
    // 2) Build template
    // 3) Render that template using tour data from 1)
    return res.status(200).json({
      title: 'All Tours',
      companies,
      status:"success"
    });
  }else{
    const companies = await Company.find({usersCount:{$gt:0}});
    console.log(companies.length)
    // 2) Build template
    // 3) Render that template using tour data from 1)
    return res.status(200).render('overview', {
      title: 'All Tours',
      companies,
      status:"success"
    });
  }
  
});



exports.adminOverview=async (req,res)=>{
  console.log("Get alumni by company")
  

  
  const alumni=await User.find();
  res.status(200).render('admin_overview', {  
    title: 'All Alumni',
    alumni,
  });
  
}

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ _id: req.params.id }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  console.log("Login form")
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getSignUpForm = (req, res) => {
  console.log("signup")
  res.status(200).render('signup', {
    title: 'signUp into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});


exports.createInterviewExperience=async(req,res)=>{

  return res.status(200).render('account_interview_experience',{
    title: 'Interview Experiences',
  });
}

exports.createReferral=async(req,res)=>{

  try{
    
    return res.status(200).render('account_referrals',{
      title: 'Referrals',
    });

  }catch(err){
    
    return res.status(400).json({
      title: 'Referrals',
      msg:"error occirred"
    })

  }
  

}

exports.adminLogin=async(req,res)=>{

  try{
    return res.status(200).render('admin_login');
  }catch(err){
    
    return res.status(400).json({
      msg:"error occirred"
    })

  }
}

const report="https://drive.google.com/drive/folders/1Rn7WuoCR8PWvVAUfdM-tnE9IwrP63tBH?usp=sharing";

