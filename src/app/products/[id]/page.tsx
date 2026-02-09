'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '../../../lib/data'; // relative path or @/lib/data
import { useCart } from '../../../context/CartContext';
import { useState } from 'react';

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const product = products.find(p => p.id === id);
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const [selectedVariant, setSelectedVariant] = useState(
        product?.variants && product.variants.length > 0 ? product.variants[0] : undefined
    );
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
                <h1>Product Not Found</h1>
                <Link href="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Products</Link>
            </div>
        );
    }

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;
    const currentWeight = selectedVariant ? selectedVariant.weight : product.weight;

    const handleAddToCart = () => {
        addToCart(product, selectedVariant, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <Link href="/products" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--color-text-light)' }}>
                &larr; Back to Menu
            </Link>

            <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px', background: '#f9f9f9', borderRadius: '20px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <span style={{
                        background: 'var(--color-secondary)',
                        color: '#006644',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        display: 'inline-block',
                        marginBottom: '1rem'
                    }}>{product.category}</span>

                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{product.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>₹{currentPrice}</p>
                        {currentWeight && (
                            <span style={{
                                fontSize: '1.1rem',
                                background: '#f0f0f0',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                color: '#555'
                            }}>
                                {currentWeight}
                            </span>
                        )}
                    </div>

                    {product.variants && product.variants.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--color-text-light)' }}>Select Size:</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {product.variants.map((v) => (
                                    <button
                                        key={v.weight}
                                        onClick={() => setSelectedVariant(v)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            border: selectedVariant?.weight === v.weight ? '2px solid var(--color-primary)' : '1px solid #ddd',
                                            background: 'white',
                                            color: selectedVariant?.weight === v.weight ? 'var(--color-primary)' : 'var(--color-text)',
                                            cursor: 'pointer',
                                            fontWeight: selectedVariant?.weight === v.weight ? 700 : 400
                                        }}
                                    >
                                        {v.weight}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', marginBottom: '2rem', lineHeight: 1.6 }}>
                        {product.description}
                    </p>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Ingredients:</h3>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {product.ingredients.map(ing => (
                                <span key={ing} style={{
                                    background: 'white',
                                    border: '1px solid #eee',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem'
                                }}>
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                style={{
                                    padding: '1rem',
                                    background: 'white',
                                    border: 'none',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer'
                                }}
                            >
                                -
                            </button>
                            <span style={{ padding: '0 1rem', fontSize: '1.2rem', fontWeight: 600 }}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                style={{
                                    padding: '1rem',
                                    background: 'white',
                                    border: 'none',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer'
                                }}
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-primary"
                            style={{
                                flex: 1,
                                fontSize: '1.1rem',
                                backgroundColor: added ? 'var(--color-secondary)' : 'var(--color-primary)',
                                color: added ? '#006644' : 'white'
                            }}
                        >
                            {added ? 'Added to Cart!' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
