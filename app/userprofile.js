var fs = require('fs');
var userprofile = fs.readFileSync('./view/profile.html', {encoding: 'utf8'});
module.exports=function(req,res){
res.end(userprofile);
}
