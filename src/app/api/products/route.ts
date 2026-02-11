import { NextResponse } from 'next/server';
import { getAppData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data = await getAppData();
        // Extra debug: checking what blobs we can see
        let debugBlobs: any[] = [];
        try {
            if (process.env.BLOB_READ_WRITE_TOKEN) {
                const { list } = await import('@vercel/blob');
                const { blobs } = await list();
                debugBlobs = blobs.filter(b => b.pathname.startsWith('app-data.json')).slice(0, 5);
            }
        } catch (e) {
            // ignore
        }

        return NextResponse.json({
            ...data,
            _debug: {
                timestamp: new Date().toISOString(),
                isProd: process.env.NODE_ENV === 'production',
                hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
                isVercel: !!process.env.VERCEL,
                cwd: process.cwd().slice(0, 20) + '...',
                productsCount: data.products.length,
                blobsFound: debugBlobs.length,
                topBlobUrl: debugBlobs[0]?.url || 'none'
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
