module.exports = function(router) {
	console.log('Controller loaded --> Search controller (tra-search-controller.js)');

	router.get('/browse/search', function(req, res) {
		console.log('browse button hit');
		console.log(req.body);
	})

}