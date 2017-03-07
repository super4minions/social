module.exports = {
    "GET /": require('./app/root.js'),
    "GET /profile.js" : require('./app/profile.js'),
    "GET /style.css" : require('./app/style.js'),
    "POST /posts" : require('./app/posts.js'),
    "POST /signup" : require('./app/signup.js')

}
