import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
    try {
        const { products, favorites, coupons } = await request.json();

        if (!products || !Array.isArray(products)) {
            return NextResponse.json(
                { error: 'Invalid products data' },
                { status: 400 }
            );
        }

        // Generate TypeScript content
        const content = generateDataFile(products, favorites, coupons);

        // Write to data.ts file
        const filepath = join(process.cwd(), 'src', 'lib', 'data.ts');
        await writeFile(filepath, content, 'utf-8');

        return NextResponse.json({
            success: true,
            message: 'Products saved successfully',
            count: products.length
        });

    } catch (error) {
        console.error('Error saving products:', error);
        return NextResponse.json(
            { error: 'Failed to save products' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Import the current products data
        const { products, customerFavorites, coupons } = await import('@/lib/data');

        return NextResponse.json({
            success: true,
            products,
            favorites: customerFavorites,
            coupons: coupons || [],
            count: products.length
        });
    } catch (error) {
        console.error('Error loading products:', error);
        return NextResponse.json(
            { error: 'Failed to load products' },
            { status: 500 }
        );
    }
}

function generateDataFile(products: any[], favorites: string[], coupons: any[] = []) {
    return `export interface ProductVariant {
    weight: string;
    price: number;
}

export type ProductCategory =
    | "Baby's First Food"
    | "Porridge Menu"
    | "Dosa Premix Menu"
    | "Pancake Premix Menu"
    | "Laddus"
    | "Healthy Fats / Butters"
    | "Nuts and Seeds"
    | "Healthy Flours";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number; // Base price or starting price
    image: string;
    category: ProductCategory;
    ingredients: string[];
    ageGroup: '6m+' | '8m+' | '12m+' | '18m+';
    weight?: string; // Default weight
    variants?: ProductVariant[];
    isFavorite?: boolean;
}

export const products: Product[] = ${JSON.stringify(products, null, 4)};

export interface Coupon {
    code: string;
    description?: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    applicability: 'all' | 'category' | 'product' | 'variant';
    target?: string;
    active: boolean;
}

export const coupons: Coupon[] = ${JSON.stringify(coupons, null, 4)};

export const customerFavorites: string[] = ${JSON.stringify(favorites || [], null, 4)};
`;
}
