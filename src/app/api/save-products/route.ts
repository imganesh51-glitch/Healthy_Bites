import { NextRequest, NextResponse } from 'next/server';
import { getAppData, saveAppData } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const { products, favorites, coupons, siteConfig, orders } = await request.json();

        // Get existing data to preserve orders if not provided
        const existingData = await getAppData();

        if (!products || !Array.isArray(products)) {
            return NextResponse.json(
                { error: 'Invalid products data' },
                { status: 400 }
            );
        }

        // Save to KV/JSON store
        await saveAppData({
            products,
            coupons: coupons || [],
            favorites: favorites || [],
            siteConfig: siteConfig || {
                heroImage: '/images/hero-baby.png',
                storyImage: '/images/products-hero.png',
                founderImage: '/images/products/WhatsApp Image 2026-02-08 at 9.01.43 PM.jpeg'
            },
            orders: orders !== undefined ? orders : (existingData.orders || [])
        });

        return NextResponse.json({
            success: true,
            message: 'Products saved successfully',
            count: products.length
        });

    } catch (error) {
        console.error('Error saving products:', error);
        return NextResponse.json(
            { error: `Failed to save products: ${error instanceof Error ? error.message : String(error)}` },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const data = await getAppData();

        return NextResponse.json({
            success: true,
            products: data.products,
            favorites: data.favorites,
            coupons: data.coupons,
            siteConfig: data.siteConfig,
            orders: data.orders || [],
            count: data.products.length
        });
    } catch (error) {
        console.error('Error loading products:', error);
        return NextResponse.json(
            { error: 'Failed to load products' },
            { status: 500 }
        );
    }
}
