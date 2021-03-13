const  express = require('express');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const router = express.Router();
const {ApplicationList} = require('../models/applicationslist');
const asyncMiddleware = require('../middleware/async');

router.get('/', asyncMiddleware(async (req, res, next) => {
    throw new Error(' not happening anythinggggg');
        const apps = await ApplicationList.find().sort('appOrder');
        res.send(apps);
}));

router.get('/:id',[auth,admin], asyncMiddleware(async (req, res) => {
    const apps = await ApplicationList.findById({_id: req.params.id}).sort('appOrder');
    res.send(apps)
}));

router.post('/', asyncMiddleware(async(req, res) => {
        const apps = new ApplicationList({
            appName: req.body.appName,
            appUrl: req.body.appUrl,
            appOrder: req.body.appOrder
        });
        const result = await apps.save();
        res.send(result);
}));

module.exports = router;