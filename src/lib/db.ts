import { put, list, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import {
    Product,
    Coupon,
    SiteConfig,
    Order,
    products as initialProducts,
    coupons as initialCoupons,
    customerFavorites as initialFavorites,
    siteConfig as initialSiteConfig,
    orders as initialOrders
} from './initial-data';

// Types
export type { Product, ProductCategory, Coupon, SiteConfig, ProductVariant, Order, OrderItem } from './initial-data';

// Data Container Interface
export interface AppData {
    products: Product[];
    coupons: Coupon[];
    favorites: string[];
    siteConfig: SiteConfig;
    orders: Order[];
}

// Initial Data
const INITIAL_DATA: AppData = {
    products: initialProducts,
    coupons: initialCoupons,
    favorites: initialFavorites,
    siteConfig: initialSiteConfig,
    orders: initialOrders
};

// Mode Detection - Check for Vercel Blob token
const IS_PROD = !!process.env.BLOB_READ_WRITE_TOKEN;
const LOCAL_FILE_PATH = path.join(process.cwd(), 'src', 'lib', 'data.json');
const BLOB_FILENAME = 'app-data.json';

/**
 * Fetch all application data
 */
export async function getAppData(): Promise<AppData> {
    let data: AppData = INITIAL_DATA;

    try {
        if (IS_PROD) {
            // Production: Try fetching from Vercel Blob
            try {
                const { blobs } = await list();
                // Filter for our specific filename pattern and sort by newest first
                const dataBlobs = blobs
                    .filter(b => b.pathname.startsWith(BLOB_FILENAME))
                    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());

                if (dataBlobs.length > 0) {
                    console.log(`Fetching newest data from blob: ${dataBlobs[0].url} (Uploaded: ${dataBlobs[0].uploadedAt})`);
                    const response = await fetch(dataBlobs[0].url);
                    if (response.ok) {
                        data = await response.json();
                        console.log(`Successfully loaded data. Orders count: ${data.orders?.length || 0}`);
                    }
                } else {
                    console.log("No data blobs found, using initial data.");
                }
            } catch (e) {
                console.error("Error reading from Blob:", e);
            }
        } else {
            // Local Development: filesystem/JSON
            if (fs.existsSync(LOCAL_FILE_PATH)) {
                try {
                    const fileContent = fs.readFileSync(LOCAL_FILE_PATH, 'utf-8');
                    data = JSON.parse(fileContent);
                } catch (e) {
                    console.error("Error reading local data.json:", e);
                }
            }
        }

        // Perform data migrations/fixes
        if (data.coupons) {
            const save10Index = data.coupons.findIndex((c: any) => c.code === 'SAVE10');
            if (save10Index !== -1 && data.coupons[save10Index].applicability !== 'all') {
                console.log("Migrating SAVE10 coupon to global applicability");
                data.coupons[save10Index].applicability = 'all';
                data.coupons[save10Index].target = '';
            }
        }

        return data;
    } catch (error) {
        console.error("Failed to fetch app data:", error);
        return INITIAL_DATA;
    }
}

/**
 * Save application data
 */
export async function saveAppData(data: AppData): Promise<boolean> {
    try {
        if (IS_PROD) {
            console.log(`Saving to Blob store. Orders count to save: ${data.orders?.length || 0}`);

            // Production: Save to Vercel Blob
            // 1. Upload new blob first (safest)
            const jsonString = JSON.stringify(data, null, 2);
            const newBlob = await put(BLOB_FILENAME, jsonString, {
                access: 'public',
                contentType: 'application/json',
                addRandomSuffix: true // Ensure unique URL
            });
            console.log(`Saved new blob: ${newBlob.url}`);

            // 2. Cleanup: Delete ALL other blobs with this pathname prefix
            try {
                const { blobs } = await list();
                const oldBlobs = blobs.filter(b =>
                    b.pathname.startsWith(BLOB_FILENAME) &&
                    b.url !== newBlob.url
                );

                console.log(`Cleaning up ${oldBlobs.length} old blobs...`);
                for (const blob of oldBlobs) {
                    await del(blob.url);
                }
            } catch (e) {
                console.warn("Cleanup warning (non-critical):", e);
            }
        } else {
            // Local Development: Save to filesystem
            fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
        }
        return true;
    } catch (error) {
        console.error("Failed to save app data:", error);
        throw error;
    }
}

/**
 * Helper to get just products
 */
export async function getProducts(): Promise<Product[]> {
    const data = await getAppData();
    return data.products;
}

/**
 * Helper to get site config
 */
export async function getSiteConfig(): Promise<SiteConfig> {
    const data = await getAppData();
    return data.siteConfig;
}

/**
 * Helper to get coupons
 */
export async function getCoupons(): Promise<Coupon[]> {
    const data = await getAppData();
    return data.coupons;
}
