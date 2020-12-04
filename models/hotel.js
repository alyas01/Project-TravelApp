const mongoose = require('mongoose'); 

const hotelSchema = new mongoose.Schema({
	hotel_name: { 
		type: String, 
		required: 'Hotel Name is Required', 
		max: 32, 
		trim: true
	}, 
	hotel_description: { 
		type: String, 
		required: 'Hotel Name is Required', 
		max: 32, 
		trim: true
	}, 
	image: String, 
	star_rating: { 
		type: Number, 
		required: 'Hotel star rating is required', 
		max: 5
	}, 
	country: {
		type: String, 
		required: 'Country is required', 
		trim: true
	}, 
	cost_per_night: {
		type: Number, 
		required: 'Cost per night is required'
	}, 
	Available: {
		type: Boolean, 
		requiredL 'Availability is required'
	}
}); 

//Export Model 
module.exports = mongoose.model('Hotel', hotelSchema); //Hotel is the name of the model 
