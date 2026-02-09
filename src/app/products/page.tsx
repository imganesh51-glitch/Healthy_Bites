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
        <div className="container" style={{ padding: '6rem 0' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primary)' }}>Our Menu</h1>
            <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Explore our range of organic purees, snacks, and meals tailored for every stage of your baby's growth.
            </p>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className="btn"
                        style={{
                            background: filter === cat ? 'var(--color-primary)' : 'white',
                            color: filter === cat ? 'white' : 'var(--color-text)',
                            border: '1px solid var(--color-primary)',
                            boxShadow: filter === cat ? 'var(--shadow-md)' : 'none',
                            textTransform: 'capitalize',
                            minWidth: '100px',
                            marginBottom: '0.5rem'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2.5rem'
            }}>
                {filteredProducts.map(product => (
                    <Link href={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{
                                position: 'relative',
                                height: '220px',
                                marginBottom: '1.5rem',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                background: '#f9f9f9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'contain', padding: '1rem' }}
                                />
                            </div>
                            <div style={{ padding: '0 0.5rem', flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        background: 'var(--color-secondary)',
                                        color: '#006644',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700
                                    }}>{product.category}</span>
                                    <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>{product.ageGroup}</span>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                                    {product.variants && product.variants.length > 0
                                        ? product.variants.map(v => v.weight).join(' | ')
                                        : product.weight}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.4 }}>{product.description}</p>
                            </div>

                            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹{product.price}</span>
                                <span className="btn" style={{
                                    background: 'var(--color-primary)',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    padding: '8px 16px',
                                    border: 'none',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    View Details
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
