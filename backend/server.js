require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const signUp = require('./services/sign-up.js');
const logIn = require('./services/log-in.js');
const createProduct = require('./services/create-product.js');
const updateProduct = require('./services/update-product.js');
const getAllProducts = require('./services/get-products.js');
const deleteProduct = require('./services/delete-product.js');
const sendEmail = require('./services/send-email.js');
const authenticateToken = require('./middleware/authenticateToken.js');
const cors = require('cors');

const app = express();
const PORT = 4000;
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Routes
app.post('/api/signup', signUp);
app.post('/api/login', logIn);
app.post('/api/products', authenticateToken, createProduct);
app.put('/api/products/:id', authenticateToken, updateProduct);
app.get('/api/products', authenticateToken, getAllProducts);
app.delete('/api/products/:id', authenticateToken, deleteProduct);
app.post('/api/send-email', authenticateToken, sendEmail)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});