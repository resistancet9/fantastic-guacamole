const express = require('express')
const app = express() // by calling express() we're creating instance of express. We can create as many as we want and run each app at different port. 
const port = 3000 // which port the backend server will run on.
app.use(express.json());
var mysql = require('mysql'); // this module we need to install my running 'npm install mysql' to access mysql server from nodejs.

// once you setup mysql server. https://dev.mysql.com/downloads/windows/installer/8.0.html
// test connection by adding a new connection
// url is localhost
// port in 3306
// and usuername 'root' and password you gave. 
// then run the following query in mysql workbench(itll be installed) to create Database, then table

// CREATE DATABASE 'nodejs';

// CREATE TABLE `nodejs`.`chocolates` (
//   `id` INT NULL AUTO_INCREMENT,
//   `name` VARCHAR(45) NULL,
//   PRIMARY KEY (`id`));

// run this multiple times with more chocolate names
// INSERT INTO nodejs.chocolates VALUES (null, 'Amul')



// Above steps are just to setup mysql server and create dummy data and dummy table.
// below steps to access that dummy data from nodejs.

var con = mysql.createConnection({ // enter host name, user and password, if you dont mention port itll take 3306 by default.
  host: "localhost",
  user: "root",
  password: "91225255",
  database: 'nodejs' // ive given query to create nodejs database, we can specify which database to connect here.
});

con.connect(function(err) { // here we actually make the connection
  if (err) throw err;
  console.log("Connected!"); // this should display in console if its connected.
});


// client should make GET request at /
app.get('/', (req, res) => {
  // ive given query above to create 'chocolates' table. here ill select all from that table. we know the default databse is 'nodejs'.
  con.query('select * from chocolates', function (err, result) { // you can write any query related to the db.
    if (err) throw err;
    res.send(result) // send the query result to client.
  });
})


// we call app.listen then pass the port number. itll start the server.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})