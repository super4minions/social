var fs = require('fs');
var utitls1 = require('../app/utils.js')
var dbutils = require('../app/dbutils.js')
var userprofile;
var fileContents = fs.readFileSync('./view/profile.html', {
    encoding: 'utf8'
});
var client = dbutils.dbconnection;
module.exports = function(req, res) {
    utitls1.parseBody(req, function(err, body) {

        dbutils.selectFromDB(body.email, "users", client, function(err, result) {
            if (result > 0) {
                res.writeHead(302, {
                    'Location': '/signuperror'
                });
                res.end();
            } else {
                dbutils.insertToUsersTable(body, client, function(err) {
                })
                res.writeHead(302, {
                    'Location': '/userprofile',
                    'Set-Cookie': 'token='+body.firstname
                });
                res.end();
            }
        })
    })
}
