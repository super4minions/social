var fs = require('fs');
var fileContents = fs.readFileSync('./view/profile.js', {encoding: 'utf8'});
module.exports= function(req,res){
res.writeHead(200, {'Content-type' : 'text/javascript'});
res.write(fileContents);
res.end();
}
