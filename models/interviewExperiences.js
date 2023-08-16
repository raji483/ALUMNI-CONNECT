const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const interview_experienceSchema=new mongoose.Schema({
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
const interviewExperience= mongoose.model('interview_experiences',interview_experienceSchema);

module.exports= interviewExperience;