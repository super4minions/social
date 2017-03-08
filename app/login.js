var utitls1= require('../app/utils.js')
var dbutils = require('../app/dbutils.js')
var config = {
  // user: 'postgres', //env var: PGUSER
  // database: 'facebook', //env var: PGDATABASE
  // password: '123456', //env var: PGPASSWORD
  // host: 'localhost', // Server hosting the postgres database
  user: 'rtcjczljxqkups', //env var: PGUSER
  database: 'dcbodnehnplqbi', //env var: PGDATABASE
  password: '01df6173ba790b17d804b54936b6f7c161b4a2617940bfa3fd67f469fcc594d9', //env var: PGPASSWORD
  host: 'ec2-54-83-205-71.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
  ssl: true// how long a client is allowed to remain idle before being closed

};

module.exports = function(req, res) {
    utitls1.parseBody(req,function (err,body) {
    dbutils.validation(body,"users",config,function(err,result){
      console.log('body',body);
      if(result> 0){
        res.writeHead(302, {
          'Location': '/userprofile'
         });

      res.end();

    }else{
      res.writeHead(302, {
        'Location': '/signuperror'
       });

    res.end();


    }
    })

  })

}
