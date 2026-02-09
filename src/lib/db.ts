import { put, list, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import {
    Product,
    Coupon,
    SiteConfig,
    products as initialProducts,
    coupons as initialCoupons,
    customerFavorites as initialFavorites,
    siteConfig as initialSiteConfig
} from './initial-data';

// Types
export type { Product, ProductCategory, Coupon, SiteConfig, ProductVariant } from './initial-data';

// Data Container Interface
export interface AppData {
    products: Product[];
    coupons: Coupon[];
    favorites: string[];
    siteConfig: SiteConfig;
}

// Initial Data
const INITIAL_DATA: AppData = {
    products: initialProducts,
    coupons: initialCoupons,
    favorites: initialFavorites,
    siteConfig: initialSiteConfig
};

// Mode Detection - Check for Vercel Blob token
const IS_PROD = !!process.env.BLOB_READ_WRITE_TOKEN;
const LOCAL_FILE_PATH = path.join(process.cwd(), 'src', 'lib', 'data.json');
const BLOB_FILENAME = 'app-data.json';

/**
 * Fetch all application data
 */
export async function getAppData(): Promise<AppData> {
    try {
        if (IS_PROD) {
            // Production: Try fetching from Vercel Blob
            try {
                const { blobs } = await list({ prefix: BLOB_FILENAME });
                if (blobs.length > 0) {
                    const response = await fetch(blobs[0].url);
                    if (response.ok) {
                        const data = await response.json();
                        return data as AppData;
                    }
                }
            } catch (e) {
                console.error("Error reading from Blob:", e);
            }

            // If no blob exists, return initial data (will be saved on first admin save)
            return INITIAL_DATA;
        } else {
            // Local Development: filesystem/JSON
            if (fs.existsSync(LOCAL_FILE_PATH)) {
                try {
                    const fileContent = fs.readFileSync(LOCAL_FILE_PATH, 'utf-8');
                    return JSON.parse(fileContent);
                } catch (e) {
                    console.error("Error reading local data.json:", e);
                }
            }
            return INITIAL_DATA;
        }
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
