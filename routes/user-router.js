//Set Config
var express = require('express');
var bodyParser = require('body-parser');
var userControl = require('../controllers/user-controller');

exports.getUserRoutes = function () {
    var userRouter = express.Router('/');
    //Format to JSon
    userRouter.use(bodyParser.json());
    userRouter.use(bodyParser.urlencoded({
        extended: true
    }));
    var ruta = userRouter.route('/');
    ruta.post(function (req, res) {
        console.log('Atempting Login');
        userName = req.body.userName;
        userPassword = req.body.userPassword;
        console.log('User Name: ' + userName + ' - Password: ' + userPassword);
        var restult = userControl.userLogin(userName, userPassword);

        if (result == 1) {
            res.render('landing', {
                message: "Usuario Incorrecto"
            });
        }
        if (restult == 2) {
            res.render('landing', {
                message: "Password Invalido"
            });
        }

        if (restult == 3) {
            res.render('landing', {
                message: "Exito"
            });
        }
    });
    /*
    ruta.post(function (req, res, next) {});
    return photoRouter;
    */
}
