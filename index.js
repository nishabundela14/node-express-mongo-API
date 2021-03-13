const express = require('express')
const app = express();
const winston = require('winston');
require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();

//  throw new Error('something is unhandled here')
 app.use(express.json());
 app.use(express.urlencoded({extended: true}))
 app.use(express.static('./public'));
 

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => winston.info(`server starting on port: ${PORT}`));