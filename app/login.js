var utitls1 = require('../app/utils.js')
var dbutils = require('../app/dbutils.js')
var client = dbutils.dbconnection;
module.exports = function(req, res) {
    utitls1.parseBody(req, function(err, body) {
        dbutils.validation(body, "users", client, function(err, result) {
            if (result > 0) {
                res.writeHead(302, {
                    'Location': '/userprofile'
                });
                res.end();
            } else {
                res.writeHead(302, {
                    'Location': '/signuperror'
                });
                res.end();
            }
        })
    })
}
