// series of functions

const Hotel = require('../models/hotel'); 

exports.homePage = (req, res) => {
	res.render('index', { title: 'Lets Travel'});
} 

exports.listAllHotels = async (req, res, next) => {
	try{
		const allHotels = await Hotel.find({available: {$eq: true}}); 
		res.render('all_hotels', {title: 'All Hotels', allHotels}); 
		//res.json(allHotels); 
	}catch(errors){
		next(next); 
	}
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
		res.redirect(`/all/${hotel._id}`); 	
	} catch (error){
		next(error)
	}

}

