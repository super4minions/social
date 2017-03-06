var qs = require('querystring');

function parseBody(req, callback) {
    var body = '';
    req.on('data', function(data) {
        body += data;
    });
    req.on('end', function() {
      console.log("typeof(body)",typeof(body));
        callback(undefined, body);
    });
}
module.exports = {
    parseBody: parseBody
}
