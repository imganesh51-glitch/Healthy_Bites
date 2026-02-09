import Image from 'next/image';
import Link from 'next/link';
import { products, siteConfig } from '../lib/data';
import './home.css';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <Image
            src={siteConfig?.heroImage || '/images/hero-baby.png'}
            alt="Happy baby eating"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            priority
          />
        </div>

        <div className="container hero-content">
          <h1 className="hero-title">
            Pure Love in <br />
            <span style={{ color: 'var(--color-primary)' }}>Every Spoonful</span>
          </h1>
          <p className="hero-subtitle">
            Organic, preservative-free baby food designed by pediatricians and crafted by chefs. Give your baby the healthiest start.
          </p>
          <Link href="/products" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
            Shop Healthy Bites
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges-section">
        <div className="container badges-container">
          {['100% Organic', 'No Added Sugar', 'Pediatrician Approved', 'Freshly Made'].map((badge) => (
            <div key={badge} className="card badge-card">
              <h3 style={{ color: 'var(--color-secondary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>✓</h3>
              <p style={{ fontWeight: 600 }}>{badge}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2 className="featured-title">Customer Favorites</h2>
          <div className="products-grid-home">
            {featuredProducts.map(product => (
              <div key={product.id} className="card product-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '250px', marginBottom: '1.5rem', borderRadius: '15px', overflow: 'hidden' }}>
                  <Image
                    src={product.image} // using placeholder
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ marginBottom: 'auto' }}>
                  <span style={{
                    background: 'var(--color-secondary)',
                    color: '#006644',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>{product.category.toUpperCase()}</span>
                  <h3 style={{ marginTop: '1rem', fontSize: '1.5rem' }}>{product.name}</h3>
                  <p style={{ color: 'var(--color-text-light)', marginTop: '0.5rem' }}>{product.description}</p>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹{product.price}</span>
                  <Link href={`/products/${product.id}`} className="btn" style={{
                    background: 'var(--color-accent)',
                    color: 'var(--color-text)',
                    fontSize: '0.9rem',
                    padding: '8px 20px'
                  }}>
                    Add to Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/products" className="btn btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Story Teaser */}
      <section className="story-section">
        <div className="container story-container">
          <div className="story-content">
            <h2 className="story-title">Our Promise <br /> to You and Your Baby</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
              Started by parents, for parents. We believe that every spoonful should be a step towards a healthier future. No shortcuts, just pure, wholesome ingredients sourced from trusted organic farms.
            </p>
            <Link href="/story" className="btn" style={{ background: 'white', color: 'var(--color-secondary)' }}>Read Our Story</Link>
          </div>
          <div style={{ flex: 1, minWidth: '300px', height: '400px', position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            <Image
              src={siteConfig?.storyImage || '/images/products-hero.png'}
              alt="Ingredients"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
