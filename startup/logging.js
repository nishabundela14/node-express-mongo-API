const winston = require('winston');
// require('winston-mongodb');
//transport - http, console, file
//plugin for - mongo, couch, loogly, redis
//and this add default transpot for console
//add another transport use
// require('express-async-errors');

module.exports = function() {
    //one way
    // process.on('uncaughtException', (ex) => {
    //     winston.error(ex.message, ex)
    //     process.exit(1);
    // })
    
    // process.on('unhandledRejection', (ex) => {
    //     winston.error(ex.message, ex)
    //     process.exit(1);
    // })

    //second way

    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'unhandled.log'})
    );

    process.on('unhandledRejection', (ex) => {
        throw ex;
    })
    
    //instead of process we can use windston.handleexception
    //its not available rejection so use process and throw exception whichused by winston handleexception
     
    winston.add(new winston.transports.Console({colorize: true, prettyPrint: true}))
     winston.add(new winston.transports.File({filename: 'logfile.log'}))
    //  winston.add(new winston.transports.MongoDB({
    //      db: 'mongodb://localhost/Portal'
    //  }))
    
}