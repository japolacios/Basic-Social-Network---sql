var db = require('../database.js')

var fs = require('fs');

exports.createImage = function (myFile) {
    let targetPath = './public/user-uploads/' + myFile.file.filename;
    fs.rename(myFile.file.path, targetPath, function (err) {
        if (err) throw err;
    });
    let src = 'user-uploads/' + myFile.file.filename;
    console.log('New Image Upload on: ' + src);
    return src;
}

