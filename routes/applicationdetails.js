const  express = require('express');
const router = express.Router();
const {Application, validates}= require('../models/applicationsdetails');
const {ApplicationList} = require('../models/applicationslist');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const auth = require('../middleware/auth');

Fawn.init(mongoose)

router.get('/', async (req, res) => {
    const apps = await Application
    .find()
    .populate('ApplicationList')
    .sort('appOrder');
    res.send(apps)
});

router.post('/', auth, async (req, res) => {
    const {error} = validates(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    try {
        // const apps = new ApplicationList({
        //     appName: req.body.appName,
        //     appUrl: req.body.appUrl,
        //     appOrder: req.body.appOrder
        // });
        let app = new Application({
            ApplicationList:'6043cfc6ec5bb2230cec3d17',
           // ApplicationList:apps,
            backgound: req.body.backgound,
            description: req.body.description,
            returnUrl:req.body.returnUrl,
            role: req.body.role
        })
        const result = await app.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

router.put('/:id', async (req, res) => {
    // const app = await Application.findById({_id:req.params.id}, {
    //     $set:{
    //         'ApplicationList.appName' :'Louis phillippe'
    //     }
    // },{new: true})

    //const app = await Application.findById(req.params.id);
   //  app.ApplicationList.appName = 'peter england';

    console.log(app)

    try {
        new Fawn.Task()
            .update('applicationdetails',{_id: req.params.id},{
                $set: {
                    'ApplicationList.appName' : 'colors'
                }
            },{new: true})
            .update('applicationlists',{_id: '6043cfc6ec5bb2230cec3d17'},{
                $set: {
                    'appName' : 'colors'
                }
            },{new: true})
            .run();
        res.send(app)
    }
    catch(e) {
        res.status(500).send('somthing failed')
    }
});


module.exports = router;