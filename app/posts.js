var utils = require('../app/utils.js');
var dbutils = require('../app/dbutils.js');
var client = dbutils.dbconnection;

module.exports = function(req, res) {
    utils.parseBody(req, function(err, data) {
      console.log("req.headers.cookie",req.headers.cookie);
        var ck = req.headers.cookie.split(/=([^;]*)/);
        var token = ck[ck.indexOf("token")+1];
        dbutils.insertToPostsTable(Object.keys(data)[0], token, client, function(err) {
            res.end();
        });
    });
}
