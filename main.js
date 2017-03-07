var router = require('./router.js');

module.exports = function mainhandler(req, res) {
    var path = req.method + " " + req.url;
    console.log("req.method",req.method);
    console.log("req.url",req.url);
    try {
        router[path](req, res);
    } catch (e) {
        console.log("error" + e);
        res.end('Error Occured');
    }
}
