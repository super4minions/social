var test = require('tape');
var shot = require('shot');
var handler = require('../main.js');
var dbutils = require('../app/dbutils.js');
var client = dbutils.dbconnection;
test('POST /signup: if the user is NOT EXISTS ,should insert his data to DB and redirect him to userprofile page', function(t) {
    var validation
    shot.inject(handler, {
        method: 'POST',
        url: '/signup',
        payload: 'firstname=test&lastname=test&email=test@gmail.com&password=123'
    }, function(res) {
        t.equal(res.headers.Location, "/userprofile", "redirect to userprofile correctly");
        t.equal(res.statusCode, 302, "get status code correctly");
        dbutils.selectFromDB('test@gmail.com', 'users', client, function(err, result) {
            t.equal(result > 0, true, 'insert the the user information correctly');
            t.end()

        });
    })
});

test('POST /signup: if the user is  EXISTS ,should stay in main page (signup page)', function(t) {
    var validation
    shot.inject(handler, {
        method: 'POST',
        url: '/signup',
        payload: 'firstname=test&lastname=test&email=test@gmail.com&password=123'
    }, function(res) {
        t.equal(res.headers.Location, "/signuperror", "stay in sign up page");
        t.equal(res.statusCode, 302, "get status code correctly");
        t.end()
    });
});
test('POST /login: if the user insert correct email and password ,redirect him to userprofile page', function(t) {
    var validation
    shot.inject(handler, {
        method: 'POST',
        url: '/login',
        payload: 'email=test@gmail.com&password=123'
    }, function(res) {
        t.equal(res.headers.Location, "/userprofile", "redirect to userprofile correctly");
        t.equal(res.statusCode, 302, "get status code correctly");
        t.end()
    });
});

test('POST /login: if the user insert UNCORRECT email or password ,should stay in main page (signup page)', function(t) {
    var validation
    shot.inject(handler, {
        method: 'POST',
        url: '/login',
        payload: 'email=test@gmail.com&password=123654789'
    }, function(res) {
        t.equal(res.headers.Location, "/signuperror", "stay in sign up page");
        t.equal(res.statusCode, 302, "get status code correctly");
        t.end()
    });
});

// test('POST /posts: should insert the input to DB ', function(t) {
//     var validation
//     shot.inject(handler, {
//         method: 'POST',
//         url: '/posts',
//         payload: 'Just For Test'
//     }, function(res) {
//         t.equal(res.statusCode, 200, "get status code correctly");
//         t.end()
//
//     });
// });
test('POST /displayposts: should display posts table contents', function(t) {
    var validation
    shot.inject(handler, {
        method: 'POST',
        url: '/displayposts'
    }, function(res) {
        t.notEqual(res.payload, undefined, " return the content of posts table");
        t.equal(res.statusCode, 200, "get status code correctly");
        client.end(function(err) {
            if (err) {
                console.log('errorSelect', errorSelect);
            }
            t.end()
        });

    });
});


test('GET /: should return index.html', function(t) {
    shot.inject(handler, {
        method: 'GET',
        url: '/'
    }, function(res) {

        var validation = res.payload.indexOf('form');
        t.equal(validation !== -1, true, "finde form word");
        t.equal(res.statusCode, 200, "get status code correctly");
        t.end()
    });
});

test('GET /profile.js :should return profile.js file from view folder', function(t) {
    shot.inject(handler, {
        method: 'GET',
        url: '/profile.js'
    }, function(res) {
        var validtion = res.payload.indexOf('getElementById');
        t.equal(validtion !== 1, true, "get 'getElementById' some where");
        t.equal(res.statusCode, 200, 'get statusCode correctly ');
        t.end();

    });
});
test('GET /not found :should return Error Occured message', function(t) {
    shot.inject(handler, {
        method: 'GET',
        url: '/not found'
    }, function(res) {
        t.equal(res.payload, 'Error Occured', 'get Error Occured message ');
        t.end();

    });
});
test('GET /style.css :should return style.css file from view folder', function(t) {
    shot.inject(handler, {
        method: 'GET',
        url: '/style.css'
    }, function(res) {
        var validtion = res.payload.indexOf('font-size');
        t.equal(validtion !== 1, true, "get 'font-size' some where");
        t.equal(res.statusCode, 200, 'get statusCode correctly ');
        t.end();

    });
});

test('GET /useprofile.js :should return profile.html file ',function(t){
  shot.inject(handler,{
    method :'GET',
    url: '/useprofile.js'
  },function (res) {
    var validtion = res.payload.indexOf('input');
    t.equal(validtion !==1, true,"get 'input' some where");
    t.equal(res.statusCode,200,'get statusCode correctly ');
    t.end();

  });
});
