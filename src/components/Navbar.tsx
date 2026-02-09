'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import './navbar.css';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo">
          Aaditya's Healthy Bites
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link href="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/products" className="nav-link" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/story" className="nav-link" onClick={() => setIsOpen(false)}>Our Story</Link>
          <Link href="/cart" className="nav-link cart-btn" onClick={() => setIsOpen(false)}>
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
