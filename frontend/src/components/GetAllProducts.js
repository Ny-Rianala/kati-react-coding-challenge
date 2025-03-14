import React, { useState } from 'react';

const HeroSection = () => (
  <section className="hero">
    <h1>Sell Smart</h1>
    <p>We love promoting people’s businesses and helping them sell their products.</p>
  </section>
);

const ProductCard = ({ product, onLike, onDelete }) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <img src={product.image} alt={product.name} />
    <p>{product.description}</p>
    <button onClick={() => onLike(product.id)}>👍 {product.likes}</button>
    <span>{product.price}</span>
    <button onClick={() => onDelete(product.id)}>🗑️</button>
  </div>
);

const ProductsSection = ({ products, onLike, onDelete }) => (
  <section className="products">
    <h2>Discover Our Products</h2>
    <p>Explore a wide range of unique items from small businesses.</p>
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onLike={onLike} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  </section>
);

const GetAllProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Avocado', image: '/img/avocado.jpeg', description: 'Great product', likes: 0, price: '$100' },
    { id: 2, name: 'Cheese', image: '/img/cheese.jpeg', description: 'Another great product', likes: 0, price: '$50' }
  ]);
   

  const handleLike = id => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, likes: product.likes + 1 } : product
    ));
  };

  const handleDelete = id => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <HeroSection />
      <ProductsSection products={products} onLike={handleLike} onDelete={handleDelete} />
    </div>
  );
};

export default GetAllProducts;
