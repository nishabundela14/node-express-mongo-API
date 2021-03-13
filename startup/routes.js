const List = require('../routes/applicationlist');
const Details = require('../routes/applicationdetails');
const User = require('../routes/user');
const Auth = require('../routes/auth');
const error = require('../middleware/error');
const helmet = require('helmet');
const morgan = require('morgan');
const appStart = require('debug')('app:startup')


module.exports = function(app) {
    app.use(helmet());
    if (app.get('env') === 'development') {
        app.use(morgan('tiny'));
        appStart('debugging started.....')
    }
    app.set('view engine', 'pug')
    app.set('views', './views');  
    app.use('/user/apps', List);
    app.use('/user/application', Details);
    app.use('/user', User);
    app.use('/auth', Auth);
    app.use(error)
}