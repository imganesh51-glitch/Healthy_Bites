
import { createClient } from '@vercel/kv';
import fs from 'fs';
import path from 'path';
import {
    Product,
    ProductCategory,
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
interface AppData {
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

// Mode Detection
const IS_PROD = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
const LOCAL_FILE_PATH = path.join(process.cwd(), 'src', 'lib', 'data.json');

// KV Client
const kv = IS_PROD ? createClient({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!
}) : null;

/**
 * Fetch all application data
 */
export async function getAppData(): Promise<AppData> {
    try {
        if (IS_PROD && kv) {
            // Try fetching from KV
            const data = await kv.get<AppData>('app_data');
            if (data) return data;

            // If empty, initialize with static data
            await kv.set('app_data', INITIAL_DATA);
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

            // Fallback to initial static data
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
        if (IS_PROD && kv) {
            await kv.set('app_data', data);
        } else {
            // Local Development
            fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
        }
        return true;
    } catch (error) {
        console.error("Failed to save app data:", error);
        throw error;
    }
}

/**
 * Helper to get just products (common use case)
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
