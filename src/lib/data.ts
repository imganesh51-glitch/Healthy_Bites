// This file exports types and initial data for backward compatibility.
// For real-time data, use the API endpoints or db.ts functions.

export type {
    Product,
    ProductCategory,
    Coupon,
    SiteConfig,
    ProductVariant,
    Order,
    OrderItem
} from './initial-data';

// Re-export initial data for components that still use static imports
// These are fallback values - real data comes from the API
export {
    products,
    coupons,
    customerFavorites,
    siteConfig,
    orders
} from './initial-data';
