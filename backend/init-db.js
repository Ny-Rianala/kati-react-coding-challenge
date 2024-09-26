const sqlite3 = require('sqlite3').verbose();
const path = require('path');

 const productsDb = new sqlite3.Database(path.resolve(__dirname, './databases/products.db'), (err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = productsDb;
