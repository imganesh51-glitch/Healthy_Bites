'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, Coupon } from '@/lib/data';

interface CartItem extends Product {
    quantity: number;
    variant?: ProductVariant;
    cartId: string; // unique id for cart item (product.id + variant.weight)
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    removeFromCart: (cartId: string) => void;
    clearCart: () => void;
    total: number;
    coupon: Coupon | null;
    applyCoupon: (coupon: Coupon) => void;
    removeCoupon: () => void;
    discount: number;
    finalTotal: number;
    validateAndApplyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
}

const CartContext = createContext<CartContextProps>({
    cart: [],
    addToCart: () => { },
    updateQuantity: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    total: 0,
    coupon: null,
    applyCoupon: () => { },
    removeCoupon: () => { },
    discount: 0,
    finalTotal: 0,
    validateAndApplyCoupon: async () => ({ success: false, message: 'Not implemented' }),
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [coupon, setCoupon] = useState<Coupon | null>(null);

    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        } catch {
            // safe fallback
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
        const cartId = variant ? `${product.id}-${variant.weight}` : product.id;
        const price = variant ? variant.price : product.price;
        const weight = variant ? variant.weight : product.weight;

        const itemToAdd: CartItem = {
            ...product,
            price,
            weight,
            quantity: Math.min(10, quantity),
            variant,
            cartId,
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            category: product.category,
            ingredients: product.ingredients,
            ageGroup: product.ageGroup
        };

        setCart((prev) => {
            const existing = prev.find((item) => item.cartId === cartId);
            if (existing) {
                return prev.map((item) =>
                    item.cartId === cartId ? { ...item, quantity: Math.min(10, item.quantity + quantity) } : item
                );
            }
            return [...prev, itemToAdd];
        });
    };

    const updateQuantity = (cartId: string, quantity: number) => {
        setCart((prev) => {
            if (quantity <= 0) {
                return prev.filter((item) => item.cartId !== cartId);
            }
            return prev.map((item) =>
                item.cartId === cartId ? { ...item, quantity: Math.min(10, quantity) } : item
            );
        });
    };

    const removeFromCart = (cartId: string) => {
        setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    };

    const clearCart = () => {
        setCart([]);
        setCoupon(null);
    };

    const validateAndApplyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
        try {
            // Fetch fresh data from API
            const res = await fetch(`/api/save-products?t=${Date.now()}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            const serverCoupons: Coupon[] = data.coupons || [];

            const normalizedCode = code.trim().toUpperCase();
            const valid = serverCoupons.find(c => c.code === normalizedCode && c.active);

            if (valid) {
                setCoupon(valid);
                return { success: true, message: 'Coupon applied successfully!' };
            } else {
                return { success: false, message: 'Invalid or inactive coupon code' };
            }
        } catch (error) {
            console.error("Coupon validation error:", error);
            // Fallback: check against local static data if fetch fails?
            // Usually if API fails, static data might be old anyway. Better to error gracefully.
            return { success: false, message: 'Unable to validate coupon at this time.' };
        }
    };

    const applyCoupon = (c: Coupon) => setCoupon(c);
    const removeCoupon = () => setCoupon(null);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const calculateDiscount = () => {
        if (!coupon || !coupon.active) return 0;

        let applicableTotal = 0;

        cart.forEach(item => {
            let isApplicable = false;
            if (coupon.applicability === 'all') isApplicable = true;
            else if (coupon.applicability === 'category' && item.category === coupon.target) isApplicable = true;
            else if (coupon.applicability === 'product' && item.id === coupon.target) isApplicable = true;
            else if (coupon.applicability === 'variant' && item.weight === coupon.target) isApplicable = true;

            if (isApplicable) {
                applicableTotal += item.price * item.quantity;
            }
        });

        if (applicableTotal === 0) return 0;

        if (coupon.discountType === 'percentage') {
            return (applicableTotal * coupon.discountValue) / 100;
        } else {
            return Math.min(applicableTotal, coupon.discountValue);
        }
    };

    const discount = calculateDiscount();
    const finalTotal = Math.max(0, total - discount);

    return (
        <CartContext.Provider value={{
            cart, addToCart, updateQuantity, removeFromCart, clearCart,
            total, coupon, applyCoupon, removeCoupon, discount, finalTotal, validateAndApplyCoupon
        }}>
            {children}
        </CartContext.Provider>
    );
}
