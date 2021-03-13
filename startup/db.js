const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

const DB_URL = config.get('db');
const DB_NAME = config.get('dbname');

module.exports = function() {
    mongoose.connect(`${DB_URL}${DB_NAME}`, 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => winston.info(`connected to mongodb...${DB_URL}${DB_NAME}`))
}
// mongoose.connect(`${DB_URL}${DB_NAME}`, 
// { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log(`connected to mongodb...${DB_URL}${DB_NAME}`))
// .catch((e) => console.log(`connection error mongo ${e}`))