const path = require('path');
const sqlite = require('sqlite3').verbose();

const connectToDatabase = (dbName) => {
  return new sqlite.Database(path.join(__dirname, dbName), (err) => {
    if (err) {
      console.error(`Error connecting to the ${dbName} database`, err);
    } else {
      console.log(`Connected to SQLite ${dbName} database`);
    }
  });
};

const usersDb = connectToDatabase('users.db');
const productsDb = connectToDatabase('products.db');

module.exports = { usersDb, productsDb };