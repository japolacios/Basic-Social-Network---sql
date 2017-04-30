//Set Config
var express = require('express');
var bodyParser = require('body-parser');
var userControl = require('../controllers/user-controller');
var postControl = require('../controllers/post-controller');
var db = require('../database');
var user;
var wallRouter = express.Router();
var userName, userPicture;
//Format to JSon
wallRouter.use(bodyParser.json());
wallRouter.use(bodyParser.urlencoded({
    extended: false
}));
//userRouter.route('/');
wallRouter.get('/', function(req, res) {
    console.log('Retreaving Data');
    user = userControl.getUser();
    if (user != null) {
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
                    //Get the Users data
                    console.log('Name of el man: ' + rows[0].name);
                    userName = rows[0].name;
                    userPicture = rows[0].picture;
                }
            }
        });
        //Here Goes the wall
        var data = [];
        data = postControl.getPosts();
        res.render('wall', { userName: userName, userPicture: userPicture, data: data });
        console.log('Los Posts ----------------   ' + data);
    } else {

        if (userControl.getIncoming() == 1) {
            res.redirect('/login');
        } else {

            if (userControl.getIncoming() == 2) {
                res.redirect('/register');
            }
        }
        res.redirect('/login');
    }
});

wallRouter.post('/new_post', function(req, res, next) {
    console.log("Calling new post Function");
    postPic = req.body.postPic;
    postContent = req.body.postContent;

    postControl.newPost(postPic,postContent);
});
module.exports = wallRouter
