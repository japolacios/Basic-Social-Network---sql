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