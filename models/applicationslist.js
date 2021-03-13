const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
    appName: {
        type: String,
        required: true
    },
    appUrl: {
        type: String,
        required: true
    },
    appOrder:{
        type: Number,
        required : true
    }
});

const ApplicationList = mongoose.model('ApplicationList', appSchema);

exports.ApplicationList = ApplicationList;
exports.ListSchema = appSchema;