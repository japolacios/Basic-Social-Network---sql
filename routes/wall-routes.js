//Set Config
var express = require('express');
var bodyParser = require('body-parser');
var userControl = require('../controllers/user-controller');
var db = require('../database');
var user;
var wallRouter = express.Router();
var userName;
//Format to JSon
wallRouter.use(bodyParser.json());
//userRouter.route('/');
wallRouter.get('/', function(req, res) {
    console.log('Retreaving Data');
    user = userControl.getUser();

            db.getConection().query({
            sql: 'SELECT * FROM users WHERE user = ?',
            timeout: 1000,
        }, [user], function(err, rows) {

            if (err) {
                console.log(err);
            } else {
                console.log(rows[0]);
                    errorR = "Invalid User";
                if (rows.length == 0) {
                    console.log('invalid user');
                    res.render('landing', {
                        error: 'Invalid User'
                    });
                } else {
                    console.log('Name of el man: '+ rows[0].name);
                   userName = rows[0].name;
                }
            }
        });

    res.render('wall',{userName:userName});
});

module.exports = wallRouter