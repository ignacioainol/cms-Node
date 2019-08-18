const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/user/signup', (req,res) => {
    res.render('users/signup');
});

router.post('/user/signup',async (req,res) => {
    const {username,email,password,password_confirm} = req.body;

    const errors = [];

    if(username.length <= 0 ){
		errors.push({text:'Please Typed a Username'});
	}

	if(password != password_confirm){
		errors.push({text:'Password do not match'});
    }
    
    if(email.length <= 0){
		errors.push({text:'Please Typed an Email'});
	}

	if(password.length < 4){
		errors.push({text: 'Password must be at least 4 characters'});
    }
    
    if(errors.length > 0){
        //res.render('users/signup',{errors,username,email,password,password_confirm});
        res.render('users/signup',{errors});
    }else{
        const emailUser = await User.findOne({email: email});
        
        if(emailUser){
            req.flash('error_msg','Email already exists');
			res.redirect('/user/signup');
        }

        const newUser = new User({username,email,password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg','You are registered!');
    }
    
});

 module.exports = router;