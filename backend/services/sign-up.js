const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite = require('sqlite3').verbose();

// Connect to SQLite database
const usersDb = new sqlite.Database('./databases/users.db', (err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Create users table if it doesn't exist
usersDb.serialize(() => {
  usersDb.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )`);
});

const JWT_SECRET = process.env.JWT_SECRET;

const signUp = (async (req, res) => {
    const { name, email, password} = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
        usersDb.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err.message });
        }
        
  
        if (row) {
          return res.status(400).json({ message: 'Email address already exists' });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        usersDb.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, 
          [name, email, hashedPassword], (err) => {
            if (err) {
              if (err.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email') {
                return res.status(400).json({ message: 'Email address already exists' });
              }
              return res.status(500).json({ message: 'Error creating user', error: err.message });
            }
  
            const token = jwt.sign(
              { id: this.lastID, email },
              JWT_SECRET,
              { expiresIn: '2d' }
            );
  
            return res.status(201).json({
              message: 'User created successfully',
              data: {
                name,
                email,
                userId: this.lastID,
                token 
              }
            });
          }
        );
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  });


  module.exports = signUp;