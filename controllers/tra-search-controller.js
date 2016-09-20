'use strict';

module.exports = (router) => {
	console.log('Controller loaded --> Search controller (tra-search-controller.js)');

	router.get('/browse/search/', (req, res) => {
		console.log('browse button hit');
		console.log(req.query);
	});
	
}