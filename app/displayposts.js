var utils = require('../app/utils.js');
var dbutils = require('../app/dbutils.js');
var client = dbutils.dbconnection;
module.exports = function(req, res) {
    dbutils.selectallposts(client, function(err, result) {
        res.end(JSON.stringify(result));
    });
}
