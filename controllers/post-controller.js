var userControl = require('../controllers/user-controller');
var photoControl = require('../controllers/photo-controller');
var db = require('../database');
//var photoControl = require('../controllers/photo-controller');
var user;
exports.newPost = function(picture, content) {
    userId = userControl.getUserId();
//    var newPhotoRoute = photoRouter.getLastName();
    

    //var pictureSrc = photoControl.createImage(picture);
    
    //var newPost = [userId, picture, content];
    var newPost = [userId, picture, content];

    db.getConection().query({
        sql: 'INSERT INTO posts  (owner, postPicture, postText) VALUES(?,?,?)',
        timeout: 1000,
    }, newPost, function(err, rows) {
        console.log(rows);
        if (err) {
            console.log(err);
        } else {
            console.log('New Post Added -> Redirecting')
        }
    });
}

exports.getPosts = function() {
	var posts = [];
    db.getConection().query({
        sql: 'SELECT * FROM posts',
        timeout: 1000,
    }, function(err, rows) {
        console.log(rows);
        if (err) {
            console.log(err);
        } else {
            //How to return this shit?
            
            var i;
            i = 0;
            while (i <= rows.length - 1) {
                console.log('Owner del post ----> ' + rows[i].owner);
                var gotOwner = getOwnerName(rows[i].owner);
                var gotPicture = rows[i].postPicture;
                var gotText = rows[i].postText;

               console.log('****************** El owner del post es: ' + gotOwner + ' *************');

                posts.push({ owner: rows[i].owner
                	,postPicture: rows[i].postPicture
                	,postText: rows[i].postText });
               
                i++;
            }
            console.log('Posts impresos desde el control +++++++++++++++' + posts[1].postPicture);
            
        }
    });
    return posts;
}

getOwnerName = function(owner){
    var ownerName;
        db.getConection().query({
            sql: 'SELECT * FROM users WHERE idusers = ?',
            timeout: 1000,
        }, [owner], function(err, rows) {

            if (err) {
                console.log(err);
            } else {
                console.log(rows[0]);
                errorR = "Invalid User";
                if (rows.length == 0) {
                    console.log('invalid user');
                    
                } else {
                    //Get the Users data
                    console.log('Name of el man del post: ' + rows[0].name);
                    ownerName = rows[0].name;
                    
                }
            }
        });
    return ownerName;

}

exports.newComment = function(postId, user, content) {

}

exports.getComments = function(postId) {

}

exports.newLike = function(postId, user) {

}

exports.getLikesNumber = function() {

}

exports.getCommentsNumber = function() {

}
