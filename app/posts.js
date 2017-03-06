var utils = require('../app/utils.js');
var dbutils = require('../app/dbutils.js');
module.exports = function(req, res) {
    utils.parseBody(req, function(err, data) {
        dbutils.db(data, function(err, result) {
            console.log("RESSSS", result);
            res.end(JSON.stringify(result));
        });

    })
}
