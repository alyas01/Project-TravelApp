var express = require('express');
var router = express.Router();

//require controllers 
const hotelController = require("../controllers/hotelController"); 


/* GET home page. */
router.get('/', hotelController.homePage); 
router.get('/all', hotelController.listAllHotels); 

/*
 router.get('/all', function(req, res){
 	res.render('all_hotels', {title: "All Hotel"}); 
}); 
*/

// ADMIN Routes: 

router.get('/admin', hotelController.adminPage); 
router.get('/admin/add', hotelController.createHotelGet); 
router.post('/admin/add', hotelController.createHotelPost); 

module.exports = router;
