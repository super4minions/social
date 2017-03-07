var utils = require('../app/utils.js');
var dbutils = require('../app/dbutils.js');
var config = {
    user: 'postgres', //env var: PGUSER
    database: 'facebook', //env var: PGDATABASE
    password: '123654', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
module.exports = function(req, res) {
    utils.parseBody(req, function(err, data) {
        dbutils.insertToPostsTable(data,config, function(err) {
dbutils.selectFromDB("posts",config,function(err,result){
  res.end(JSON.stringify(result));

})

        });

    })
}
