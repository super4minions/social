var fs = require('fs');
var fileContents = fs.readFileSync('./view/profile.html', {
    encoding: 'utf8'
});
var utils = require('../app/utils.js')
module.exports = function(req, res) {
        res.end(fileContents)
}
