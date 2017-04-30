var userControl = require('../controllers/user-controller');
var db = require('../database');

var user;
exports.newPost = function(picture, content) {
    userId = userControl.getUserId();
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
                var gotOwner = rows[i].owner;
                var gotPicture = rows[i].postPicture;
                var gotText = rows[i].postText;

                //var tempPost = { owner: gotOwner, postPicture: gotPicture, postText: gotText };

                posts.push({ owner: rows[i].owner
                	,postPicture: rows[i].postPicture
                	,postText: rows[i].postText });
                //console.log('Posts Temporales impresos desde el control +++++++++++++++' + tempPost.postText);
                i++;
            }
            console.log('Posts impresos desde el control +++++++++++++++' + posts[1].postPicture);
            
        }
    });
    return posts;
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
