const { productsDb } = require("../databases/init-db");

const deleteProduct = (req, res) => {
  const productId = req.params.id;

  const query = 'DELETE FROM products WHERE id = ?';
  
  productsDb.run(query, [productId], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting product', error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  });
};

module.exports = deleteProduct;
