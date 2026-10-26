// src/data/store-data.js

export const STORE_CONFIG = {
    storeName: "Vijay Traders",
    tagline: "Curated Beauty, Skincare & Daily Essentials",
    currency: "LKR",
    currencySymbol: "Rs.",
    // PLACEHOLDER CONTACT DETAILS — Replace with verified Vijay Traders numbers prior to launch
    contact: {
      phoneDisplay: "+94 11 234 5678 (Sample Placeholder)",
      phoneHref: "tel:+94112345678",
      whatsappNumber: "94112345678",
      whatsappHref: "https://wa.me/94112345678",
      email: "care@vijaytraders.example.com (Placeholder)",
      address: "Store Address Placeholder, Colombo, Sri Lanka",
      hours: "Mon – Sat: 9:00 AM – 7:00 PM (Placeholder)"
    },
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com"
    },
    announcements: [
      "Discover your beauty essentials — Curated skincare & cosmetics.",
      "Explore our latest beauty arrivals across Women, Men & Sun Protection.",
      "Shop your favourite brands in one place — Value Combo Deals available."
    ],
    // Configurable brand display limit: Requirement specifies 25, handwritten note questions 18.
    defaultBrandDisplayCount: 25
  };
  
  export const HERO_SLIDES = [
    {
      id: "slide-1",
      badge: "Your Beauty Essentials",
      headline: "Discover Your Everyday Glow",
      supportingText: "Explore dermatologically inspired skincare and beauty essentials curated for your daily routine.",
      ctaText: "Shop Now",
      ctaLink: "collection.html?category=women",
      image:"assets/image1.avif",
      imageAlt: "Minimalist arrangement of premium cosmetics and skincare bottles on a clean surface"
    },
    {
      id: "slide-2",
      badge: "Skincare Collection",
      headline: "Care That Shows",
      supportingText: "Find targeted serums, gentle cleansers, and daily sun protection to complement your skin barrier.",
      ctaText: "Explore Skincare",
      ctaLink: "collection.html?category=sun-protection",
      image:"assets/image2.jpg",
      imageAlt: "Dropper serum bottle and skincare textures on a bright white and crimson accented backdrop"
    },
    {
      id: "slide-3",
      badge: "Beauty Combos",
      headline: "More of What You Love",
      supportingText: "Discover thoughtfully paired skincare and grooming combinations with transparent bundle savings.",
      ctaText: "Explore Combo Deals",
      ctaLink: "collection.html?category=combo-deals",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=85",
      imageAlt: "Curated cosmetic bundle set featuring makeup and skincare essentials"
    }
  ];
  
  // Primary Categories & Configurable Subcategory Placeholders
  export const CATEGORIES = [
    {
      id: "women",
      handle: "women",
      title: "Women",
      shortDesc: "Daily skincare, body care, and targeted treatments.",
      bannerDesc: "Explore our complete range of women's skincare, haircare, and personal care formulations. [Sample Category Copy]",
      image: "assets/image1.avif",
      subcategories: [
        { id: "women-sub-1", title: "Women Subcategory 1 (Placeholder)" },
        { id: "women-sub-2", title: "Women Subcategory 2 (Placeholder)" },
        { id: "women-sub-3", title: "Women Subcategory 3 (Placeholder)" },
        { id: "women-sub-4", title: "Women Subcategory 4 (Placeholder)" }
      ]
    },
    {
      id: "men",
      handle: "men",
      title: "Men",
      shortDesc: "Essential grooming, face wash, and daily hydration.",
      bannerDesc: "Formulated for men's daily grooming, beard care, and oil-control skincare routines. [Sample Category Copy]",
      image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80",
      subcategories: [
        { id: "men-sub-1", title: "Men Subcategory 1 (Placeholder)" },
        { id: "men-sub-2", title: "Men Subcategory 2 (Placeholder)" },
        { id: "men-sub-3", title: "Men Subcategory 3 (Placeholder)" },
        { id: "men-sub-4", title: "Men Subcategory 4 (Placeholder)" }
      ]
    },
    {
      id: "make-up",
      handle: "make-up",
      title: "Make-up",
      parentCategory: "women",
      shortDesc: "Complexion, lip, and eye essentials for every look.",
      bannerDesc: "Discover breathable foundations, velvet lip tints, and precision eye essentials. [Sample Category Copy]",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      subcategories: [
        { id: "makeup-sub-1", title: "Make-up Subcategory 1 (Placeholder)" },
        { id: "makeup-sub-2", title: "Make-up Subcategory 2 (Placeholder)" },
        { id: "makeup-sub-3", title: "Make-up Subcategory 3 (Placeholder)" },
        { id: "makeup-sub-4", title: "Make-up Subcategory 4 (Placeholder)" }
      ]
    },
    {
      id: "sun-protection",
      handle: "sun-protection",
      title: "Sun Protection",
      shortDesc: "Broad-spectrum UV defense with zero white cast.",
      bannerDesc: "Lightweight SPF lotions, invisible sun sticks, and soothing after-sun care designed for tropical climates. [Sample Category Copy]",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
      subcategories: []
    },
    {
      id: "mother-baby",
      handle: "mother-baby",
      title: "Mother & Baby",
      shortDesc: "Gentle, fragrance-free care for delicate skin.",
      bannerDesc: "Mild washes, nourishing lotions, and soothing barrier creams for mothers and little ones. [Sample Category Copy]",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
      subcategories: []
    },
    {
      id: "brands",
      handle: "brands",
      title: "Brands",
      shortDesc: "Shop our directory of partner brands.",
      bannerDesc: "Browse products by your preferred skincare and cosmetics house.",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
      subcategories: []
    },
    {
      id: "combo-deals",
      handle: "combo-deals",
      title: "Combo Deals",
      shortDesc: "Curated routine sets with verified bundle savings.",
      bannerDesc: "Save when you purchase complete morning, evening, or grooming routines together.",
      image: "https://images.unsplash.com/photo-1608248597359-0e6d526a6c18?auto=format&fit=crop&w=800&q=80",
      subcategories: []
    }
  ];
  
  // 25 Replaceable Brand Placeholders (Supports both 18 and 25 requirement views)
  export const BRANDS = Array.from({ length: 25 }, (_, i) => {
    const num = i + 1;
    return {
      id: `brand-${num}`,
      handle: `sample-brand-${num}`,
      name: `Brand Placeholder ${String(num).padStart(2, "0")}`,
      code: `BP${String(num).padStart(2, "0")}`,
      categoryFocus: num % 3 === 0 ? "Make-up & Color" : num % 2 === 0 ? "Clinical Skincare" : "Daily Essentials",
      isPlaceholder: true
    };
  });
  
  // Realistic Sample Product Dataset (All claims marked as sample demonstration data)
  export const PRODUCTS = [
    {
      id: "vt-prod-01",
      handle: "niacinamide-10-zinc-clarifying-serum",
      brand: "Brand Placeholder 01",
      title: "Niacinamide 10% + Zinc Clarifying Face Serum [Sample]",
      price: 2850,
      compareAtPrice: 3200,
      category: "women",
      subcategory: "women-sub-1",
      productType: "Face Serum",
      isBestSeller: true,
      isCombo: false,
      available: true,
      sku: "VT-SMP-001",
      shortDescription: "Sample demonstration product: A lightweight daily serum formulated to balance visible sebum and refine skin texture.",
      description: "This is sample product copy for layout demonstration. In production, this field maps to Shopify's product.description HTML. Designed for daily morning and evening application before heavier creams.",
      benefits: [
        "Sample Benefit Placeholder: Helps balance surface oiliness throughout the day.",
        "Sample Benefit Placeholder: Supports a smoother, more even-looking complexion.",
        "Sample Benefit Placeholder: Lightweight aqueous texture absorbs without residue."
      ],
      ingredients: "Sample Ingredients Placeholder: Aqua, Niacinamide, Pentylene Glycol, Zinc PCA, Tamarindus Indica Seed Gum, Phenoxyethanol.",
      howToUse: "Apply 2–3 drops to cleansed face morning and evening before moisturizer. [Sample Instructions]",
      variants: [
        { id: "v-01-30ml", title: "30 ml", price: 2850, compareAtPrice: 3200, sku: "VT-SMP-001-30", available: true },
        { id: "v-01-60ml", title: "60 ml", price: 4900, compareAtPrice: 5400, sku: "VT-SMP-001-60", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1608248597359-0e6d526a6c18?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "vt-prod-02",
      handle: "invisible-fluid-sunscreen-spf50",
      brand: "Brand Placeholder 02",
      title: "Ultra-Light Fluid Sunscreen SPF 50+ PA++++ [Sample]",
      price: 3400,
      compareAtPrice: null,
      category: "sun-protection",
      subcategory: null,
      productType: "Sunscreen",
      isBestSeller: true,
      isCombo: false,
      available: true,
      sku: "VT-SMP-002",
      shortDescription: "Sample demonstration product: Broad-spectrum daily fluid sunscreen with a breathable, non-greasy finish.",
      description: "Sample demonstration copy: Engineered for humid climates, this fluid sunscreen layers seamlessly beneath makeup or wears invisibly on bare skin.",
      benefits: [
        "Sample Benefit Placeholder: High UVA/UVB protection rating for daily outdoor wear.",
        "Sample Benefit Placeholder: Zero white cast on diverse skin tones.",
        "Sample Benefit Placeholder: Fast-absorbing fluid emulsion."
      ],
      ingredients: "Sample Ingredients Placeholder: Aqua, Dibutyl Adipate, Propanediol, Ethylhexyl Triazone, Terephthalylidene Dicamphor Sulfonic Acid.",
      howToUse: "Apply generously as the final step of your morning skincare routine 15 minutes before sun exposure. [Sample]",
      variants: [
        { id: "v-02-50ml", title: "50 ml", price: 3400, compareAtPrice: null, sku: "VT-SMP-002-50", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "vt-prod-03",
      handle: "velvet-matte-lip-tint-crimson",
      brand: "Brand Placeholder 03",
      title: "Velvet Matte Lip & Cheek Tint [Sample]",
      price: 2150,
      compareAtPrice: 2500,
      category: "make-up",
      subcategory: "makeup-sub-1",
      productType: "Lip Makeup",
      isBestSeller: true,
      isCombo: false,
      available: true,
      sku: "VT-SMP-003",
      shortDescription: "Sample demonstration product: Weightless soft-matte lip color that doubles as a diffused cheek stain.",
      description: "Sample demonstration copy: Rich pigment meets a plush mousse texture that blurs lip lines without drying.",
      benefits: [
        "Sample Benefit Placeholder: Buildable payoff from sheer stain to full velvet matte.",
        "Sample Benefit Placeholder: Multi-use formula suitable for lips and cheeks.",
        "Sample Benefit Placeholder: Comfortable wear throughout the day."
      ],
      ingredients: "Sample Ingredients Placeholder: Dimethicone, Dimethicone Crosspolymer, Polyglyceryl-2 Triisostearate, CI 15850.",
      howToUse: "Dab onto center of lips and blend outward, or tap lightly onto apples of cheeks. [Sample]",
      variants: [
        { id: "v-03-ruby", title: "01 Crimson Silk", price: 2150, compareAtPrice: 2500, sku: "VT-SMP-003-01", available: true },
        { id: "v-03-rose", title: "02 Petal Dust", price: 2150, compareAtPrice: 2500, sku: "VT-SMP-003-02", available: true },
        { id: "v-03-berry", title: "03 Spiced Berry", price: 2150, compareAtPrice: 2500, sku: "VT-SMP-003-03", available: false }
      ],
      images: [
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "vt-prod-04",
      handle: "charcoal-salicylic-men-cleanser",
      brand: "Brand Placeholder 04",
      title: "Men's Purifying Salicylic + Charcoal Gel Wash [Sample]",
      price: 1950,
      compareAtPrice: null,
      category: "men",
      subcategory: "men-sub-1",
      productType: "Cleanser",
      isBestSeller: true,
      isCombo: false,
      available: true,
      sku: "VT-SMP-004",
      shortDescription: "Sample demonstration product: Deep-cleansing daily face wash for men to remove sweat, oil, and urban pollutants.",
      description: "Sample demonstration copy: Formulated with gentle surfactants so skin feels refreshed and calm prior to shaving or moisturizing.",
      benefits: [
        "Sample Benefit Placeholder: Clears excess oil without stripping moisture.",
        "Sample Benefit Placeholder: Prepares facial hair and skin for a cleaner shave.",
        "Sample Benefit Placeholder: pH-balanced daily gel formula."
      ],
      ingredients: "Sample Ingredients Placeholder: Aqua, Cocamidopropyl Betaine, Salicylic Acid, Charcoal Powder, Glycerin.",
      howToUse: "Massage onto wet face for 60 seconds and rinse thoroughly with cool water. [Sample]",
      variants: [
        { id: "v-04-150ml", title: "150 ml", price: 1950, compareAtPrice: null, sku: "VT-SMP-004-150", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "vt-prod-05",
      handle: "ceramide-oat-baby-soothing-lotion",
      brand: "Brand Placeholder 05",
      title: "Gentle Oat & Ceramide Baby Barrier Lotion [Sample]",
      price: 2600,
      compareAtPrice: 2900,
      category: "mother-baby",
      subcategory: null,
      productType: "Body Care",
      isBestSeller: false,
      isCombo: false,
      available: true,
      sku: "VT-SMP-005",
      shortDescription: "Sample demonstration product: Fragrance-free moisturizing lotion for delicate baby and maternal skin.",
      description: "Sample demonstration copy: Colloidal oatmeal and skin-identical ceramides help comfort dry patches after bath time.",
      benefits: [
        "Sample Benefit Placeholder: 100% free from artificial fragrance and essential oils.",
        "Sample Benefit Placeholder: Softens and comforts delicate skin.",
        "Sample Benefit Placeholder: Non-sticky texture for easy dressing."
      ],
      ingredients: "Sample Ingredients Placeholder: Aqua, Glycerin, Avena Sativa Kernel Flour, Ceramide NP, Caprylic/Capric Triglyceride.",
      howToUse: "Smooth gently over baby's body and face after bathing or as needed. [Sample]",
      variants: [
        { id: "v-05-200ml", title: "200 ml", price: 2600, compareAtPrice: 2900, sku: "VT-SMP-005-200", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "vt-prod-06",
      handle: "hyaluronic-b5-hydrating-gel-cream",
      brand: "Brand Placeholder 01",
      title: "Multi-Molecular Hyaluronic + B5 Gel Moisturizer [Sample]",
      price: 3100,
      compareAtPrice: null,
      category: "women",
      subcategory: "women-sub-2",
      productType: "Moisturizer",
      isBestSeller: true,
      isCombo: false,
      available: true,
      sku: "VT-SMP-006",
      shortDescription: "Sample demonstration product: Oil-free water-gel moisturizer delivering multi-depth surface hydration.",
      description: "Sample demonstration copy: Combines Panthenol (Vitamin B5) with hyaluronic acid to plump fine dehydration lines.",
      benefits: [
        "Sample Benefit Placeholder: Instant cooling hydration for combination skin.",
        "Sample Benefit Placeholder: Oil-free, non-comedogenic texture.",
        "Sample Benefit Placeholder: Ideal base under daily sunscreen."
      ],
      ingredients: "Sample Ingredients Placeholder: Aqua, Sodium Hyaluronate, Panthenol, Biosaccharide Gum-1, Ethylhexylglycerin.",
      howToUse: "Apply an even layer to face and neck morning and night. [Sample]",
      variants: [
        { id: "v-06-50g", title: "50 g", price: 3100, compareAtPrice: null, sku: "VT-SMP-006-50", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "vt-prod-07",
      handle: "luminous-silk-wear-foundation",
      brand: "Brand Placeholder 06",
      title: "Second-Skin Luminous Serum Foundation [Sample]",
      price: 4200,
      compareAtPrice: 4600,
      category: "make-up",
      subcategory: "makeup-sub-2",
      productType: "Complexion",
      isBestSeller: false,
      isCombo: false,
      available: true,
      sku: "VT-SMP-007",
      shortDescription: "Sample demonstration product: Breathable medium-coverage liquid foundation with a natural satin finish.",
      description: "Sample demonstration copy: Evens out redness and hyperpigmentation while looking like real skin.",
      benefits: [
        "Sample Benefit Placeholder: Crease-resistant 12-hour wear.",
        "Sample Benefit Placeholder: Infused with hydrating squalane.",
        "Sample Benefit Placeholder: Flash-friendly without flashback."
      ],
      ingredients: "Sample Ingredients Placeholder: Aqua, Cyclopentasiloxane, Squalane, Titanium Dioxide, Iron Oxides.",
      howToUse: "Shake well. Apply 1 pump with fingers, sponge, or foundation brush. [Sample]",
      variants: [
        { id: "v-07-warm-ivory", title: "210 Warm Ivory", price: 4200, compareAtPrice: 4600, sku: "VT-SMP-007-210", available: true },
        { id: "v-07-golden-sand", title: "320 Golden Sand", price: 4200, compareAtPrice: 4600, sku: "VT-SMP-007-320", available: true },
        { id: "v-07-rich-amber", title: "430 Rich Amber", price: 4200, compareAtPrice: 4600, sku: "VT-SMP-007-430", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "vt-prod-08",
      handle: "post-shave-barrier-recovery-balm",
      brand: "Brand Placeholder 04",
      title: "Men's Soothing Post-Shave Recovery Fluid [Sample]",
      price: 2300,
      compareAtPrice: null,
      category: "men",
      subcategory: "men-sub-2",
      productType: "Moisturizer",
      isBestSeller: false,
      isCombo: false,
      available: true,
      sku: "VT-SMP-008",
      shortDescription: "Sample demonstration product: Alcohol-free calming fluid to reduce razor burn and redness.",
      description: "Sample demonstration copy: Enriched with Centella Asiatica and Allantoin for immediate post-shave comfort.",
      benefits: [
        "Sample Benefit Placeholder: Zero stinging alcohol formula.",
        "Sample Benefit Placeholder: Calms visible razor irritation rapidly.",
        "Sample Benefit Placeholder: Doubles as a lightweight daily moisturizer."
      ],
      ingredients: "Sample Ingredients Placeholder: Aqua, Centella Asiatica Extract, Allantoin, Panthenol, Cetearyl Olivate.",
      howToUse: "Pat onto freshly shaved or cleansed skin across face and neck. [Sample]",
      variants: [
        { id: "v-08-100ml", title: "100 ml", price: 2300, compareAtPrice: null, sku: "VT-SMP-008-100", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=900&q=80"
      ]
    },
    // COMBO DEALS (Calculated directly from real sample unit prices)
    {
      id: "vt-combo-01",
      handle: "am-glow-sun-defense-duo",
      brand: "Vijay Traders Curated Bundle",
      title: "AM Clarifying & Sun Defense Duo [Sample Combo]",
      // Real unit prices: Niacinamide (2850) + SPF 50 (3400) = 6250 combined
      price: 5450,
      compareAtPrice: 6250,
      category: "combo-deals",
      subcategory: null,
      productType: "Routine Bundle",
      isBestSeller: true,
      isCombo: true,
      includedItems: [
        "Niacinamide 10% + Zinc Clarifying Face Serum (30 ml)",
        "Ultra-Light Fluid Sunscreen SPF 50+ PA++++ (50 ml)"
      ],
      available: true,
      sku: "VT-CMB-001",
      shortDescription: "Sample bundle demonstration: Complete 2-step morning routine pairing oil-balancing Niacinamide with invisible SPF 50+ protection.",
      description: "Save Rs. 800 when purchasing our two most requested morning essentials together. Price savings calculated directly from individual sample prices (Rs. 2,850 + Rs. 3,400 = Rs. 6,250).",
      benefits: [
        "Sample Bundle Benefit: Streamlined 2-step morning protection and clarity.",
        "Sample Bundle Benefit: Verified bundle savings of Rs. 800 off combined individual prices.",
        "Sample Bundle Benefit: Suitable for normal, combination, and oily skin types."
      ],
      ingredients: "Refer to individual product packaging for full component ingredient lists.",
      howToUse: "Step 1: Apply 2–3 drops of Niacinamide Serum. Step 2: Follow with Fluid Sunscreen SPF 50+.",
      variants: [
        { id: "v-cmb-01", title: "Standard 2-Piece Set", price: 5450, compareAtPrice: 6250, sku: "VT-CMB-001-SET", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1608248597359-0e6d526a6c18?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "vt-combo-02",
      handle: "mens-daily-essential-grooming-kit",
      brand: "Vijay Traders Curated Bundle",
      title: "Men's Daily Cleanse & Recovery Duo [Sample Combo]",
      // Real unit prices: Men's Cleanser (1950) + Post-Shave Balm (2300) = 4250 combined
      price: 3750,
      compareAtPrice: 4250,
      category: "combo-deals",
      subcategory: null,
      productType: "Routine Bundle",
      isBestSeller: false,
      isCombo: true,
      includedItems: [
        "Men's Purifying Salicylic + Charcoal Gel Wash (150 ml)",
        "Men's Soothing Post-Shave Recovery Fluid (100 ml)"
      ],
      available: true,
      sku: "VT-CMB-002",
      shortDescription: "Sample bundle demonstration: Essential two-step men's face wash and alcohol-free post-shave hydrator.",
      description: "Save Rs. 500 off the combined individual prices (Rs. 1,950 + Rs. 2,300 = Rs. 4,250).",
      benefits: [
        "Sample Bundle Benefit: Complete cleansing and post-shave soothing routine.",
        "Sample Bundle Benefit: Transparent Rs. 500 bundle discount."
      ],
      ingredients: "Refer to individual product packaging for full ingredient lists.",
      howToUse: "Cleanse with the Charcoal Gel Wash, shave if desired, and finish with the Post-Shave Recovery Fluid.",
      variants: [
        { id: "v-cmb-02", title: "Standard 2-Piece Set", price: 3750, compareAtPrice: 4250, sku: "VT-CMB-002-SET", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=900&q=80"
      ]
    },
    {
      id: "vt-combo-03",
      handle: "hydra-plump-lip-complexion-set",
      brand: "Vijay Traders Curated Bundle",
      title: "Hydra-Glow Skin & Velvet Lip Trio [Sample Combo]",
      // Hyaluronic Gel (3100) + Lip Tint (2150) + Foundation (4200) = 9450
      price: 8250,
      compareAtPrice: 9450,
      category: "combo-deals",
      subcategory: null,
      productType: "Routine Bundle",
      isBestSeller: true,
      isCombo: true,
      includedItems: [
        "Multi-Molecular Hyaluronic + B5 Gel Moisturizer (50 g)",
        "Second-Skin Luminous Serum Foundation (30 ml)",
        "Velvet Matte Lip & Cheek Tint (01 Crimson Silk)"
      ],
      available: true,
      sku: "VT-CMB-003",
      shortDescription: "Sample bundle demonstration: Prep, perfect, and add a touch of crimson color with this 3-piece makeup and skincare set.",
      description: "Save Rs. 1,200 off the combined individual prices (Rs. 3,100 + Rs. 4,200 + Rs. 2,150 = Rs. 9,450).",
      benefits: [
        "Sample Bundle Benefit: Hydrated skin prep for seamless foundation application.",
        "Sample Bundle Benefit: Verified savings of Rs. 1,200."
      ],
      ingredients: "Refer to individual product packaging for full ingredient lists.",
      howToUse: "Prep with Hyaluronic Gel, even tone with Serum Foundation, and finish with Lip & Cheek Tint.",
      variants: [
        { id: "v-cmb-03", title: "Standard 3-Piece Set", price: 8250, compareAtPrice: 9450, sku: "VT-CMB-003-SET", available: true }
      ],
      images: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
      ]
    }
  ];
  
  export function formatMoney(amount) {
    if (typeof amount !== "number") return "";
    return `${STORE_CONFIG.currencySymbol} ${amount.toLocaleString("en-LK")}`;
  }