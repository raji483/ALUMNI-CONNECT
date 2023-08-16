const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Company = require('../models/companies');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {

  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, 'company');
  filteredBody.company=req.body.company.toUpperCase();
  console.log(filteredBody,req.user.id)
  console.log(req.user)
  const userCompanyCap = req.user.company.toUpperCase();
  console.log(userCompanyCap);
  const company=await Company.findOne({name:userCompanyCap});
  console.log(company,"ku");
  const updatedCompany=await Company.updateOne({_id:company.id},{usersCount:company.usersCount-1});
  const newCompanyCap=req.body.company.toUpperCase();
  const newCompany=await Company.findOne({name:newCompanyCap});
  if(newCompany){
    const updatedNewCompany=await Company.updateOne({_id:newCompany.id},{usersCount:newCompany.usersCount+1});
  }else{
    const newCompany=await Company.create({
      name:newCompanyCap,
      usersCount:1
    });
  }   

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });


  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  console.log("delete user.......")
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

exports.getAlumniByCompany=async (req,res)=>{
  console.log("Get alumni by company")
  const companyId=req.params.id;

  const company= await Company.find({_id:companyId});
  const companyName= company[0].name;
  console.log(company);
  const alumni=await User.find({company:companyName,isAlumni:1})
  res.status(200).render('all_alumni', {  
    title: 'All Alumni',
    companyName,
    alumni,
    companyId
  });
  
}

exports.getAllInterviewExperiences=async (req,res)=>{
  console.log("All Interview Experiences")
  

  const company1= await Company.find({_id:companyId});
  
  const companyName= company1[0].name;

  const alumni=await User.find({company:companyName})
  res.status(200).render('all_alumni', {
    title: 'All Alumni',
    companyName,
    alumni
  });
  
}

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
