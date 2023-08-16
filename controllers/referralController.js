const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Company = require('../models/companies');
const interviewExperience = require('../models/experiences');
const axios=require('axios');
const Referral = require('../models/referrals');

exports.createReferral= async(req,res)=>{
   
    const {companyName,userId, location,link,role}=req.body;
 
    const companyCap = companyName.toUpperCase();
    const user=await User.findOne({_id:userId});

    const referral=await Referral.create({
        userName:user.name,
        userEmail: user.email,
        companyName:companyCap,
        location,
        link,
        role
    });

    return res.status(200).json({
            referral,
        title: 'Referrals',
        msg:"Referral Successfully created...",
        status: "success",
    }); 
}


exports.getReferrals=async(req,res)=>{

    const allReferrals=await Referral.find();

    return res.status(200).render('display_referrals',{
        allReferrals,
        status:"success"
    });

}
