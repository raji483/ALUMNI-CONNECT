const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const interviewExperienceSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    experience:{
        type:String
    },
    companyName:{
        type:String
    }
});
const interviewExperiences= mongoose.model('InterviewExperiences',interviewExperienceSchema);

module.exports= interviewExperiences;