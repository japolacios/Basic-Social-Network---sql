var db = require('../database');

var user;


exports.userLogin = function (userName, userPassword) {

    if (userName == null || userName == "" || userPassword == null || userPassword == "") {
        message = "Debes ingresar todos los datos";
    }

    console.log('Got the Login Function');
    user = userName;
    console.log('User has been set');
    getConnection.query({
            sql: 'SELECT * FROM users WHERE user = ?',
            timeout: 40000, // 40s
        }, [user],
        function (err, rows) {

            if (err) {
                console.log(err);
            } else {
                console.log(rows[0]);

                if (rows.length == 0) {

                    return 1;
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
                        return 2;
                    } else {

                        return 3;
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
