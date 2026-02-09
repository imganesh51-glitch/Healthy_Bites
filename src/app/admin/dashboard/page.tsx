'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { products as initialProducts, coupons as initialCoupons, Coupon, Product, ProductCategory, ProductVariant } from '../../../lib/data';
import './dashboard.css';

export default function AdminDashboard() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons || []);
    const [activeTab, setActiveTab] = useState<'products' | 'favorites' | 'coupons' | 'add'>('products');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [favorites, setFavorites] = useState<string[]>(['rice-cereal', 'sathumava', 'sprouted-ragi-almond-cashew']);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('adminAuthenticated');
        if (!isAuthenticated) {
            router.push('/admin');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        router.push('/admin');
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    const categories: string[] = ['all', ...Array.from(new Set(products.map(p => p.category)))];

    const handleDeleteProduct = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
            alert('Product deleted successfully! (Note: This is a demo - changes are not persisted)');
        }
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleToggleFavorite = (id: string) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(fav => fav !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const saveProduct = (product: Product) => {
        if (editingProduct) {
            // Update existing
            setProducts(products.map(p => p.id === product.id ? product : p));
            alert('Product updated successfully!');
        } else {
            // Add new
            setProducts([...products, product]);
            alert('Product added successfully!');
        }
        setShowModal(false);
        setEditingProduct(null);
    };

    const saveData = async (currentProducts: Product[], currentFavorites: string[], currentCoupons: Coupon[], silent = false) => {
        try {
            const response = await fetch('/api/save-products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products: currentProducts, favorites: currentFavorites, coupons: currentCoupons })
            });

            const data = await response.json();

            if (data.success) {
                if (!silent) alert('✅ Changes saved successfully!');
                return true;
            } else {
                alert('❌ Failed to save: ' + data.error);
                return false;
            }
        } catch (error) {
            alert('❌ Error saving: ' + error);
            return false;
        }
    };

    const handleSaveAllProducts = () => saveData(products, favorites, coupons);

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div>
                        <h1>🎯 Admin Dashboard</h1>
                        <p>Manage Products & Customer Favorites</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={handleSaveAllProducts} className="btn-save">
                            💾 Save Changes
                        </button>
                        <button onClick={handleLogout} className="btn-logout">
                            🚪 Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="dashboard-nav">
                <button
                    className={`nav-tab ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    📦 All Products ({products.length})
                </button>
                <button
                    className={`nav-tab ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    ⭐ Customer Favorites ({favorites.length})
                </button>
                <button
                    className={`nav-tab ${activeTab === 'coupons' ? 'active' : ''}`}
                    onClick={() => setActiveTab('coupons')}
                >
                    🎟️ Coupons ({coupons.length})
                </button>
                <button
                    className={`nav-tab ${activeTab === 'add' ? 'active' : ''}`}
                    onClick={() => {
                        setActiveTab('add');
                        setEditingProduct(null);
                        setShowModal(true);
                    }}
                >
                    ➕ Add New Product
                </button>
            </div>

            {/* Main Content */}
            <div className="dashboard-content">
                {activeTab === 'products' && (
                    <div className="products-section">
                        {/* Filters */}
                        <div className="filters-bar">
                            <input
                                type="text"
                                placeholder="🔍 Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="category-select"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Products Grid */}
                        <div className="products-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        {favorites.includes(product.id) && (
                                            <span className="favorite-badge">⭐ Favorite</span>
                                        )}
                                    </div>
                                    <div className="product-info">
                                        <span className="product-category">{product.category}</span>
                                        <h3>{product.name}</h3>
                                        <p className="product-desc">{product.description}</p>
                                        <div className="product-meta">
                                            <span className="product-price">₹{product.price}</span>
                                            <span className="product-age">{product.ageGroup}</span>
                                        </div>
                                    </div>
                                    <div className="product-actions">
                                        <button
                                            onClick={() => handleToggleFavorite(product.id)}
                                            className={`btn-icon ${favorites.includes(product.id) ? 'active' : ''}`}
                                            title="Toggle Favorite"
                                        >
                                            {favorites.includes(product.id) ? '⭐' : '☆'}
                                        </button>
                                        <button
                                            onClick={() => handleEditProduct(product)}
                                            className="btn-icon"
                                            title="Edit Product"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="btn-icon delete"
                                            title="Delete Product"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div className="favorites-section">
                        <div className="section-header">
                            <h2>⭐ Customer Favorite Products</h2>
                            <p>These products will be featured on the homepage</p>
                        </div>
                        <div className="products-grid">
                            {favoriteProducts.map(product => (
                                <div key={product.id} className="product-card featured">
                                    <div className="product-image">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <span className="favorite-badge">⭐ Featured</span>
                                    </div>
                                    <div className="product-info">
                                        <span className="product-category">{product.category}</span>
                                        <h3>{product.name}</h3>
                                        <p className="product-desc">{product.description}</p>
                                        <div className="product-meta">
                                            <span className="product-price">₹{product.price}</span>
                                            <span className="product-age">{product.ageGroup}</span>
                                        </div>
                                    </div>
                                    <div className="product-actions">
                                        <button
                                            onClick={() => handleToggleFavorite(product.id)}
                                            className="btn-icon active"
                                            title="Remove from Favorites"
                                        >
                                            ⭐
                                        </button>
                                        <button
                                            onClick={() => handleEditProduct(product)}
                                            className="btn-icon"
                                            title="Edit Product"
                                        >
                                            ✏️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'coupons' && (
                    <div className="coupons-section">
                        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h2>🎟️ Manage Coupons</h2>
                                <p>Create and manage discount codes</p>
                            </div>
                            <button
                                onClick={() => {
                                    setEditingCoupon(null);
                                    setShowCouponModal(true);
                                }}
                                className="btn-primary"
                            >
                                + Add Coupon
                            </button>
                        </div>

                        <div className="products-grid">
                            {coupons.map(coupon => (
                                <div key={coupon.code} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <span style={{
                                            background: 'var(--color-primary)',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontWeight: 'bold',
                                            fontSize: '1.2rem',
                                            fontFamily: 'monospace'
                                        }}>
                                            {coupon.code}
                                        </span>
                                        <div className="product-actions" style={{ position: 'static' }}>
                                            <button
                                                onClick={() => {
                                                    setEditingCoupon(coupon);
                                                    setShowCouponModal(true);
                                                }}
                                                className="btn-icon"
                                                title="Edit Coupon"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Delete this coupon?')) {
                                                        const newCoupons = coupons.filter(c => c.code !== coupon.code);
                                                        setCoupons(newCoupons);
                                                        saveData(products, favorites, newCoupons, true);
                                                    }
                                                }}
                                                className="btn-icon delete"
                                                title="Delete Coupon"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <strong>{coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}</strong>
                                    </div>

                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                        Applies to: <strong>{coupon.applicability.toUpperCase()}</strong>
                                        {coupon.target && <span> ({coupon.target})</span>}
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                                        <span style={{
                                            color: coupon.active ? 'green' : 'red',
                                            fontWeight: '500',
                                            fontSize: '0.9rem'
                                        }}>
                                            {coupon.active ? '● Active' : '○ Inactive'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {coupons.length === 0 && (
                            <div className="empty-state">
                                <p>No coupons created yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Product Modal */}
            {
                showModal && (
                    <ProductModal
                        product={editingProduct}
                        onSave={saveProduct}
                        onClose={() => {
                            setShowModal(false);
                            setEditingProduct(null);
                        }}
                    />
                )
            }

            {/* Coupon Modal */}
            {
                showCouponModal && (
                    <CouponModal
                        coupon={editingCoupon}
                        products={products}
                        categories={categories}
                        onSave={(coupon) => {
                            let newCoupons: Coupon[];
                            if (editingCoupon) {
                                newCoupons = coupons.map(c => c.code === editingCoupon.code ? coupon : c);
                            } else {
                                if (coupons.some(c => c.code === coupon.code)) {
                                    alert('Coupon code already exists!');
                                    return;
                                }
                                newCoupons = [...coupons, coupon];
                            }
                            setCoupons(newCoupons);
                            saveData(products, favorites, newCoupons, true); // Silent auto-save
                            setShowCouponModal(false);
                        }}
                        onClose={() => setShowCouponModal(false)}
                    />
                )
            }
        </div >
    );
}

interface ProductModalProps {
    product: Product | null;
    onSave: (product: Product) => void;
    onClose: () => void;
}

function ProductModal({ product, onSave, onClose }: ProductModalProps) {
    const [formData, setFormData] = useState<Partial<Product>>(
        product || {
            id: '',
            name: '',
            description: '',
            price: 0,
            image: '/images/products/placeholder.jpg',
            category: "Baby's First Food" as ProductCategory,
            ingredients: [],
            ageGroup: '6m+',
            weight: '200g',
            variants: []
        }
    );

    const [ingredientInput, setIngredientInput] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleVariantChange = (index: number, field: keyof ProductVariant, value: string | number) => {
        const newVariants = [...(formData.variants || [])];
        if (!newVariants[index]) return;

        newVariants[index] = { ...newVariants[index], [field]: value };
        setFormData({ ...formData, variants: newVariants });
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...(formData.variants || []), { weight: '', price: 0 }]
        });
    };

    const removeVariant = (index: number) => {
        setFormData({
            ...formData,
            variants: formData.variants?.filter((_, i) => i !== index)
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        try {
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formDataUpload
            });

            const data = await response.json();

            if (data.success) {
                setFormData({ ...formData, image: data.url });
                alert('✅ Image uploaded successfully!');
            } else {
                alert('❌ Failed to upload image: ' + data.error);
            }
        } catch (error) {
            alert('❌ Error uploading image: ' + error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.id || !formData.name) {
            alert('Please fill in all required fields');
            return;
        }

        onSave(formData as Product);
    };

    const addIngredient = () => {
        if (ingredientInput.trim()) {
            setFormData({
                ...formData,
                ingredients: [...(formData.ingredients || []), ingredientInput.trim()]
            });
            setIngredientInput('');
        }
    };

    const removeIngredient = (index: number) => {
        setFormData({
            ...formData,
            ingredients: formData.ingredients?.filter((_, i) => i !== index)
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{product ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
                    <button onClick={onClose} className="btn-close">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product ID *</label>
                            <input
                                type="text"
                                value={formData.id}
                                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                placeholder="e.g., rice-cereal"
                                required
                                disabled={!!product}
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Rice Cereal"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Product description..."
                            rows={3}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price (₹) *</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                                required
                            >
                                <option value="Baby's First Food">Baby's First Food</option>
                                <option value="Porridge Menu">Porridge Menu</option>
                                <option value="Dosa Premix Menu">Dosa Premix Menu</option>
                                <option value="Pancake Premix Menu">Pancake Premix Menu</option>
                                <option value="Laddus">Laddus</option>
                                <option value="Healthy Fats / Butters">Healthy Fats / Butters</option>
                                <option value="Nuts and Seeds">Nuts and Seeds</option>
                                <option value="Healthy Flours">Healthy Flours</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Age Group *</label>
                            <select
                                value={formData.ageGroup}
                                onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value as '6m+' | '8m+' | '12m+' | '18m+' })}
                                required
                            >
                                <option value="6m+">6m+</option>
                                <option value="8m+">8m+</option>
                                <option value="12m+">12m+</option>
                                <option value="18m+">18m+</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Weight (Display)</label>
                            <input
                                type="text"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                placeholder="e.g., 200g"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Product Variants (Serving Sizes)</label>
                        <div className="variants-container">
                            {formData.variants?.map((variant, index) => (
                                <div key={index} className="variant-row">
                                    <input
                                        type="text"
                                        placeholder="Weight (e.g., 200g)"
                                        value={variant.weight}
                                        onChange={(e) => handleVariantChange(index, 'weight', e.target.value)}
                                        style={{ flex: 2 }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price (₹)"
                                        value={variant.price}
                                        onChange={(e) => handleVariantChange(index, 'price', Number(e.target.value))}
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="btn-icon delete"
                                        title="Remove variant"
                                        style={{ flex: '0 0 40px', padding: '0', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addVariant} className="btn-secondary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem' }}>
                            + Add Variant
                        </button>
                    </div>

                    <div className="form-group">
                        <label>Product Image</label>
                        <div className="image-upload-section">
                            {formData.image && (
                                <div className="image-preview">
                                    <Image
                                        src={formData.image}
                                        alt="Product preview"
                                        width={200}
                                        height={200}
                                        style={{ objectFit: 'cover', borderRadius: '12px' }}
                                    />
                                </div>
                            )}
                            <div className="upload-controls">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    id="image-upload"
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="image-upload" className={`btn-upload ${uploading ? 'uploading' : ''}`}>
                                    {uploading ? '⏳ Uploading...' : '📷 Upload Image'}
                                </label>
                                <small>Or enter image URL manually below</small>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="/images/products/..."
                        />
                        <small>Accepted formats: JPEG, PNG, WebP (max 5MB)</small>
                    </div>

                    <div className="form-group">
                        <label>Ingredients</label>
                        <div className="ingredient-input">
                            <input
                                type="text"
                                value={ingredientInput}
                                onChange={(e) => setIngredientInput(e.target.value)}
                                placeholder="Add ingredient..."
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                            />
                            <button type="button" onClick={addIngredient} className="btn-add">
                                Add
                            </button>
                        </div>
                        <div className="ingredients-list">
                            {formData.ingredients?.map((ingredient, index) => (
                                <span key={index} className="ingredient-tag">
                                    {ingredient}
                                    <button type="button" onClick={() => removeIngredient(index)}>✕</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            {product ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

interface CouponModalProps {
    coupon: Coupon | null;
    products: Product[];
    categories: string[];
    onSave: (coupon: Coupon) => void;
    onClose: () => void;
}

function CouponModal({ coupon, products, categories, onSave, onClose }: CouponModalProps) {
    const [formData, setFormData] = useState<Coupon>(
        coupon || {
            code: '',
            discountType: 'percentage',
            discountValue: 10,
            applicability: 'all',
            target: '',
            active: true
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{coupon ? '✏️ Edit Coupon' : '➕ Add New Coupon'}</h2>
                    <button onClick={onClose} className="btn-close">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label>Coupon Code *</label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value.trim().toUpperCase() })}
                            placeholder="e.g., SUMMER50"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Discount Type</label>
                            <select
                                value={formData.discountType}
                                onChange={(e) => setFormData({ ...formData, discountType: e.target.value as 'percentage' | 'fixed' })}
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Value</label>
                            <input
                                type="number"
                                value={formData.discountValue}
                                onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Applicability</label>
                        <select
                            value={formData.applicability}
                            onChange={(e) => setFormData({ ...formData, applicability: e.target.value as any, target: '' })}
                        >
                            <option value="all">All Products</option>
                            <option value="category">Specific Category</option>
                            <option value="product">Specific Product</option>
                            <option value="variant">Specific Variant Size (e.g. 200g)</option>
                        </select>
                    </div>

                    {formData.applicability === 'category' && (
                        <div className="form-group">
                            <label>Select Category</label>
                            <select
                                value={formData.target}
                                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                required
                            >
                                <option value="">-- Select Category --</option>
                                {categories.filter(c => c !== 'all').map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {formData.applicability === 'product' && (
                        <div className="form-group">
                            <label>Select Product</label>
                            <select
                                value={formData.target}
                                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                required
                            >
                                <option value="">-- Select Product --</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {formData.applicability === 'variant' && (
                        <div className="form-group">
                            <label>Target Weight (e.g., 200g)</label>
                            <input
                                type="text"
                                value={formData.target}
                                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                placeholder="e.g., 200g"
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={formData.active}
                                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                            />
                            Coupon is Active
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                        <button type="submit" className="btn-primary">Save Coupon</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
