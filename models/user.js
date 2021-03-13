const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
    name :{
        type: String,
        minlength: 5,
        maxlength:50,
        required: true
    },
    email :{
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password :{
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    isAdmin: Boolean

});
    //we can use joi-complexity-password npm pacakage for incresing complexity


//common function use multiple places

userSchema.methods.generateToken = function() {
    return jwt.sign({name: this.name, isAdmin:this.isAdmin}, config.get('jwtPrivateKey'))
}

const User = mongoose.model('User', userSchema);

async function validateUser(user) {
    const schema = {
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password : joi.string().min(5).max(1024).required()
    }

    const validation = await schema.validate(user);
    return validation;
}

exports.User = User;
exports.validates = validateUser;