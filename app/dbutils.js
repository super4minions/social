'use strict';
var pg = require('pg');
var client = {
    user: 'rtcjczljxqkups', //env var: PGUSER
    database: 'dcbodnehnplqbi', //env var: PGDATABASE
    password: '01df6173ba790b17d804b54936b6f7c161b4a2617940bfa3fd67f469fcc594d9', //env var: PGPASSWORD
    host: 'ec2-54-83-205-71.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
    ssl: true // how long a client is allowed to remain idle before being closed
};

function dbconnection(client, cb) {
    var client = new pg.Client(client);
    client.connect(function(err) {
        if (err) {
            cb(err, undefined);
            return;
        }
    });
    return client;
}

function insertToPostsTable(input, token, client, cb) {
        client.query(`INSERT INTO posts (post_contents, email)values (\'${input}\',\' ${token}\');`, function(errorSelect, result) {
            cb(undefined)
            if (errorSelect) {
                console.log('errorSelect', errorSelect);
            }
    });
}

function selectallposts(client, cb) {
    client.query('SELECT posts.post_contents, users.first_name from posts INNER JOIN users ON posts.user_id = user.id;', function(errorSelect, result) {
        if (errorSelect) {
            cb(errorSelect, undefined)
        }
        cb(undefined, result.rows)
    });
}

function selectFromDB(user_email, table_name, client, cb) {
    client.query(`SELECT email from ${table_name} where email = \'${user_email}\'; `, function(errorSelect, result) {
        if (errorSelect) {
            cb(errorSelect, undefined)
        }
        cb(undefined, result.rowCount)
    });
}

function validation(input, table_name, client, cb) {
    client.query(`SELECT *  from ${table_name} where email = \'${input.email}\' AND password  = \'${input.password}\'; `, function(errorSelect, result) {
        if (errorSelect) {
            console.log('errorSelect', errorSelect);
            cb(errorSelect, undefined)
        }
        cb(undefined, result.rowCount)
    });
}

function insertToUsersTable(input, client, cb) {
    client.query(`INSERT INTO users (first_name,last_name,email,password)values (
      \'${input.firstname}\',
      \'${input.lastname}\',
      \'${input.email}\',
      \'${input.password}\');`,
      function(errorInsert, result) {
        if (errorInsert) {
            cb(errorInsert)
        }
        cb(undefined)

    });
}

module.exports = {
    insertToPostsTable: insertToPostsTable,
    selectFromDB: selectFromDB,
    dbconnection: dbconnection,
    insertToUsersTable: insertToUsersTable,
    validation: validation,
    selectallposts: selectallposts,
    dbconnection: dbconnection(client, function(err) {})

}
// function createTable(client,cb){
//   console.log();
//   dbconnection(client, function(err, client3) {
//     client3.query(`CREATE TABLE IF NOT EXISTS posts (
//       ID SERIAL,
//       post_contents varchar(64),
//       userId INT REFERENCES users (id)
//     )
//       ;`,function (errCreate) {
//         cb(undefined);
//       client3.end(function(errEnd) {
//           // if (errEnd) {
//           //     console.log('errEnd', errEnd);
//           // }
//       });
//     });
//   });
//
// }
// function createTable(client,cb){
//   dbconnection(client, function(err, client3) {
//     client3.query(`CREATE TABLE IF NOT EXISTS users (
//       ID SERIAL PRIMARY KEY,
//       first_name varchar(64),
//       last_name varchar(64),
//       email varchar(64),
//       password varchar(64));`,function (errCreate) {
//         cb(undefined);
//       client3.end(function(errEnd) {
//           // if (errEnd) {
//           //     console.log('errEnd', errEnd);
//           // }
//       });
//     });
//   });
//
// }
// createTable(client,function (err) {

// })
