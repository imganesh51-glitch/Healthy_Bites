import { NextResponse } from 'next/server';
import { getAppData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data = await getAppData();
        return NextResponse.json({
            ...data,
            _debug: {
                timestamp: new Date().toISOString(),
                isProd: process.env.NODE_ENV === 'production',
                hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
                isVercel: !!process.env.VERCEL,
                cwd: process.cwd().slice(0, 20) + '...', // Partial path for safety
                productsCount: data.products.length,
                ordersCount: data.orders?.length || 0
            }
        });
    } catch (error) {
        return NextResponse.json(
            // ...
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
