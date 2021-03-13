const winston = require('winston');

module.exports = function(err, req, res, next) {
    //either winston.log or winston.error
    winston.error(err.message, err)
    res.status(500).send('something failed in mongo...');
}