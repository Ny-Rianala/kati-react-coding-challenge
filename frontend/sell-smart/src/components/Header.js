import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Header.scss';

const Header = ({ isAuthenticated, onLogin, onLogout }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <header className="header">
      <div>Logo goes here</div>
      <nav className="navigation">
        <Link className="products-link" to="/products">Products</Link>
        <Link className="contact-link" to="/contact">Contact</Link>
        <button onClick={onLogin}>
          {isAuthenticated ? 'Log Out' : 'Log In'}
        </button>
        <button>Add Your Product</button>
      </nav>
      {showModal && <div className="modal"> {/* Modal content here */} </div>}
    </header>
  );
};

export default Header;
