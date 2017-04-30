//Set Config
var express = require('express');
var bodyParser = require('body-parser');
var registerControl = require('../controllers/register-controller');
var userControl = require('../controllers/user-controller');
var db = require('../database');
var user;
var registerRouter = express.Router();
//Format to JSon
registerRouter.use(bodyParser.json());

registerRouter.get('/', function(req, res) {
    res.render('register', { error: userControl.getMessage() });
});

registerRouter.post('/', function(req, res) {
    console.log('Atempting Register');
    user = req.body.userName;
    password = req.body.userPassword;
    mail = req.body.userMail;
    name = req.body.userCompleteName;
    country = req.body.userCountry;
    picture = './public/user-uploads/' + req.body.userPic;
    console.log('Antes de la variable');
    var newUser = [user, password, mail, country, picture, password];
    console.log('User Name: ' + user + ' - Password: ' + password);
    userControl.setIncoming(2);
    if (user == null || user == "" || password == null || password == "" || name == null || name == "" || country == null || country == "" || picture == null || picture == "") {
        console.log('Faltan Datos');
        userControl.setMessage("Fill all Data");


    } else {

        user_session = req.body.userName;;
        db.getConection().query({
            sql: 'SELECT * FROM users WHERE user = ?',
            timeout: 1500,
        }, [user_session], function(err, rows) {
            if (err) {
                console.log(err);
            } else {

                if (rows.length > 0) {
                    console.log('El usuario ya existe');
                    userControl.setMessage("User Duplicates");
                } else {
                    console.log('Antes del query');
                    db.getConection().query({
                        sql: 'INSERT INTO users  (user, name, mail, country, picture, password) VALUES(?,?,?,?,?,?)',
                        timeout: 1000,
                    }, newUser, function(err, rows) {
                        console.log(rows);
                        if (err) {
                            console.log(err);
                        } else {
                            userControl.setUser(user_session);
                            userControl.setUserId();
                            console.log('Valid Credentials -> Redirecting')
                        }
                    });
                }
            }
        });
    }
});


//EXPORT MODULE
module.exports = registerRouter;
