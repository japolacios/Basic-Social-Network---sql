//Set Config
var express = require('express');
var bodyParser = require('body-parser');
var userControl = require('../controllers/user-controller');
var db = require('../database');
var user;
var userControl = require('../controllers/user-controller');
var userRouter = express.Router();
var errorR = "Hola";
//Format to JSon
userRouter.use(bodyParser.json());
//userRouter.route('/');
userRouter.get('/', function(req, res) {
    res.render('landing',{error:errorR});
});


userRouter.post('/', function(req, res, next) {
    console.log('Atempting Login');
    userName = req.body.userName;
    userPassword = req.body.userPassword;

    console.log('User Name: ' + userName + ' - Password: ' + userPassword);

    if (userName == null || userName == "" || userPassword == null || userPassword == "") {
        console.log('Datos Vacios');
        errorR = "Datos Vacios";
        res.render('landing', {
            error: "Debes ingresar todos los datos"
        });



    } else {

        user = userName;
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
                    if (rows[0].password == userPassword) {
                        user = rows[0];
                        userControl.setUser(rows[0].user);
                        console.log('Valid Credentials -> Redirecting')
                        res.redirect('/wall');
                    } else {
                        errorR = "Invalid Password";
                        console.log('invalid password');
                        res.render('landing', {
                            error: 'Invalid Password'
                        });
                    }
                }
            }
        });
    }
});

module.exports = userRouter
