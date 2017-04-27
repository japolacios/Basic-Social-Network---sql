//Define Node Modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
//var mysql = require("mysql");
//Define Server Usage
app.use(express.static('public'));
app.use(express.static('files'));
//Set Cros
app.use(cors());
// Set & Run Server 
var hostname = 'localhost';
var port = 3001;
app.listen(port, hostname, function () {
    console.log('Server Running at http://' + hostname + ':' + port + '/');
});
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
        //process.exit(1);
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
/*
//User Login
app.post('/login', function (req, res, next) {
    console.log('Atempting Login');
    userName = req.body.userName;
    userPassword = req.body.userPassword;
    console.log('User Name: ' + userName + ' - Password: ' + userPassword);
    resultados = (db.userLogin(userName, userPassword));
    console.log('Resultados' + resultados);

    if (resultados == 1) {

    } else if (resultados == 2) {

    } else if (resultados == 3) {
        
    } else if (resultados == 4) {
        console.log('Hola?');
    }
});

*/

app.post('/login', function (req, res, next) {
    console.log('Atempting Login');
    userName = req.body.userName;
    userPassword = req.body.userPassword;
    console.log('User Name: ' + userName + ' - Password: ' + userPassword);

    if (userName == null || userName == "" || userPassword == null || userPassword == "") {
        console.log('Data Missing');
        return 4;
    } else {

        console.log('Got the Login Function');
        user = userName;
        console.log('User has been set');
        db.getConection.query({
                sql: 'SELECT * FROM users WHERE user = ?',
                timeout: 10000, // 10s
            }, [user],
            function (err, rows) {

                if (err) {
                    console.log(err);
                } else {
                    console.log(rows[0]);

                    if (rows.length == 0) {

                        return 1;

                        res.render('landing', {
                            message: 'El correo electrónico que has introducido no coincide con ninguna cuenta.'
                        });

                    } else {
                        if (rows[0].password == userPassword) {
                            current_user = rows[0];
                            /*
                            res.redirect(303, '/user/' + rows[0].user + '/wall');
                            */
                            return 3;
                        } else {

                            return 2;

                            res.render('landing', {
                                message: 'La contraseña que has introducido es incorrecta.'
                            });

                        }
                    }
                }
            });
    }
});

app.get('/register', function (req, res) {
    console.log("Render Register Site");
    res.render('register');
});

app.get('/wallr', function (req, res) {
    console.log("Render Register Site");
    res.render('register');
});
