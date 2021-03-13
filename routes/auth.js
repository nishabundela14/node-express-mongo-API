const  express = require('express');
const router = express.Router();
const _ = require('lodash');
const joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user')

// router.get('/', async (req, res) => {
//     const apps = await ApplicationList.find().sort('appOrder');
//     res.send(apps)
// });

//cant have auth model as we are not using new collection we are using same user collection
router.post('/', async (req, res) => {
    const {error} = validateAuth(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email})
    console.log("nisha" , user)
    if(!user) return res.status(400).send('Invalid email or password');

    //bcrypt comparing password at time of login
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');


    //private key save in env var
    //this data can be used accessed on client
    const token = user.generateToken()
    res.send(token)
});

async function validateAuth(auth) {
    const schema = {
        email: joi.string().min(5).max(255).required().email(),
        password : joi.string().min(5).max(1024).required()
    }

    const validation = await schema.validate(auth);
    return validation;
}

module.exports = router;