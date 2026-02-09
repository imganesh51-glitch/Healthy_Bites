'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '../../lib/data';


export default function ProductsPage() {
    const [filter, setFilter] = useState<string>('all');

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    const categories = [
        "all",
        "Baby's First Food",
        "Porridge Menu",
        "Dosa Premix Menu",
        "Pancake Premix Menu",
        "Laddus",
        "Healthy Fats / Butters",
        "Nuts and Seeds",
        "Healthy Flours"
    ];

    return (
        <div className="container products-wrapper">
            <h1 className="products-title">Our Menu</h1>
            <p className="products-subtitle">
                Explore our range of organic purees, snacks, and meals tailored for every stage of your baby's growth.
            </p>

            {/* Filter Buttons */}
            <div className="filter-container">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className="btn filter-btn"
                        style={{
                            background: filter === cat ? 'var(--color-primary)' : 'white',
                            color: filter === cat ? 'white' : 'var(--color-text)',
                            border: '1px solid var(--color-primary)',
                            boxShadow: filter === cat ? 'var(--shadow-md)' : 'none'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="products-grid">
                {filteredProducts.map(product => (
                    <Link href={`/products/${product.id}`} key={product.id} className="product-link">
                        <div className="card product-card" style={{ height: '100%', padding: '0.5rem' }}>
                            <div className="product-card-inner">
                                <div className="product-image-container">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        style={{ objectFit: 'contain', padding: '1rem' }}
                                    />
                                </div>
                                <div className="product-details">
                                    <div className="product-meta">
                                        <span className="product-category-tag">{product.category}</span>
                                        <span className="product-age-tag">{product.ageGroup}</span>
                                    </div>

                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-weight">
                                        {product.variants && product.variants.length > 0
                                            ? product.variants.map(v => v.weight).join(' | ')
                                            : product.weight}
                                    </div>
                                    <p className="product-desc">{product.description}</p>
                                </div>

                                <div className="product-footer">
                                    <span className="product-price">₹{product.price}</span>
                                    <span className="details-btn">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
