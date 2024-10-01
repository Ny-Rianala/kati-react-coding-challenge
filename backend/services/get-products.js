const { productsDb } = require("../databases/init-db.js");

const getAllProducts = (req, res) => {
  if (!req.user) {
    return res.status(403).json({ message: 'Not authenticated.' });
  }
    productsDb.all(`SELECT * FROM products`, [], (err, products) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving products', error: err.message });
    }

    return res.status(200).json({ message: 'Products retrieved successfully', data: products });
  });
};

module.exports = getAllProducts;
