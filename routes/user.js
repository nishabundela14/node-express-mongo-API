const  express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User,validates} = require('../models/user');
const auth = require('../middleware/auth');

router.get('/', auth,async (req, res) => {
    console.log(req.user)
    const u = await User.findOne({name:req.user.name});
    res.send(u)
});

router.post('/', async (req, res) => {
    const {error} = validates(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('user already registerd');

    try {
        const user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10); //genrating salt random key
        user.password = await bcrypt.hash(user.password, salt) //hasing password
        console.log(user)

        const result = await user.save();
       // res.send(_.pick(user, ['name', 'email']));

       //sending token after registration so no need to do email verification user can start work
       //directly

       const token = user.generateToken()
        res.header('x-token', token).send(result);
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router;