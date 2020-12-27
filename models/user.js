const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
	first_name: {
		type: String, 
		required: 'First Name is Required', 
		trim: true, 
		max: 30
	}, 
	surname: {
		type: String, 
		required: 'Surname is required', 
		trim: true, 
		max: 30
	}, 
	email: {
		type: String, 
		required: 'Email Address is Required', 
		trim: true, 
		unique: true, 
		lowercase: true
	}, 
	password: {
		type: String, 
		required: 'Password is required'
	}, 
	isAdmin: {
		type: Boolean, 
		default: false 
	}
}); 

module.exports = mongoose.model('User', userSchema); 
