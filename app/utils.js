var qs = require('querystring');
const fs = require('fs');
var fileContents = fs.readFileSync('./view/profile.html', {encoding: 'utf8'});
function parseBody(req, callback) {
    var body = '';
    req.on('data', function(data) {
        body += data;
    });
    req.on('end', function() {
        callback(undefined, qs.parse(body));
    });
}
function replace(tpl, data) {
}
module.exports = {
    parseBody: parseBody,

}
