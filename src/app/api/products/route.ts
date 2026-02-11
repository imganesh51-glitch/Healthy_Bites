import { NextResponse } from 'next/server';
import { getAppData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data = await getAppData();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
