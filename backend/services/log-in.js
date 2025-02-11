const { usersDb } = require('../databases/init-db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Ensure JWT_SECRET is defined

const logIn = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    usersDb.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {    
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
  
      if (!row) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      bcrypt.compare(password, row.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Error checking password', error: err.message });
        }
  
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
  
        const token = jwt.sign(
          { id: row.id, email },
          JWT_SECRET,
          { expiresIn: '2d' }
        );
  
        return res.status(200).json({
          message: 'Login successful',
          data: {
            userId: row.id,
            name: row.name,
            email,
            token 
          }
        });
      });
    });
};
  
module.exports = logIn;