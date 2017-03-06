var test = require('tape');
var shot = require('shot');
var handler = require('../main.js');
var dbutils  = require('../app/dbutils.js');
test('POST /posts: should insert the input to DB and return table content', function(t) {
  var validation
    shot.inject(handler,{
      method : 'POST',
      url : '/posts',
      payload:'Just For Test'
    },function (res) {
   validation=  JSON.parse(res.payload).find(function(item){
    return item.post_contents ==='Just For Test'
    })
    console.log("validation",validation);
t.equal(validation.post_contents ==='Just For Test', true,'insert the input and return all table content correctly');
      t.end();
    });
});

test('GET /: should return profile.html', function(t) {
    shot.inject(handler,{
      method : 'GET',
      url : '/'
    },function (res) {

      var validation = res.payload.indexOf('input');
      t.equal(validation !== -1,true,"finde input word");
      t.equal(res.statusCode, 200,"get status code correctly");
      t.end()
    });
});

test('GET /profile.js :should return profile.js file from view folder',function(t){
  shot.inject(handler,{
    method :'GET',
    url: '/profile.js'
  },function (res) {
    var validtion = res.payload.indexOf('getElementById');
    t.equal(validtion !==1, true,"get 'getElementById' some where");
    t.equal(res.statusCode,200,'get statusCode correctly ');
    t.end();

  });
});
test('GET /not found :should return Error Occured message',function(t){
  shot.inject(handler,{
    method :'GET',
    url: '/not found'
  },function (res) {
    t.equal(res.payload,'Error Occured','get Error Occured message ');
    t.end();

  });
});
test('GET /style.css :should return style.css file from view folder',function(t){
  shot.inject(handler,{
    method :'GET',
    url: '/style.css'
  },function (res) {
    var validtion = res.payload.indexOf('font-size');
    t.equal(validtion !==1, true,"get 'font-size' some where");
    t.equal(res.statusCode,200,'get statusCode correctly ');
    t.end();

  });
});
test("when DB name is not correct, should make error in connection with DB",function(t){
  var config = {
      user: 'postgres', //env var: PGUSER
      database: 'bla bla bla', //env var: PGDATABASE
      password: '123654', //env var: PGPASSWORD
      host: 'localhost', // Server hosting the postgres database
      port: 5432, //env var: PGPORT
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
 dbutils.dbconnection(config,function(err,data){
 });

  t.end()
});
