//Photo Routes
//--------------------
//Set Config
var express = require('express');
var bodyParser = require('body-parser');
var photoControl = require('../controllers/photo-controller');
exports.getRoutes = function () {
    var photoRouter = express.Router('/');
    //Format to JSon
    photoRouter.use(bodyParser.json());
    photoRouter.use(bodyParser.urlencoded({
        extended: true
    }));
    var ruta = photoRouter.route('/');
    ruta.get(function (req, res, next) {
        var result = photoControl.getAll(function (err, photos) {
            if (err) {
                console.log("Databe Error");
                res.status(500);
                red.end;
            }
            else {
                console.log(photos);
                res.json(photos);
            }
        });
    });
    ruta.post(function (req, res, next) {});
    return photoRouter;
}