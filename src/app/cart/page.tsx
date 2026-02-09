'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

import { useState } from 'react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [lastOrderId, setLastOrderId] = useState('');

    // Updated form state including new fields for the Bombas-style layout
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        country: 'India',
        street: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        latitude: null as number | null,
        longitude: null as number | null
    });


    const SHIPPING_COST = 150;
    const MIN_ORDER_VALUE = 500;

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderId = Math.random().toString(36).substr(2, 6).toUpperCase();

        let message = `🌿 *Aaditya's Healthy Bites*\n`;
        message += `*New Order!* (#${orderId})\n`;
        message += `*Date:* ${new Date().toLocaleDateString()}\n\n`;

        message += `*Contact Info:*\n`;
        message += `Name: ${formData.firstName} ${formData.lastName}\n`;
        message += `Mobile: ${formData.mobile}\n`;


        message += `\n*Shipping Address:*\n`;
        message += `${formData.street}\n`;
        if (formData.apartment) message += `${formData.apartment}\n`;
        message += `${formData.city}, ${formData.state} - ${formData.zipCode}\n`;
        message += `${formData.country}\n`;

        // Add Google Maps link if location data exists
        if (formData.latitude && formData.longitude) {
            message += `Location: https://www.google.com/maps?q=${formData.latitude},${formData.longitude}\n`;
        }
        message += `\n`;

        message += `*Order Items:*\n`;
        cart.forEach((item) => {
            message += `- ${item.name} [${item.weight}] (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}\n`;
        });

        message += `\n*Subtotal: ₹${total.toFixed(2)}*`;
        message += `\n*Shipping: ₹${SHIPPING_COST.toFixed(2)}*`;
        message += `\n*Grand Total: ₹${(total + SHIPPING_COST).toFixed(2)}*`;

        try {
            const response = await fetch('/api/send-telegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    // phone no longer needed for Telegram as it uses Chat ID from env
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Show success state
                setLastOrderId(orderId);
                setOrderSuccess(true);
                clearCart();
            } else {
                console.error('Failed to send Telegram message:', result.error);
                alert('Order placed locally, but failed to send notification. Please contact support.');
                setOrderSuccess(true); // Still complete the order transaction locally
                clearCart();
            }

        } catch (error) {
            console.error('Error sending order:', error);
            // Even if the notification fails, we consider the "local" order placed for the user's experience
            // In a real app, you might want to retry or save to local storage
            setLastOrderId(orderId);
            setOrderSuccess(true);
            clearCart();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        const locateButton = document.getElementById('locate-me-btn');
        if (locateButton) locateButton.textContent = 'Locating...';

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Using OpenStreetMap Nominatim API for reverse geocoding
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();

                if (data.address) {
                    const addr = data.address;

                    // Improved city detection logic
                    const city = addr.city || addr.town || addr.village || addr.county || addr.state_district || '';

                    // Robust street address construction
                    const streetParts = [];
                    if (addr.house_number) streetParts.push(addr.house_number);
                    if (addr.building) streetParts.push(addr.building);

                    // Road/Street logic
                    const road = addr.road || addr.street || addr.pedestrian || addr.footway || addr.path || addr.residential;
                    if (road) streetParts.push(road);

                    // Area/Locality logic (only if road is missing or for additional context)
                    if (addr.suburb) streetParts.push(addr.suburb);
                    else if (addr.neighbourhood) streetParts.push(addr.neighbourhood);
                    else if (addr.district) streetParts.push(addr.district);

                    const streetAddress = streetParts.join(', ') || '';

                    setFormData(prev => ({
                        ...prev,
                        street: streetAddress,
                        city: city,
                        state: addr.state || '',
                        zipCode: addr.postcode || '',
                        country: 'India',
                        latitude: latitude,
                        longitude: longitude
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch address", error);
                alert("Could not fetch address details.");
            } finally {
                if (locateButton) locateButton.textContent = '📍 Locate Me';
            }
        }, () => {
            alert('Unable to retrieve your location');
            if (locateButton) locateButton.textContent = '📍 Locate Me';
        });
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Your Cart is Empty</h1>
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-light)' }}>
                    Looks like you haven't added any healthy bites yet.
                </p>
                <Link href="/products" className="btn btn-primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    if (showCheckout) {
        return (
            <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'row-reverse' }}>
                <style jsx>{`
                    .checkout-input {
                        width: 100%;
                        padding: 0.8rem;
                        border: 1px solid #d9d9d9;
                        border-radius: 5px;
                        font-size: 0.95rem;
                        transition: border-color 0.2s;
                    }
                    .checkout-input:focus {
                        border-color: var(--color-primary);
                        outline: none;
                        box-shadow: 0 0 0 1px var(--color-primary);
                    }
                    .checkout-label {
                        font-size: 0.85rem;
                        color: #555;
                        margin-bottom: 0.4rem;
                        display: block;
                    }
                    .summary-row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 0.8rem;
                        font-size: 0.95rem;
                        color: #555;
                    }
                    @media (max-width: 900px) {
                        .checkout-container { flex-direction: column-reverse; }
                    }
                `}</style>

                {/* Right Column: Order Summary (on desktop) */}
                <div style={{
                    width: '45%',
                    background: '#fafafa',
                    padding: '4rem',
                    borderLeft: '1px solid #e1e1e1',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ marginBottom: '2rem' }}>
                        {cart.map((item) => (
                            <div key={item.cartId} style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ position: 'relative', width: '64px', height: '64px', border: '1px solid #e1e1e1', borderRadius: '8px', background: 'white', marginRight: '1rem' }}>
                                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'rgba(114, 114, 114, 0.9)', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600 }}>{item.quantity}</div>
                                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '4px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>{item.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#777', margin: 0 }}>{item.weight}</p>
                                </div>
                                <div style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>


                    <div style={{ marginBottom: '2rem' }}>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span style={{ fontWeight: 600, color: '#333' }}>₹{total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span style={{ fontWeight: 600, color: '#333' }}>₹{SHIPPING_COST.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>Total</span>
                            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                <span style={{ fontSize: '0.85rem', color: '#777', marginRight: '0.5rem' }}>INR</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹{(total + SHIPPING_COST).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Column: Form */}
                <div style={{ width: '55%', padding: '4rem', background: 'white' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <Link href="/" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', textDecoration: 'none' }}>
                            Aaditya's Healthy Bites
                        </Link>
                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: '#555', marginTop: '1rem' }}>
                            <span style={{ color: 'var(--color-primary)' }}>Cart</span>
                            <span>&gt;</span>
                            <span>Information</span>
                            <span>&gt;</span>
                            <span>Shipping</span>
                            <span>&gt;</span>
                            <span>Payment</span>
                        </div>
                    </div>

                    <form onSubmit={handleOrderSubmit}>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Contact information</h2>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <input
                                    type="tel"
                                    placeholder="Mobile Phone"
                                    className="checkout-input"
                                    required
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Shipping address</h2>
                                <button
                                    type="button"
                                    id="locate-me-btn"
                                    onClick={handleLocateMe}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-primary)',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}
                                >
                                    📍 Locate Me
                                </button>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <select
                                    className="checkout-input"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                >
                                    <option value="India">India</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        className="checkout-input"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        className="checkout-input"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="checkout-input"
                                    required
                                    value={formData.street}
                                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="Apartment, suite, etc."
                                    className="checkout-input"
                                    required
                                    value={formData.apartment}
                                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="checkout-input"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        placeholder="State"
                                        className="checkout-input"
                                        required
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        placeholder="PIN code"
                                        className="checkout-input"
                                        required
                                        value={formData.zipCode}
                                        onChange={async (e) => {
                                            const zip = e.target.value.replace(/\D/g, '').slice(0, 6);
                                            setFormData(prev => ({ ...prev, zipCode: zip }));

                                            if (zip.length === 6) {
                                                try {
                                                    const response = await fetch(`https://api.postalpincode.in/pincode/${zip}`);
                                                    const data = await response.json();
                                                    if (data[0].Status === "Success") {
                                                        const { District, State } = data[0].PostOffice[0];
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            city: District,
                                                            state: State
                                                        }));
                                                    }
                                                } catch (error) {
                                                    console.error("Failed to fetch pin code details", error);
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                                <button type="button" onClick={() => setShowCheckout(false)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.95rem' }}>
                                    &lt; Return to cart
                                </button>
                                <button type="submit" className="btn btn-primary" style={{ padding: '1.2rem 2rem', fontSize: '1rem', borderRadius: '5px' }}>
                                    {isSubmitting ? 'Processing...' : 'Complete Order'}
                                </button>
                            </div>
                        </div>
                    </form>

                    <div style={{ borderTop: '1px solid #e1e1e1', paddingTop: '1rem', fontSize: '0.8rem', color: '#777' }}>
                        All rights reserved Aaditya's Healthy Bites
                    </div>
                </div >
            </div >
        );
    }

    if (orderSuccess) {
        return (
            <div className="container" style={{ padding: '6rem 0', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: '#4CAF50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>Order Placed Successfully!</h1>
                <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '0.5rem', fontWeight: 600 }}>
                    Order #{lastOrderId}
                </p>
                <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', maxWidth: '600px', lineHeight: '1.6' }}>
                    Thank you for your purchase. We have received your order details and will process it shortly.
                </p>
                <Link href="/" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Your Cart</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                {cart.map((item) => (
                    <div key={item.cartId} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                        <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden' }}>
                            <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain' }} />
                        </div>

                        <div style={{ flexGrow: 1 }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                                {item.name} {item.weight && <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>({item.weight})</span>}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <button
                                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        style={{ padding: '2px 8px', border: 'none', background: 'transparent', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', opacity: item.quantity <= 1 ? 0.5 : 1 }}
                                    >-</button>
                                    <span style={{ padding: '0 8px', fontSize: '0.9rem' }}>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                        disabled={item.quantity >= 10}
                                        style={{ padding: '2px 8px', border: 'none', background: 'transparent', cursor: item.quantity >= 10 ? 'not-allowed' : 'pointer', opacity: item.quantity >= 10 ? 0.5 : 1 }}
                                    >+</button>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                    x ₹{item.price.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                                onClick={() => removeFromCart(item.cartId)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#FF6B6B',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                <div style={{
                    marginTop: '2rem',
                    borderTop: '2px solid rgba(0,0,0,0.05)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <button
                        onClick={clearCart}
                        className="btn"
                        style={{ background: '#f1f1f1', color: '#666', border: '1px solid #ddd' }}
                    >
                        Clear Cart
                    </button>

                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                            Subtotal: ₹{total.toFixed(2)}
                        </p>
                        <p style={{ fontSize: '1rem', color: '#666', marginBottom: '1rem' }}>
                            Shipping: ₹{SHIPPING_COST.toFixed(2)}
                            <br />
                            <span style={{ fontWeight: 'bold' }}>Grand Total: ₹{(total + SHIPPING_COST).toFixed(2)}</span>
                        </p>

                        {total < MIN_ORDER_VALUE && (
                            <p style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold' }}>
                                Minimum order value is ₹{MIN_ORDER_VALUE}. Add items worth ₹{(MIN_ORDER_VALUE - total).toFixed(2)} more.
                            </p>
                        )}

                        <button
                            className="btn btn-primary"
                            onClick={() => setShowCheckout(true)}
                            style={{ padding: '16px 48px', fontSize: '1.1rem', opacity: total < MIN_ORDER_VALUE ? 0.5 : 1, cursor: total < MIN_ORDER_VALUE ? 'not-allowed' : 'pointer' }}
                            disabled={total < MIN_ORDER_VALUE}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
