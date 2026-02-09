'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/lib/data';

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
}

const CartContext = createContext<CartContextProps>({
    cart: [],
    addToCart: () => { },
    updateQuantity: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    total: 0,
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

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
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
        const cartId = variant ? `${product.id}-${variant.weight}` : product.id;
        const price = variant ? variant.price : product.price;
        const weight = variant ? variant.weight : product.weight;

        setCart((prev) => {
            const existing = prev.find((item) => item.cartId === cartId);
            if (existing) {
                return prev.map((item) =>
                    item.cartId === cartId ? { ...item, quantity: Math.min(10, item.quantity + quantity) } : item
                );
            }
            return [...prev, { ...product, price, weight, quantity: Math.min(10, quantity), variant, cartId }];
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

    const clearCart = () => setCart([]);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}
