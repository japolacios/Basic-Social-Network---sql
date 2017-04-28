var db = require('../database');

var user;


exports.userLogin = function(userName, userPassword, done) {

    if (userName == null || userName == "" || userPassword == null || userPassword == "") {
        message = "Debes ingresar todos los datos";
    } else {

        console.log('Got the Login Function');
        user = userName;
        console.log('User has been set');
        db.getConection().query({
                sql: 'SELECT * FROM users WHERE user = ?',
                timeout: 1000,
            }, [user],
            function(err, rows) {
                if (err) {
                    console.log(err);
                    done(0);
                } else {
                    console.log(rows[0]);
                    if (rows.length == 0) {
                        done(1);
                        /*
                        res.render('login', {
                            error: 'El correo electrónico que has introducido no coincide con ninguna cuenta.'
                        });
                        */
                    } else {
                        if (rows[0].password == userPassword) {
                            current_user = rows[0];
                            /*
                            res.redirect(303, '/user/' + rows[0].user + '/wall');
                            */
                            done(2);
                        } else {

                            done(3);
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
