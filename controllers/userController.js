const User = require('../models/user'); 
const Passport = require('passport'); 

//Express Validator 
const { check, validationResult} = require('express-validator/check');
const {sanitize} = require('express-validator/filter'); 


exports.signUpGet = (req, res) => {
	res.render('sign_up', {title: 'User Sign Up'}); 
}

exports.loginGet = (req, res) => {
    res.render('login', {title: 'Login to continue'} );
};

exports.loginPost = Passport.authenticate('local', {
	successRedirect: '/', 
	failureRedirect: '/login', 

}); 

exports.signUpPost = [
	// Validate the User's data 
	check('first_name').isLength({min: 1}).withMessage('First Name must be specified')
	.isAlphanumeric().withMessage('First Name must be alphanumeric'), 

	check('surname').isLength({min: 1}).withMessage('SurName must be specified')
	.isAlphanumeric().withMessage('SurName must be alphanumeric'), 

	check('email').isLength({min: 1}).withMessage('email must be specified')
	.isAlphanumeric().withMessage('Email must be alphanumeric'), 

	check('confirm_email').custom((value, {req}) => value == req.body.email).withMessage('Email Addresses do not match'), 

	check('password').isLength({min: 6}).withMessage('Invalid password, passwords must be a minimum of 6 charcters'), 

	check('confirm_password').custom((value, {req}) => value == req.body.password).withMessage('Password does not match'),

	sanitize('*').trim().escape(),

	(req, res, next) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			// There are errors 
			//res.json(req.body); 
			res.render('sign_up',{title: 'Please Fix The Following Errors: ', errors: errors.array()}); 
			return; 
		}else{
			const newUser = new User(req.body); 
			User.register(newUser, req.body.password, function(err){
				if(err){
					console.log('error while registerining!', err); 
					return next(err)
				}
			}); 
		}
		//next(); //move onto loginPost after registering 

	}
]


