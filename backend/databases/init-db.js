const sqlite3 = require('sqlite3').verbose();
const path = require('path');

 const productsDb = new sqlite3.Database(path.resolve(__dirname, './products.db'), (err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

const sqlite = require('sqlite3').verbose();

// Connect to SQLite database
const usersDb = new sqlite.Database('./users.db', (err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});


module.exports = { productsDb, usersDb };
