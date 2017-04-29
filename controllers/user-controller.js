var db = require('../database');

var user;

exports.setUser = function(dataget){
	user = dataget;
}

exports.getUser = function(){
	console.log('Fetching User');
	return user;
}