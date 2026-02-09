'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext'; // Adjust path if needed

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '1rem 0',
      background: 'rgba(253, 251, 247, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 143, 171, 0.2)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--color-primary)',
          letterSpacing: '-1px'
        }}>
          Aaditya's Healthy Bites
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/products" className="nav-link">Products</Link>
          <Link href="/story" className="nav-link">Our Story</Link>
          <Link href="/cart" className="nav-link cart-btn" style={{
            position: 'relative'
          }}>
            Cart <span style={{
              background: 'var(--color-primary)',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '0.8rem',
              marginLeft: '4px'
            }}>{cartCount}</span>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .nav-link {
          font-weight: 600;
          color: var(--color-text);
          font-size: 0.95rem;
        }
        .nav-link:hover {
          color: var(--color-primary);
        }
        .cart-btn:hover span {
          background: var(--color-accent);
        }
      `}</style>
    </nav>
  );
}
