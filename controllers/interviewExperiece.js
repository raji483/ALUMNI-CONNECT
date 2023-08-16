const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Company = require('../models/companies');
const interviewExperience = require('../models/experiences');
const axios=require('axios')



exports.getInterviewExperiencesById=async(req,res)=>{

    const companyId=req.params.id;
    console.log(companyId);
    const company=await Company.findOne({_id:companyId});
    console.log(company)
    const companyName=company.name;
    console.log(companyName)
    const InterviewExperiences=await interviewExperience.find({companyName});
    
    return res.status(200).render('display_interview_experience',{
        InterviewExperiences,
        msg:"Success",
        companyId
    });

}

exports.createInterviewExperience= async(req,res)=>{
    console.log(req.body)
    let experience=req.body.experience;
    const userId=req.body.userId;
    const companyCap = req.body.companyName.toUpperCase();
    const user=await User.findOne({_id:userId});
    experience=experience.replace(/&lt;p>&lt;br>&lt;\/p>/g,'<br>'); 
    experience=experience.replace(/&lt;\/p>/g,'<br>'); 
    
    experience=experience.replace(/&lt;p>/g,'');
    console.log(experience);
    const Experience=await interviewExperience.create({
        userName:user.name,
        experience,
        companyName:companyCap
    });
    const updatedUser=await User.updateOne({_id:userId},{interviewExperiences:user.interviewExperiences+1});
    return res.status(200).json({
        Experience,
        msg:"interview Experience Successfully created...",
        status: 'success',
        
    }); 
}