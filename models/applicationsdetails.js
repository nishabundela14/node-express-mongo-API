const mongoose = require('mongoose');
const joi = require('joi');
// const {ListSchema} = require('../models/applicationslist');

const appSchema = mongoose.Schema({
    ApplicationList: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'ApplicationList'
    },
    //ApplicationList:ListSchema,//embede
    backgound: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    returnUrl:{
        type: Boolean,
        required: true,
        default: false
    },
    role: [String]
});

const ApplicationDetails = mongoose.model('ApplicationDetails', appSchema);

async function validateApp(detail) {
    const schema = {
        appName: joi.string().min(5).max(30).required(),
        description: joi.string().min(10).max(50).required(),
        appUrl : joi.string().required(),
        appOrder : joi.number().required(),
        returnUrl : joi.boolean().required(),
        background : joi.string().required(),
        ApplicationList: joi.objectId.required()
    }

    const validation = await schema.validate(detail);
    return validation;
}

exports.Application = ApplicationDetails;
exports.validates = validateApp;