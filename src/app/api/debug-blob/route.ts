import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

// Replicating logic from db.ts to diagnose in isolation
const BLOB_FILENAME = 'app-data.json';
// Simple test data to prove write capability
const TEST_DATA = {
    test: true,
    timestamp: new Date().toISOString(),
    message: "If you see this, Vercel Blob write works!"
};

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const results: any = {
        step1_env_check: {
            hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
            tokenPrefix: process.env.BLOB_READ_WRITE_TOKEN?.substring(0, 10) + '...',
            isVercel: !!process.env.VERCEL
        }
    };

    try {
        // Step 2: Try to LIST existing blobs
        results.step2_list_blobs = "Attempting...";
        const { blobs } = await list();
        results.step2_list_blobs = {
            success: true,
            totalBlobs: blobs.length,
            appDataBlobs: blobs.filter(b => b.pathname.startsWith(BLOB_FILENAME))
        };

        // Step 3: Try to WRITE a test blob
        results.step3_write_test = "Attempting...";
        const newBlob = await put('test-blob-write.json', JSON.stringify(TEST_DATA), {
            access: 'public',
            contentType: 'application/json',
            addRandomSuffix: true
        });
        results.step3_write_test = {
            success: true,
            url: newBlob.url
        };

        return NextResponse.json(results);

    } catch (error: any) {
        return NextResponse.json({
            ...results,
            error: true,
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
