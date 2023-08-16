const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { INTEGER } = require('sequelize');

const companySchema=new mongoose.Schema({

    name:{
        type: String
    },
    usersCount:{
        type: Number
    }
    

});
const Company= mongoose.model('Company',companySchema);

module.exports= Company;