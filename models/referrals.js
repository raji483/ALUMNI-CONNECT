const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const referralSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    companyName:{
        type:String,
        required:true
    },
    link:{
        type:String
    },
    role:{
        type:String,
    },
    userEmail:{
        type:String
    }
});
const Referral= mongoose.model('Referral',referralSchema);

module.exports= Referral;