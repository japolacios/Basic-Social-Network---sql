//Define Node Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var userRouter = require('./routes/user-router');

//var mysql = require("mysql");
//Define Server Usage
app.use(express.static('public'));
app.use(express.static('files'));
//Set Cros
app.use(cors());
// Set & Run Server 
var hostname = 'localhost';
var port = 3001;

//Set Public File
app.use('/public', express.static('static/'));



//Define body-parser usage
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Set Render Engine - Get main as template
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//**********************************
//MyModules
//**********************************
var db = require('./database');

//Fetch DataBase

db.connect(function (err) {
    console.log('Atempting Conection');
    if (err) {
        console.log('Conection Failed');
        process.exit(1);
    } else {
        console.log('Conection Succes');
        app.listen(port, hostname, function () {
            console.log('Server Running at http://' + hostname + ':' + port + '/');
        });
    }
});
//Renders
//Default Behavior
app.all('/', function (req, res, next) {
    console.log('Login Render');
    res.render('landing', {
        message: "Hola"
    });
});

app.use("/login",userRouter.getUserRoutes());

