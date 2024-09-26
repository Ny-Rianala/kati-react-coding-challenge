require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const signUp = require('./services/sign-up.js');  // Import sign-up service
const logIn = require('./services/log-in.js');
const createProduct = require('./services/create-product.js');
const updateProduct = require('./services/update-product.js');
const getAllProducts = require('./services/get-products.js');
const deleteProduct = require('./services/delete-product.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.post('/api/signup', signUp);
app.post('/api/login', logIn);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);
app.get('/api/products', getAllProducts);
app.delete('/api/products/:id', deleteProduct);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
