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
                const { blobs } = await list({ prefix: BLOB_FILENAME });
                if (blobs.length > 0) {
                    const response = await fetch(blobs[0].url);
                    if (response.ok) {
                        data = await response.json();
                    }
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
            // Production: Save to Vercel Blob
            // First, delete old blob if exists
            try {
                const { blobs } = await list({ prefix: BLOB_FILENAME });
                for (const blob of blobs) {
                    await del(blob.url);
                }
            } catch (e) {
                // Ignore delete errors
            }

            // Upload new blob
            const jsonString = JSON.stringify(data, null, 2);
            await put(BLOB_FILENAME, jsonString, {
                access: 'public',
                contentType: 'application/json'
            });
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
