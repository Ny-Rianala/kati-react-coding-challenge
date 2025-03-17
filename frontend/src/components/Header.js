import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';

const Header = ({ isAuthenticated, onLogin, onLogout }) => {
  return (
    <header className="header">
      <div>Logo goes here</div>
      <nav className="navigation">
        <Link className="products-link" to="/products">Products</Link>
        <Link className="contact-link" to="/contact">Contact</Link>

        {}
        {isAuthenticated ? (
          <button onClick={onLogout}>Log Out</button>
        ) : (
          <button onClick={onLogin}>Log In</button>
        )}

        <button>Add Your Product</button>
      </nav>
    </header>
  );
};

export default Header;
