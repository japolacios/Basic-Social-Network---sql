//Photo Routes
//--------------------
var express = require('express');
var multer = require('multer');
var photoControl = require('../controllers/photo-controller');
    //Set Config
var photoRouter = express.Router();
var upload = multer({ dest: './public/user-uploads/'});
//app.use(multer({ dest: './public/user-uploads/'}))


//photoRouter.use(multer({ dest: './public/user-uploads/' }));

    photoRouter.post('/upload', upload.single(), function(req, res, next) {
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
        photoControl.setName(req.file.filename);
        console.log(req.file.filename);

    });

module.exports = photoRouter;