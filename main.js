var router = require('./router.js');

module.exports = function mainhandler(req, res) {
    var path = req.method + " " + req.url;
    try {
        router[path](req, res);
    } catch (e) {
        console.log("error" + e);
        res.end('Error Occured');
    }
}
