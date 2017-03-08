var fs = require('fs');
var fileContents = fs.readFileSync('./view/index.html', {encoding: 'utf8'});
module.exports=function(req,res){
res.end(fileContents);
}
