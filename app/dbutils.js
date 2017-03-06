'use strict';
function db(input, cb) {
    var pg = require('pg');
    var config = {
        user: 'postgres', //env var: PGUSER
        database: 'facebook', //env var: PGDATABASE
        password: '123654', //env var: PGPASSWORD
        host: 'localhost', // Server hosting the postgres database
        port: 5432, //env var: PGPORT
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
    var client = new pg.Client(config);
    client.connect(function(err) {
            if (err) {
                console.log("Error conection", err);
            }
            // client.query("CREATE TABLE IF NOT EXISTS posts(ID SERIAL, post_contents varchar(64));", function(errorSelect, result) {
            //     //console.log("result", result.rows);
            //     if (errorSelect) {
            //         console.log('errorSelect', errorSelect);
            //     }
            client.query(`INSERT INTO posts (post_contents)values (\' ${input}'\ );`, function(errorSelect, result) {
                //console.log("result", result);

                if (errorSelect) {
                    console.log('errorSelect', errorSelect);
                }
                client.query('SELECT * from posts;', function(errorSelect, result) {
                    //console.log("result", result.rows);
                    cb(undefined, result.rows)

                    if (errorSelect) {
                        console.log('errorSelect', errorSelect);
                    }
                    client.end(function(err) {
                        if (err) throw err;
                    });
                });
            });
        });
    }
module.exports = {
        db: db
    }
