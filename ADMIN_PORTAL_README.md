# Admin Portal - Aadity's Healthy Bites

## Overview
A comprehensive admin dashboard for managing products, images, and customer favorites for the Aadity's Healthy Bites e-commerce website.

## Features

### 🔐 Secure Authentication
- Password-protected admin access
- Configure your password in `src/app/admin/page.tsx`
- Session-based authentication

### 📦 Product Management
- **View All Products**: Browse all 30+ products with search and filter capabilities
- **Add New Products**: Create new products with complete details
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from the catalog
- **Search & Filter**: Search by name/description and filter by category

### 📷 Image Upload
- Direct image upload to server or Cloudinary
- Supported formats: JPEG, PNG, WebP
- Maximum file size: 5MB
- Image preview before saving
- Automatic file naming with timestamps
- Manual URL entry option

### ⭐ Customer Favorites Management
- Mark/unmark products as customer favorites
- Featured products display on homepage
- Visual badges for favorite products
- Dedicated favorites management tab

### 💾 Data Persistence
- Save all changes to `data.ts` file
- Automatic JSON formatting
- Backup of product and favorites data

## Accessing the Admin Portal

1. **Navigate to Admin Login**
   ```
   http://localhost:3000/admin
   ```

2. **Login Credentials**
   - Password: `Myaaditya@0101` (or as configured)

3. **Dashboard Access**
   - After successful login, you'll be redirected to the dashboard

## 🚀 Deployment Workflow (Important!)

Since this is a static site with local file storage, follow this workflow to update your live website:

1. **Run Locally**: Start the development server (`npm run dev`)
2. **Make Changes**: Use this Admin Portal to add products, upload images, and update favorites
3. **Save**: Click "💾 Save Changes" to write to `data.ts`
4. **Test**: Verify everything looks good on your local `http://localhost:3000`
5. **Commit & Push**:
   ```bash
   git add .
   git commit -m "Update products and images"
   git push
   ```
6. **Deploy**: Your hosting provider (e.g., Vercel) will automatically redeploy with the new content

## ☁️ Persistent Cloud Storage (Recommended)

To allow images to persist even on live deployments (without disappearing), we have integrated **Cloudinary**.

### Setup Instructions
1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your `Cloud Name`, `API Key`, and `API Secret` from the dashboard
3. Add these to your environment variables (in Vercel/Netlify settings):
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. The admin portal will automatically detect these and switch from local storage to Cloudinary storage.

**Important Note on Product Data**:
While Cloudinary fixes the *image* disappearance issue, changes to *product text* (prices, names) made on the live website will **STILL DISAPPEAR** on redeploy because `data.ts` is a file, not a database.
To have a fully dynamic website where you can edit everything live, you would need to migrate from `data.ts` to a real database (like MongoDB).

## Using the Admin Portal

### Adding a New Product

1. Click the **"➕ Add New Product"** tab
2. Fill in the required fields:
   - Product ID (unique identifier, e.g., `organic-apple-puree`)
   - Product Name
   - Description
   - Price (in ₹)
   - Category
   - Age Group (6m+, 8m+, 12m+, 18m+)
   - Weight (Display - e.g., "200g")
3. Add Serving Sizes (Variants):
   - Click **"+ Add Variant"** to add a serving size
   - Enter weight (e.g., "200g") and price
   - Add multiple variants as needed (e.g. 200g and 400g)
   - Remove variants with the ✕ button
4. Upload an image:
   - Click **"📷 Upload Image"** button
   - Select image file (max 5MB)
   - Or enter image URL manually
4. Add ingredients (optional):
   - Type ingredient name
   - Click **"Add"** or press Enter
   - Remove by clicking ✕ on tag
5. Click **"Add Product"** to save

### Editing a Product

1. Navigate to **"📦 All Products"** tab
2. Find the product you want to edit
3. Click the **✏️** edit button
4. Modify the fields as needed
5. Upload a new image if desired
6. Click **"Update Product"** to save changes

### Managing Customer Favorites

1. **From All Products Tab:**
   - Click the **☆** star button to add to favorites
   - Click the **⭐** star button to remove from favorites

2. **From Favorites Tab:**
   - View all favorited products
   - Remove products from favorites
   - Edit favorite product details

### Saving Changes Permanently

**Important:** Changes are temporarily stored in state. To persist them:

1. Make all your desired changes (add/edit/delete/favorites)
2. Click the **"💾 Save Changes"** button in the header
3. This will update the `src/lib/data.ts` file with your changes
4. Confirm success message appears

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Login page
│   │   ├── admin.css             # Login page styles
│   │   └── dashboard/
│   │       ├── page.tsx          # Admin dashboard
│   │       └── dashboard.css     # Dashboard styles
│   └── api/
│       ├── upload-image/
│       │   └── route.ts          # Image upload API
│       └── save-products/
│           └── route.ts          # Save products API
├── lib/
│   └── data.ts                   # Product data storage
└── public/
    └── images/
        └── products/             # Uploaded product images
```

## API Endpoints

### POST `/api/upload-image`
Upload product images
- **Body**: FormData with file
- **Returns**: `{ success: true, url: string, filename: string }`
- **Validation**: 
  - Accepts JPEG, PNG, WebP
  - Max size: 5MB

### POST `/api/save-products`
Save products to data.ts
- **Body**: `{ products: Product[], favorites: string[] }`
- **Returns**: `{ success: true, message: string, count: number }`

### GET `/api/save-products`
Get current products
- **Returns**: `{ success: true, products: Product[], count: number }`

## Product Data Structure

```typescript
interface Product {
  id: string;                    // Unique identifier
  name: string;                  // Product name
  description: string;           // Product description
  price: number;                 // Base price in ₹
  image: string;                 // Image URL
  category: ProductCategory;     // Product category
  ingredients: string[];         // List of ingredients
  ageGroup: '6m+' | '8m+' | '12m+' | '18m+';  // Age suitability
  weight?: string;               // Product weight
  variants?: ProductVariant[];   // Price variants
}
```

## Security Considerations

### Current Implementation
- Simple password authentication
- Client-side session management
- No backend authentication

### Recommendations for Production
1. **Implement Server-Side Authentication**
   - Use NextAuth.js or similar
   - Secure session tokens
   - HTTPS only

2. **Add Role-Based Access Control**
   - Different permission levels
   - Admin vs. editor roles

3. **Secure API Endpoints**
   - Authentication middleware
   - Rate limiting
   - CSRF protection

4. **Change Default Password**
   - Update in `src/app/admin/page.tsx`
   - Store in environment variables

## Customization

### Changing the Admin Password

Edit `src/app/admin/page.tsx`:
```typescript
if (password === 'YOUR_NEW_PASSWORD') {
  localStorage.setItem('adminAuthenticated', 'true');
  router.push('/admin/dashboard');
}
```

### Adding New Product Categories

Edit `src/lib/data.ts`:
```typescript
export type ProductCategory =
  | "Baby's First Food"
  | "Porridge Menu"
  // Add your new categories here
  | "Your New Category";
```

### Customizing Upload Limits

Edit `src/app/api/upload-image/route.ts`:
```typescript
const maxSize = 10 * 1024 * 1024; // Change to 10MB
```

## Troubleshooting

### Images Not Uploading
- Check file size (must be < 5MB)
- Verify file format (JPEG, PNG, WebP only)
- Ensure `/public/images/products/` directory exists

### Changes Not Saving
- Click the **"💾 Save Changes"** button after making edits
- Check console for any errors
- Verify file permissions on `src/lib/data.ts`

### Login Issues
- Clear browser localStorage: `localStorage.clear()`
- Verify password matches in code
- Check browser console for errors

## Future Enhancements

### Planned Features
- [ ] Bulk product import/export (CSV/JSON)
- [ ] Product analytics and sales tracking
- [ ] Order management integration
- [ ] Inventory management
- [ ] Image gallery with multiple photos per product
- [ ] Product variant management UI
- [ ] Drag-and-drop image upload
- [ ] Rich text editor for descriptions
- [ ] Product category management
- [ ] Audit log for changes

### Performance Optimizations
- [ ] Image compression on upload
- [ ] Lazy loading for product grid
- [ ] Virtual scrolling for large catalogs
- [ ] Database integration (MongoDB/PostgreSQL)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Inspect browser console for errors

## License

This admin portal is part of the Aadity's Healthy Bites project.
