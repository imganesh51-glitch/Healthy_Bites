'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '../../../lib/data';
import { useCart } from '../../../context/CartContext';
import { useState } from 'react';
import './product-detail.css';

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
        <div className="container product-detail-wrapper">
            <Link href="/products" className="back-link">
                &larr; Back to Menu
            </Link>

            <div className="product-detail-container">
                <div className="detail-image-section">
                    <div className="detail-image-wrapper">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                </div>

                <div className="detail-info-section">
                    <span className="detail-category">{product.category}</span>

                    <h1 className="detail-title">{product.name}</h1>
                    <div className="detail-price-row">
                        <p className="detail-price">₹{currentPrice}</p>
                        {currentWeight && (
                            <span className="detail-weight">
                                {currentWeight}
                            </span>
                        )}
                    </div>

                    {product.variants && product.variants.length > 0 && (
                        <div className="variant-selector">
                            <h3 className="variant-label">Select Size:</h3>
                            <div className="variant-options">
                                {product.variants.map((v) => (
                                    <button
                                        key={v.weight}
                                        onClick={() => setSelectedVariant(v)}
                                        className={`variant-btn ${selectedVariant?.weight === v.weight ? 'active' : ''}`}
                                    >
                                        {v.weight}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="detail-description">
                        {product.description}
                    </p>

                    <div className="ingredients-section">
                        <h3 className="ingredients-title">Ingredients:</h3>
                        <div className="ingredients-list">
                            {product.ingredients.map(ing => (
                                <span key={ing} className="ingredient-pill">
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="add-to-cart-row">
                        <div className="quantity-selector">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="qty-btn"
                            >
                                -
                            </button>
                            <span className="qty-display">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                className="qty-btn"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="add-btn"
                            style={{
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
