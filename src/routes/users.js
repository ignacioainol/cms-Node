const express = require('express');
const router = express.Router();

//const User = require('../models/User');

router.get('/user/signup', (req,res) => {
    res.render('users/signup');
});

router.post('/user/signup',(req,res) => {
    res.send("scaning");
    console.log(req.body);
});

 module.exports = router;