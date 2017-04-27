var express = require('express');
var app = express();
//
var bodyParser = require('body-parser');
var routes = require('./routes/index');
//
app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//MyModules
var db = require('./database');
// Set & Run Server with public folder
app.use(express.static(__dirname + '/public'));
var hostname = 'localhost';
var port = 3001;
app.listen(port, hostname, function () {
    console.log('Server Running at http://' + hostname + ':' + port + '/');
});
//Set Render Engine - Get main as template
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
/* 
Define Avliable Resources
 */
//Default Behavior
app.all('/', function (req, res, next) {
    console.log('Login Render');
    res.render('home');
});