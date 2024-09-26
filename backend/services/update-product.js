const { productsDb } = require("../databases/init-db");

const sql = `
UPDATE products
SET 
  name = COALESCE(?, name),
  image_link = COALESCE(?, image_link),
  description = COALESCE(?, description),
  is_liked = COALESCE(?, is_liked),
  available_stocks = COALESCE(?, available_stocks),
  price = COALESCE(?, price),
  is_negotiable = COALESCE(?, is_negotiable),
  owner_name = COALESCE(?, owner_name),
  owner_email = COALESCE(?, owner_email),
  owner_phone = COALESCE(?, owner_phone),
  owner_address = COALESCE(?, owner_address),
  owner_availability = COALESCE(?, owner_availability)
WHERE id = ?`;

const updateProduct = (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters
    // Prepare to select the current product details
    productsDb.get(`SELECT * FROM products WHERE id = ?`, [id], (err, product) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving product', error: err.message });
        }
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Destructure the request body
        const { name, image_link, description, is_liked, available_stocks, price, is_negotiable, owner } = req.body;
        // Prepare the SQL update statement, updating only provided fields
      
        // Execute the SQL statement
        init_db_1.productsDb.run(sql, [
            name || null,
            image_link || null,
            description || null,
            is_liked || null,
            available_stocks || null,
            price || null,
            is_negotiable || null,
            owner ? owner.name : null,
            owner ? owner.email : null,
            owner ? owner.phone_number : null,
            owner ? owner.address : null,
            owner ? owner.availability : null,
            id
        ], function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error updating product', error: err.message });
            }
            // Return the updated product information
            const updatedProduct = {
                id,
                name: name || product.name,
                image_link: image_link || product.image_link,
                description: description || product.description,
                is_liked: is_liked !== undefined ? is_liked : product.is_liked,
                available_stocks: available_stocks !== undefined ? available_stocks : product.available_stocks,
                price: price !== undefined ? price : product.price,
                is_negotiable: is_negotiable !== undefined ? is_negotiable : product.is_negotiable,
                owner: {
                    name: owner ? owner.name : product.owner_name,
                    email: owner ? owner.email : product.owner_email,
                    phone_number: owner ? owner.phone_number : product.owner_phone,
                    address: owner ? owner.address : product.owner_address,
                    availability: owner ? owner.availability : product.owner_availability
                }
            };
            return res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
        });
    });
};
module.exports = updateProduct;
