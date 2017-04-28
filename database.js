var mySql = require('mysql');
var pool = null;
var user;
exports.connect = function (done) {
    pool = mySql.createPool({
        host: 'localhost'
        , user: 'root'
        , password: 'root'
        , database: 'social-net'
    });
    console.log('Pool Created');
    if(pool){
        done();
    }else{
        done("Error al conectarme");
    }
}
exports.getConection = function () {
    return pool;
}
exports.userLogin = function (userName, userPassword) {
    if (userName == null || userName == "" || userPassword == null || userPassword == "") {
        console.log('Data Missing');
        return 4;
    }
    else {
        console.log('Got the Login Function');
        user = userName;
        console.log('User has been set');
        pool.query({
            sql: 'SELECT * FROM users WHERE user = ?'
            , timeout: 10000, // 10s
        }, [user], function (err, rows) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(rows[0]);
                if (rows.length == 0) {
                    return 1;
                    /*
                    res.render('login', {
                        error: 'El correo electrónico que has introducido no coincide con ninguna cuenta.'
                    });
                    */
                }
                else {
                    if (rows[0].password == userPassword) {
                        current_user = rows[0];
                        /*
                        res.redirect(303, '/user/' + rows[0].user + '/wall');
                        */
                        return 3;
                    }
                    else {
                        return 2;
                        /*
                        res.render('login', {
                            errorC: 'La contraseña que has introducido es incorrecta.'
                        });
                        */
                    }
                }
            }
        });
    }
}