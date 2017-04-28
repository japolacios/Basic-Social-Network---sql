//Define Node Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

//Set Cros
app.use(cors());
// Set Server Vars 
var hostname = 'localhost';
var port = 3001;
//Set Public File
app.use(express.static('public'));
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
var userRouter = require('./routes/user-router');
app.use("/login", userRouter);
var registerRouter = require('./routes/register-router');
app.use("/register", registerRouter);

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

    res.redirect(303,'/login');
    /*
    console.log('Login Render');
    res.render('landing', {
        error: "Hola"
    });
    */
});

