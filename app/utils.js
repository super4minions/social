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

  Object.keys(data).forEach(function(key) {
    tpl = tpl.replace("{{"+key+"}}", data[key]);
  });
  return tpl;
}
module.exports = {
    parseBody: parseBody,
    replace:replace
}


// console.log(replace(fileContents, {
//   name: 'Hello GSG'
//
// })
// );
