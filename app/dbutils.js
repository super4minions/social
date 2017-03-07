'use strict';
var pg = require('pg');
function dbconnection(config, cb) {

    var client = new pg.Client(config);
    client.connect(function(err) {
        if (err) {
            console.log("Error conection", err);
              cb(err,undefined);
              return;
        }
        cb(undefined, client);
    });
}
function insertToPostsTable(input, config, cb) {
    dbconnection(config, function(err, client1) {
        client1.query(`INSERT INTO posts (post_contents)values (\'${input}'\ );`, function(errorSelect, result) {
            cb(undefined)
            // if (errorSelect) {
            //     console.log('errorSelect', errorSelect);
            // }
            client1.end(function(errEnd) {
                // if (errEnd) {
                //     console.log('errEnd', errEnd);
                // }
            });
        });
    });
}
function selectFromDB(table_name, config, cb) {
    dbconnection(config, function(err, client2) {
        client2.query(`SELECT * from ${table_name};`, function(errorSelect, result) {
            cb(undefined, result.rows)
            // if (errorSelect) {
            //     console.log('errorSelect', errorSelect);
            // }
            client2.end(function(errEnd) {
                // if (errEnd) {
                //     console.log('errEnd', errEnd);
                // }
            });
        });
    });
}
module.exports = {
    insertToPostsTable : insertToPostsTable,
    selectFromDB : selectFromDB,
    dbconnection : dbconnection

}
// function insertToUsersTable(input, config, cb){
//   dbconnection(config, function(err, client1) {
//       client1.query(`INSERT INTO users (first_name,last_name,email,password)values (\'${input[0]}'\,\'${input[1]}'\,\'${input[2]}'\,\'${input[3]}'\ );`, function(errorSelect, result) {
//           cb(undefined)
//           // if (errorSelect) {
//           //     console.log('errorSelect', errorSelect);
//           // }
//           client1.end(function(errEnd) {
//               // if (errEnd) {
//               //     console.log('errEnd', errEnd);
//               // }
//           });
//       });
//   });
// }
var config = {
    user: 'rtcjczljxqkups', //env var: PGUSER
    database: 'dcbodnehnplqbi', //env var: PGDATABASE
    password: '01df6173ba790b17d804b54936b6f7c161b4a2617940bfa3fd67f469fcc594d9', //env var: PGPASSWORD
    host: 'ec2-54-83-205-71.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
    SSL : true// how long a client is allowed to remain idle before being closed
};
function createTable(config,cb){
  dbconnection(config, function(err, client3) {
    client3.query(`CREATE TABLE IF NOT EXISTS users (
      ID SERIAL,
      first_name varchar(64),
      last_name varchar(64),
      email varchar(64),
      password varchar(64));`,function (errCreate) {
        cb(undefined);
      client3.end(function(errEnd) {
          // if (errEnd) {
          //     console.log('errEnd', errEnd);
          // }
      });
    });
  });

}
createTable(config,function (err) {

})








// function db(input, config, cb) {
//     var pg = require('pg');
//     var client = new pg.Client(config);
//     client.connect(function(err) {
//         if (err) {
//             console.log("Error conection", err);
//         }
//         client.query(`INSERT INTO posts (post_contents)values (\'${input}'\ );`, function(errorSelect, result) {
//             // if (errorSelect) {
//             //     console.log('errorSelect', errorSelect);
//             // }
//             client.query('SELECT * from posts;', function(errorSelect, result) {
//                 //console.log("result", result.rows);
//                 cb(undefined, result.rows)
//                 // if (errorSelect) {
//                 //     console.log('errorSelect', errorSelect);
//                 // }
//                 client.end(function(errEnd) {
//                     // if (errEnd) {
//                     //     console.log('errEnd', errEnd);
//                     // }
//                 });
//             });
//         });
//     });
// }
