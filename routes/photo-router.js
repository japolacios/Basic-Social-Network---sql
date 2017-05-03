//Photo Routes
//--------------------
var express = require('express');
var photoControl = require('../controllers/photo-controller');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var upload = multer({ dest: './public/user-uploads/' })


    //Set Config
var photoRouter = express.Router();

//app.use(multer({ dest: './public/user-uploads/'}))


//photoRouter.use(multer({ dest: './public/user-uploads/' }));

    photoRouter.post('/upload', upload.single(), function(req, res, next) {
        

        fs.rename(req.file.path, targetPath, function(err) {
					if (err)
						throw err;
					/*
					 * Borrar el archivo temporal, para que el servidor no se
					 * llene 
					 */
					fs.unlink(req.file.path, function(err) {
						if (err)
							console.log(err);
					});

    });
    
			});

	


module.exports = photoRouter;