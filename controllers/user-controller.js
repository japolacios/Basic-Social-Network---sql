var db = require('../database');

var user;
var userId;
//For origin 1 = when comes from login && 2 = when comes from register
var origin;
var message;


exports.setUser = function(dataget){
    console.log('Setting User Session!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	user = dataget;
}

exports.getUser = function(){
	console.log('Fetching User');
	return user;
}

exports.getIncoming = function(){
    console.log('Incoming from: ' + origin);
    return origin;
}

exports.setIncoming = function(data){
    origin = data;
}

exports.getMessage = function(){
    console.log('Error Message: ' + message);
    return message;
}

exports.setMessage = function(data){
    console.log('Error Message Set To: ' + data);
    message = data;
}

exports.setUserId = function(){
    console.log('Setting User Session Id');
            db.getConection().query({
            sql: 'SELECT * FROM users WHERE user = ?',
            timeout: 1000,
        }, [user], function(err, rows) {

            if (err) {
                console.log(err);
            } else {
                console.log(rows[0]);
                   // setMessage("Invalid User");
                if (rows.length == 0) {
                    console.log('invalid user');
                   // setMessage("Invalid User");
                } else {
                    if (rows[0].user == user) {
                        userId = rows[0].idusers;
                    } else {
                        //setMessage("Invalid Password");
                        console.log('invalid password');
                    }
                }
            }
        });

}

exports.getUserId = function(){
    console.log('Fetching UserId');
    return userId;
}

exports.logout = function(){
    user = null;
    userId = null;
}