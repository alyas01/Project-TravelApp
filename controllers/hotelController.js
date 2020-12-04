// series of functions

const Hotel = require('../models/hotel'); 

exports.homePage = (req, res) => {
	res.render('index', { title: 'Lets Travel'});
} 

exports.listAllHotels = (req, res) => {
	res.render('all_hotels', {title: 'All Hotels'}); 
}

exports.adminPage = (req, res) => {
	res.render('admin', {title: 'Admin Page'}); 
}

exports.createHotelGet = (req, res) => {
	res.render('add_hotel', {title: 'Add new hotel'}); 
}

exports.createHotelPost = async (req, res, next) => {
	try{
		const hotel = new Hotel(req.body); 
		await hotel.save(); 	
		res.redirect('/all/${hotel._id}')	
	} catch (error){
		next(error); 
	}

}

