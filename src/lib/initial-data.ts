export interface ProductVariant {
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

export const products: Product[] = [
    {
        "id": "rice-cereal",
        "name": "Rice Cereal",
        "description": "A perfect first food. Easy to digest and packed with nutrition.",
        "price": 400,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.45 PM.jpeg",
        "category": "Baby's First Food",
        "ingredients": [
            "Soaked brown rice",
            "Moong Dal",
            "Masoor Dal",
            "Urad Dal",
            "Chana Dal",
            "Toor Dal",
            "Ajwain Jeera"
        ],
        "ageGroup": "6m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 400
            },
            {
                "weight": "400g",
                "price": 750
            }
        ]
    },
    {
        "id": "sathumava",
        "name": "Sathumava",
        "description": "Traditional health mix powder.",
        "price": 300,
        "image": "https://res.cloudinary.com/dwojczwh3/image/upload/v1770621323/products/rcclkvg14lirh068ortn.png",
        "category": "Baby's First Food",
        "ingredients": [
            "Sprouted Ragi",
            "Sprouted Wheat",
            "Sprouted Jowar",
            "Sprouted Moong",
            "Soaked and popped Amarnath",
            "Soaked Rice",
            "Soaked Almond Flour"
        ],
        "ageGroup": "6m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 300
            },
            {
                "weight": "400g",
                "price": 500
            }
        ]
    },
    {
        "id": "sprouted-ragi-almond-cashew",
        "name": "Sprouted Ragi, Almond & Cashew Porridge",
        "description": "Nutrient-dense sprouted ragi porridge fortified with nuts.",
        "price": 400,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM.jpeg",
        "category": "Porridge Menu",
        "ingredients": [
            "Sprouted Ragi",
            "Flour",
            "Oats",
            "Soaked Almonds",
            "Soaked Cashew"
        ],
        "ageGroup": "8m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 400
            },
            {
                "weight": "400g",
                "price": 750
            }
        ]
    },
    {
        "id": "sprouted-jawar-almond-cashew",
        "name": "Sprouted Jawar, Almond & Cashew Porridge",
        "description": "Wholesome jowar porridge with the goodness of nuts.",
        "price": 400,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM.jpeg",
        "category": "Porridge Menu",
        "ingredients": [
            "Sprouted Jawar",
            "Cashew Dates",
            "Soaked Almond"
        ],
        "ageGroup": "8m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 400
            },
            {
                "weight": "400g",
                "price": 750
            }
        ]
    },
    {
        "id": "amarnath-makhana",
        "name": "Amarnath Makhana Porridge",
        "description": "Light and nutritious porridge made from Amarnath and Foxnuts.",
        "price": 400,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM.jpeg",
        "category": "Porridge Menu",
        "ingredients": [
            "Soaked Amarnath Makhana",
            "Dates Powder",
            "Soaked cashew"
        ],
        "ageGroup": "8m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 400
            },
            {
                "weight": "400g",
                "price": 750
            }
        ]
    },
    {
        "id": "oats-walnut-cashew",
        "name": "Oats, Walnut & Cashew Porridge",
        "description": "Creamy oats porridge derived from soaked nuts.",
        "price": 450,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM.jpeg",
        "category": "Porridge Menu",
        "ingredients": [
            "Oats",
            "Soaked Walnut",
            "Dates Power",
            "Soaked Cashew"
        ],
        "ageGroup": "8m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 450
            },
            {
                "weight": "400g",
                "price": 800
            }
        ]
    },
    {
        "id": "sprouted-wheat-almond-walnut",
        "name": "Sprouted Wheat, Almond & Walnut Porridge",
        "description": "Fiber-rich sprouted wheat porridge.",
        "price": 450,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM.jpeg",
        "category": "Porridge Menu",
        "ingredients": [
            "Soaked Almond",
            "Flour",
            "Sprouted Wheat Flour",
            "Dates Power",
            "Soaked Walnut"
        ],
        "ageGroup": "8m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 450
            },
            {
                "weight": "400g",
                "price": 750
            }
        ]
    },
    {
        "id": "dosa-foxtail-millet",
        "name": "Soaked Foxtail Millets Dosa Mix",
        "description": "Ready-to-make healthy dosa batter mix.",
        "price": 350,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-3.jpeg",
        "category": "Dosa Premix Menu",
        "ingredients": [
            "Foxtail Millets",
            "Urad Dal",
            "Soaked Chana Dal",
            "Sprouted Moong"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 350
            },
            {
                "weight": "400g",
                "price": 600
            }
        ]
    },
    {
        "id": "dosa-little-millet",
        "name": "Soaked Little Millets Dosa Mix",
        "description": "Nutritious little millet dosa mix.",
        "price": 350,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-3.jpeg",
        "category": "Dosa Premix Menu",
        "ingredients": [
            "Little Millets",
            "Soaked Urad Dal",
            "Soaked Chana Dal",
            "Sprouted Moong"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 350
            },
            {
                "weight": "400g",
                "price": 600
            }
        ]
    },
    {
        "id": "dosa-ragi",
        "name": "Sprouted Ragi Dosa Mix",
        "description": "Calcium-rich ragi dosa mix.",
        "price": 200,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-3.jpeg",
        "category": "Dosa Premix Menu",
        "ingredients": [
            "Sprouted Ragi Flour",
            "Soaked Urad Dal",
            "Soaked Chana Dal",
            "Sprouted Moong"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 200
            },
            {
                "weight": "400g",
                "price": 350
            }
        ]
    },
    {
        "id": "dosa-barnyard-millet",
        "name": "Soaked Barnyard Millets Dosa Mix",
        "description": "Healthy barnyard millet dosa mix.",
        "price": 400,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-3.jpeg",
        "category": "Dosa Premix Menu",
        "ingredients": [
            "Barnyard Millets",
            "Soaked Urad Dal",
            "Soaked Chana Dal",
            "Sprouted Moong"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 400
            },
            {
                "weight": "400g",
                "price": 750
            }
        ]
    },
    {
        "id": "dosa-proso-millet",
        "name": "Soaked Proso Millets Dosa Mix",
        "description": "Nutrient-rich proso millet dosa mix.",
        "price": 300,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-3.jpeg",
        "category": "Dosa Premix Menu",
        "ingredients": [
            "Proso Millets",
            "Soaked Urad Dal",
            "Soaked Chana Dal",
            "Sprouted Moong"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 300
            },
            {
                "weight": "400g",
                "price": 550
            }
        ]
    },
    {
        "id": "dosa-kodo-millet",
        "name": "Soaked Kodo Millets Dosa Mix",
        "description": "Kodo millet dosa mix for a balanced diet.",
        "price": 250,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-3.jpeg",
        "category": "Dosa Premix Menu",
        "ingredients": [
            "Kodo Millets",
            "Soaked Urad Dal",
            "Soaked Chana Dal",
            "Sprouted Moong"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 250
            },
            {
                "weight": "400g",
                "price": 450
            }
        ]
    },
    {
        "id": "dosa-buckwheat-millet",
        "name": "Soaked Buckwheat Millets Dosa Mix",
        "description": "Buckwheat millet dosa mix, easy to digest.",
        "price": 350,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-3.jpeg",
        "category": "Dosa Premix Menu",
        "ingredients": [
            "Buckwheat Millets",
            "Soaked Urad Dal",
            "Soaked Chana Dal",
            "Sprouted Moong"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 350
            },
            {
                "weight": "400g",
                "price": 650
            }
        ]
    },
    {
        "id": "pancake-ragi-almond",
        "name": "Sprouted Ragi Almond Cashew Pancake Mix",
        "description": "Delicious and healthy pancake mix for toddlers.",
        "price": 400,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-2.jpeg",
        "category": "Pancake Premix Menu",
        "ingredients": [
            "Sprouted Ragi Flour",
            "Oats",
            "Soaked Almonds",
            "Dates",
            "Semolina",
            "Soaked Cashew"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 400
            },
            {
                "weight": "400g",
                "price": 750
            }
        ]
    },
    {
        "id": "pancake-jawar",
        "name": "Sprouted Jawar Almond Cashew Pancake Mix",
        "description": "Gluten-free sorghum pancake mix.",
        "price": 400,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-2.jpeg",
        "category": "Pancake Premix Menu",
        "ingredients": [
            "Sprouted Jawar",
            "Cashew",
            "Dates",
            "Soaked Almond",
            "Semolina"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 400
            },
            {
                "weight": "400g",
                "price": 750
            }
        ]
    },
    {
        "id": "pancake-sprouted-wheat",
        "name": "Sprouted Wheat Almond Walnut Pancake Mix",
        "description": "Wholesome wheat pancake mix with nuts.",
        "price": 300,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.44 PM-2.jpeg",
        "category": "Pancake Premix Menu",
        "ingredients": [
            "Soaked Almond",
            "Flour",
            "Sprouted Wheat Flour",
            "Dates Power",
            "Semolina",
            "Soaked Walnut Flour"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 300
            },
            {
                "weight": "400g",
                "price": 550
            }
        ]
    },
    {
        "id": "laddu-ragi-almond",
        "name": "Sprouted Ragi Almond Laddu",
        "description": "Traditional sweet balls packed with energy.",
        "price": 800,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.42 PM-2.jpeg",
        "category": "Laddus",
        "ingredients": [
            "Sprouted Ragi",
            "Almond",
            "Nuts and Seeds Powder",
            "A2 Ghee",
            "Jaggery"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 800
            },
            {
                "weight": "400g",
                "price": 1500
            }
        ]
    },
    {
        "id": "laddu-walnut-almond",
        "name": "Walnut Almond Pistachio Laddu",
        "description": "Premium dry fruit laddus.",
        "price": 1050,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.42 PM-2.jpeg",
        "category": "Laddus",
        "ingredients": [
            "Soaked Pistachio",
            "Soaked Walnuts",
            "Soaked Almonds",
            "Cashew",
            "Sprouted Wheat"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 1050
            },
            {
                "weight": "400g",
                "price": 1850
            }
        ]
    },
    {
        "id": "laddu-apricot",
        "name": "Apricot Laddus",
        "description": "Delightful apricot and nut laddus.",
        "price": 800,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.42 PM-2.jpeg",
        "category": "Laddus",
        "ingredients": [
            "Apricot",
            "Almond",
            "Coconut",
            "Dates",
            "Nuts And Seeds",
            "Ghee"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 800
            },
            {
                "weight": "400g",
                "price": 1400
            }
        ]
    },
    {
        "id": "laddu-oats-dry-fruit",
        "name": "Oats Dry Fruits Laddu",
        "description": "Fiber-rich oats and dry fruit energy balls.",
        "price": 700,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.42 PM-2.jpeg",
        "category": "Laddus",
        "ingredients": [
            "Oats",
            "Dates Nut And Seeds Powder",
            "Ghee"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 700
            },
            {
                "weight": "400g",
                "price": 1250
            }
        ]
    },
    {
        "id": "laddu-coconut-cranberry",
        "name": "Coconut Cranberry Laddu",
        "description": "Tasty coconut and cranberry laddus.",
        "price": 900,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.42 PM-2.jpeg",
        "category": "Laddus",
        "ingredients": [
            "Cranberry",
            "Dates",
            "Coconut",
            "Nuts And Seeds Powder",
            "Ghee"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 900
            },
            {
                "weight": "400g",
                "price": 1600
            }
        ]
    },
    {
        "id": "laddu-makhana-oats",
        "name": "Makhana Oats Laddu",
        "description": "Nutritious makhana and oats laddus.",
        "price": 700,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.42 PM-2.jpeg",
        "category": "Laddus",
        "ingredients": [
            "Makhana Oats",
            "Nuts And Seeds",
            "Powder"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 700
            },
            {
                "weight": "400g",
                "price": 1250
            }
        ]
    },
    {
        "id": "peanut-butter",
        "name": "Fresh Peanut Butter",
        "description": "Creamy, homemade peanut butter.",
        "price": 280,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.41 PM.jpeg",
        "category": "Healthy Fats / Butters",
        "ingredients": [
            "Peanuts"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 280
            },
            {
                "weight": "500g",
                "price": 500
            }
        ]
    },
    {
        "id": "almond-butter",
        "name": "Fresh Almond Butter",
        "description": "Pure almond butter, rich in healthy fats.",
        "price": 450,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.41 PM.jpeg",
        "category": "Healthy Fats / Butters",
        "ingredients": [
            "Almonds"
        ],
        "ageGroup": "12m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 450
            },
            {
                "weight": "500g",
                "price": 790
            }
        ]
    },
    {
        "id": "nuts-seeds-powder",
        "name": "Nuts And Seeds Powder",
        "description": "A versatile powder to boost the nutrition of any meal.",
        "price": 250,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.42 PM.jpeg",
        "category": "Nuts and Seeds",
        "ingredients": [
            "Almond",
            "Walnuts",
            "Cashew",
            "Pistachio",
            "Foxnut",
            "Pumpkin Seeds",
            "Flax Seed",
            "Muskmelon Seeds",
            "Sesame",
            "Peanut",
            "Watermelon Seeds"
        ],
        "ageGroup": "8m+",
        "weight": "100g",
        "variants": [
            {
                "weight": "100g",
                "price": 250
            },
            {
                "weight": "200g",
                "price": 500
            },
            {
                "weight": "500g",
                "price": 1000
            }
        ]
    },
    {
        "id": "dates-powder",
        "name": "Dry Dates Powder",
        "description": "Natural sweetener substitute.",
        "price": 150,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.42 PM.jpeg",
        "category": "Nuts and Seeds",
        "ingredients": [
            "Dry Dates"
        ],
        "ageGroup": "8m+",
        "weight": "100g",
        "variants": [
            {
                "weight": "100g",
                "price": 150
            },
            {
                "weight": "200g",
                "price": 300
            },
            {
                "weight": "500g",
                "price": 600
            }
        ]
    },
    {
        "id": "flour-sprouted-ragi",
        "name": "Sprouted Ragi Flour",
        "description": "Sprouted for better digestion and nutrient absorption.",
        "price": 200,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.43 PM-2.jpeg",
        "category": "Healthy Flours",
        "ingredients": [
            "Sprouted Ragi"
        ],
        "ageGroup": "6m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 200
            },
            {
                "weight": "400g",
                "price": 350
            }
        ]
    },
    {
        "id": "flour-sprouted-jawar",
        "name": "Sprouted Jawar Flour",
        "description": "Wholesome sprouted jawar flour.",
        "price": 250,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.43 PM-2.jpeg",
        "category": "Healthy Flours",
        "ingredients": [
            "Sprouted Jawar"
        ],
        "ageGroup": "6m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 250
            },
            {
                "weight": "400g",
                "price": 400
            }
        ]
    },
    {
        "id": "flour-sprouted-wheat",
        "name": "Sprouted Wheat Flour",
        "description": "Nutritious sprouted wheat flour.",
        "price": 100,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.43 PM-2.jpeg",
        "category": "Healthy Flours",
        "ingredients": [
            "Sprouted Wheat"
        ],
        "ageGroup": "6m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 100
            },
            {
                "weight": "400g",
                "price": 200
            }
        ]
    },
    {
        "id": "flour-rolled-oats",
        "name": "Rolled Oats Flour",
        "description": "High-fiber rolled oats flour.",
        "price": 200,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.43 PM-2.jpeg",
        "category": "Healthy Flours",
        "ingredients": [
            "Rolled Oats"
        ],
        "ageGroup": "6m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 200
            },
            {
                "weight": "400g",
                "price": 350
            }
        ]
    },
    {
        "id": "flour-sprouted-bajra",
        "name": "Sprouted Bajra Flour",
        "description": "Iron-rich sprouted bajra flour.",
        "price": 200,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.43 PM-2.jpeg",
        "category": "Healthy Flours",
        "ingredients": [
            "Sprouted Bajra"
        ],
        "ageGroup": "6m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 200
            },
            {
                "weight": "400g",
                "price": 400
            }
        ]
    },
    {
        "id": "flour-soaked-chana-dal",
        "name": "Soaked Chana Dal Flour",
        "description": "Protein-packed soaked chana dal flour.",
        "price": 150,
        "image": "/images/products/WhatsApp Image 2026-02-08 at 9.01.43 PM-2.jpeg",
        "category": "Healthy Flours",
        "ingredients": [
            "Soaked Chana Dal"
        ],
        "ageGroup": "6m+",
        "weight": "200g",
        "variants": [
            {
                "weight": "200g",
                "price": 150
            },
            {
                "weight": "400g",
                "price": 250
            }
        ]
    }
];

export interface Coupon {
    code: string;
    description?: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    applicability: 'all' | 'category' | 'product' | 'variant';
    target?: string;
    active: boolean;
}

export const coupons: Coupon[] = [
    {
        "code": "SAVE10",
        "discountType": "percentage",
        "discountValue": 10,
        "applicability": "product",
        "target": "sathumava",
        "active": true
    }
];

export const customerFavorites: string[] = [
    "rice-cereal",
    "sathumava",
    "sprouted-ragi-almond-cashew"
];

export interface SiteConfig {
    heroImage: string;
    storyImage: string;
    founderImage: string;
}

export const siteConfig: SiteConfig = {
    "heroImage": "/images/hero-baby.png",
    "storyImage": "/images/products-hero.png",
    "founderImage": "/images/products/WhatsApp Image 2026-02-08 at 9.01.43 PM.jpeg"
};

// Order Types
export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    weight: string;
    image: string;
}

export interface Order {
    id: string;
    date: string;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    customer: {
        firstName: string;
        lastName: string;
        mobile: string;
        email?: string;
    };
    shippingAddress: {
        street: string;
        apartment?: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        latitude?: number;
        longitude?: number;
    };
    items: OrderItem[];
    subtotal: number;
    discount: number;
    couponCode?: string;
    shipping: number;
    total: number;
}

export const orders: Order[] = [];
