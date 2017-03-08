var utils = require('../app/utils.js');
var dbutils = require('../app/dbutils.js');
var client = dbutils.dbconnection;

module.exports = function(req, res) {
    utils.parseBody(req, function(err, data) {        console.log('data', data);
        dbutils.insertToPostsTable(Object.keys(data)[0], client, function(err) {
            res.end();
        });
    });
}
