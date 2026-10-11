import { Product, Coupon, KeralaDistrictPincode, Order, Review } from '../types';

export const HERO_BANNER_IMG = '/src/assets/images/clothcity_hero_streetwear_1791708934032.jpg';
export const OVERSIZED_TEE_IMG = '/src/assets/images/clothcity_oversized_tee_1791708953503.jpg';
export const BAGGY_CARGOS_IMG = '/src/assets/images/clothcity_baggy_cargos_1791708967271.jpg';
export const KERALA_FESTIVE_IMG = '/src/assets/images/clothcity_kerala_festive_1791708983323.jpg';

export const KERALA_PINCODES: KeralaDistrictPincode[] = [
  { pincode: '682001', district: 'Ernakulam', locality: 'Kochi / Marine Drive', deliveryDays: 1, codAvailable: true, expressAvailable: true },
  { pincode: '682020', district: 'Ernakulam', locality: 'Panampilly Nagar, Kochi', deliveryDays: 1, codAvailable: true, expressAvailable: true },
  { pincode: '682024', district: 'Ernakulam', locality: 'Kakkanad / Infopark, Kochi', deliveryDays: 1, codAvailable: true, expressAvailable: true },
  { pincode: '673001', district: 'Kozhikode', locality: 'Calicut Beach / SM Street', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  { pincode: '695001', district: 'Thiruvananthapuram', locality: 'Statue / Palayam, Trivandrum', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  { pincode: '695581', district: 'Thiruvananthapuram', locality: 'Technopark / Kazhakkoottam', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  { pincode: '680001', district: 'Thrissur', locality: 'Swaraj Round, Thrissur', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  { pincode: '670001', district: 'Kannur', locality: 'Kannur Town', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  { pincode: '686001', district: 'Kottayam', locality: 'Kottayam Town', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  { pincode: '676505', district: 'Malappuram', locality: 'Manjeri / Malappuram', deliveryDays: 2, codAvailable: true, expressAvailable: false },
  { pincode: '678001', district: 'Palakkad', locality: 'Palakkad Fort Road', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  { pincode: '688001', district: 'Alappuzha', locality: 'Alappuzha Town', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  { pincode: '691001', district: 'Kollam', locality: 'Chinnakada, Kollam', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  { pincode: '671121', district: 'Kasaragod', locality: 'Kasaragod Town', deliveryDays: 3, codAvailable: true, expressAvailable: false },
  { pincode: '673121', district: 'Wayanad', locality: 'Kalpetta, Wayanad', deliveryDays: 3, codAvailable: true, expressAvailable: false },
  { pincode: '685602', district: 'Idukki', locality: 'Munnar / Thodupuzha', deliveryDays: 3, codAvailable: true, expressAvailable: false },
  { pincode: '689645', district: 'Pathanamthitta', locality: 'Adoor / Pathanamthitta', deliveryDays: 2, codAvailable: true, expressAvailable: false },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'cc-prod-001',
    title: 'K-Street 0484 Heavyweight Oversized Tee',
    subtitle: 'Signature Kochi Streetwear Drop with 240 GSM Breathable French Terry Cotton',
    price: 699,
    mrp: 1299,
    gender: 'unisex',
    category: 'oversized-tshirts',
    collections: ['oversized-collection', 'college-wear', 'weekend-fits', 'under-999'],
    fitType: 'Oversized',
    fabric: '100% Combed Heavyweight Cotton (240 GSM), Pre-shrunk & silicone bio-washed for Kerala humidity',
    careInstructions: 'Machine wash cold inside out, tumble dry low or shade dry, do not iron directly on print.',
    description: 'Inspired by the vibrant youth subculture of Kochi 0484 and Fort Kochi skate parks. Engineered with a relaxed drop shoulder, ribbed high collar that retains structure, and high breathability tailored specifically for coastal humidity.',
    highlights: [
      '240 GSM Heavyweight French Terry finish',
      'Anti-shrink pre-treated fabric for humid coastal weather',
      'Durable puff-screen typographic print',
      'Reinforced double-stitched drop shoulder seams'
    ],
    images: [
      OVERSIZED_TEE_IMG,
      HERO_BANNER_IMG,
      BAGGY_CARGOS_IMG
    ],
    variants: [
      { id: 'v-001-s', size: 'S', colorName: 'Washed Charcoal', colorHex: '#27272a', stock: 12, sku: 'CC-0484-BLK-S' },
      { id: 'v-001-m', size: 'M', colorName: 'Washed Charcoal', colorHex: '#27272a', stock: 24, sku: 'CC-0484-BLK-M' },
      { id: 'v-001-l', size: 'L', colorName: 'Washed Charcoal', colorHex: '#27272a', stock: 18, sku: 'CC-0484-BLK-L' },
      { id: 'v-001-xl', size: 'XL', colorName: 'Washed Charcoal', colorHex: '#27272a', stock: 8, sku: 'CC-0484-BLK-XL' },
      { id: 'v-001-xxl', size: 'XXL', colorName: 'Washed Charcoal', colorHex: '#27272a', stock: 4, sku: 'CC-0484-BLK-XXL' },
    ],
    availableColors: [
      { name: 'Washed Charcoal', hex: '#27272a' },
      { name: 'Olive Moss', hex: '#3f4f34' },
      { name: 'Chalk White', hex: '#f4f4f5' }
    ],
    rating: 4.8,
    reviewCount: 38,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2026-08-15',
    reviews: [
      {
        id: 'rev-01',
        userName: 'Arjun Nambiar',
        userCity: 'Kochi, Kerala',
        rating: 5,
        date: '2026-09-24',
        title: 'Perfect drape for Kochi humidity!',
        comment: 'Usually heavy tees make you sweat in Ernakulam, but the combed weave on this tee stays super airy. The collar doesn’t sag after washing.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'Perfect oversized drape'
      },
      {
        id: 'rev-02',
        userName: 'Fathima Rafeeq',
        userCity: 'Kozhikode, Kerala',
        rating: 5,
        date: '2026-09-18',
        title: 'Insane quality for ₹699',
        comment: 'Looks and feels like high-end Zara or H&M streetwear but at a student-friendly price. Baggy fit is so good.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'cc-prod-002',
    title: 'Tactical Utility Baggy Cargo Jeans',
    subtitle: 'Relaxed Wide-Leg 12oz Washed Denim with Quick-Access 6-Pocket Utility',
    price: 1399,
    mrp: 2499,
    gender: 'unisex',
    category: 'pants-cargos',
    collections: ['weekend-fits', 'minimal-streetwear', 'new-gen-fits'],
    fitType: 'Baggy',
    fabric: '100% Breathable Ring-Spun Denim (12oz Cotton Twill), stone-washed for soft mobility',
    careInstructions: 'Machine wash cold with similar dark colors, do not bleach, warm iron if required.',
    description: 'Designed for effortless everyday movement on campus or weekend cafe hangs across Panampilly and Calicut beach. Deep bellow pockets with secure snap fasteners, adjustable ankle toggles, and reinforced knee articulation.',
    highlights: [
      '12oz pure cotton denim for year-round breathability',
      '6 reinforced tactical utility pockets with snap buttons',
      'Adjustable bungee drawstring hems for sneaker stacking',
      'YKK metal zip fly and premium brass hardware'
    ],
    images: [
      BAGGY_CARGOS_IMG,
      OVERSIZED_TEE_IMG,
      HERO_BANNER_IMG
    ],
    variants: [
      { id: 'v-002-s', size: 'S', colorName: 'Deep Vintage Indigo', colorHex: '#1e293b', stock: 10, sku: 'CC-CRG-IND-S' },
      { id: 'v-002-m', size: 'M', colorName: 'Deep Vintage Indigo', colorHex: '#1e293b', stock: 16, sku: 'CC-CRG-IND-M' },
      { id: 'v-002-l', size: 'L', colorName: 'Deep Vintage Indigo', colorHex: '#1e293b', stock: 14, sku: 'CC-CRG-IND-L' },
      { id: 'v-002-xl', size: 'XL', colorName: 'Deep Vintage Indigo', colorHex: '#1e293b', stock: 6, sku: 'CC-CRG-IND-XL' },
    ],
    availableColors: [
      { name: 'Deep Vintage Indigo', hex: '#1e293b' },
      { name: 'Washed Ash Grey', hex: '#52525b' },
      { name: 'Tactical Olive', hex: '#365314' }
    ],
    rating: 4.9,
    reviewCount: 42,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2026-08-20',
    reviews: [
      {
        id: 'rev-03',
        userName: 'Gautham Krishna',
        userCity: 'Trivandrum, Kerala',
        rating: 5,
        date: '2026-09-28',
        title: 'Best cargo jeans in India right now',
        comment: 'The ankle toggles let you switch between wide leg puddle fit and tapered jogger style over sneakers. Super durable fabric.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'cc-prod-003',
    title: 'Kasavu Accent Boxy Linen Co-Ord Set',
    subtitle: 'Modern Minimal Kerala Festival & Onam Edit with Subtle Gold-Trim Piping',
    price: 1499,
    mrp: 2799,
    gender: 'unisex',
    category: 'coords',
    collections: ['onam-festive', 'summer-comfort', 'everyday-kerala'],
    fitType: 'Boxy',
    fabric: 'Pure Cotton-Linen Slub (70% Cotton, 30% European Linen), ultra-airy open weave',
    careInstructions: 'Gentle hand wash or gentle machine wash in cold water, line dry in shade.',
    description: 'A contemporary reimagining of traditional Kerala festive attire for modern Gen-Z youth. Combines a boxy drop-shoulder camp collar shirt with relaxed straight-leg trousers, highlighted by quiet antique gold thread accents on cuff and placket.',
    highlights: [
      'Breathable organic linen-cotton slub weave',
      'Subtle heritage Kasavu-inspired micro gold piping',
      'Drop-shoulder boxy silhouette with camp cuban collar',
      'Elasticated waistband with cotton drawstrings for effortless fit'
    ],
    images: [
      KERALA_FESTIVE_IMG,
      HERO_BANNER_IMG,
      OVERSIZED_TEE_IMG
    ],
    variants: [
      { id: 'v-003-s', size: 'S', colorName: 'Natural Ivory Off-White', colorHex: '#fafaf9', stock: 15, sku: 'CC-ONAM-IVY-S' },
      { id: 'v-003-m', size: 'M', colorName: 'Natural Ivory Off-White', colorHex: '#fafaf9', stock: 20, sku: 'CC-ONAM-IVY-M' },
      { id: 'v-003-l', size: 'L', colorName: 'Natural Ivory Off-White', colorHex: '#fafaf9', stock: 18, sku: 'CC-ONAM-IVY-L' },
      { id: 'v-003-xl', size: 'XL', colorName: 'Natural Ivory Off-White', colorHex: '#fafaf9', stock: 9, sku: 'CC-ONAM-IVY-XL' },
    ],
    availableColors: [
      { name: 'Natural Ivory Off-White', hex: '#fafaf9' },
      { name: 'Earth Clay Black', hex: '#18181b' }
    ],
    rating: 4.9,
    reviewCount: 56,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true,
    createdAt: '2026-09-01',
    reviews: [
      {
        id: 'rev-04',
        userName: 'Aiswarya Menon',
        userCity: 'Thrissur, Kerala',
        rating: 5,
        date: '2026-09-25',
        title: 'Wore this for Onam celebration and everyone asked!',
        comment: 'So refreshing compared to boring stiff dhotis and kurtas. Modern streetwear with just the right Kerala heritage touch.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'Perfect oversized drape'
      }
    ]
  },
  {
    id: 'cc-prod-004',
    title: 'Monsoon Proof Hydro-Glide Parachute Pants',
    subtitle: 'Lightweight Quick-Drying Ripstop Nylon with Adjustable Cargo Cord Pulls',
    price: 999,
    mrp: 1899,
    gender: 'unisex',
    category: 'pants-cargos',
    collections: ['monsoon-essentials', 'college-wear', 'under-999'],
    fitType: 'Relaxed',
    fabric: 'Quick-Dry Micro Ripstop with water-repellent finish, featherweight 140 GSM',
    careInstructions: 'Machine wash cold, drip dry in minutes, do not dry clean.',
    description: 'Constructed for Kerala’s heavy monsoon showers and humid college commute. Water drops glide off the outer shell, and the fabric dries in under 15 minutes while maintaining a stylish streetwear puddle silhouette.',
    highlights: [
      'Water-repellent Lotus-effect finish',
      'Ultra quick-dry in humid monsoon weather',
      'Dual bungee knee-ruching cords for customizable flare',
      'Deep zipper-protected waterproof pockets for smartphones'
    ],
    images: [
      BAGGY_CARGOS_IMG,
      HERO_BANNER_IMG
    ],
    variants: [
      { id: 'v-004-s', size: 'S', colorName: 'Midnight Jet Black', colorHex: '#09090b', stock: 14, sku: 'CC-MNS-BLK-S' },
      { id: 'v-004-m', size: 'M', colorName: 'Midnight Jet Black', colorHex: '#09090b', stock: 22, sku: 'CC-MNS-BLK-M' },
      { id: 'v-004-l', size: 'L', colorName: 'Midnight Jet Black', colorHex: '#09090b', stock: 15, sku: 'CC-MNS-BLK-L' },
      { id: 'v-004-xl', size: 'XL', colorName: 'Midnight Jet Black', colorHex: '#09090b', stock: 7, sku: 'CC-MNS-BLK-XL' },
    ],
    availableColors: [
      { name: 'Midnight Jet Black', hex: '#09090b' },
      { name: 'Cyber Lime Accent', hex: '#b4f724' }
    ],
    rating: 4.7,
    reviewCount: 29,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2026-09-10',
    reviews: [
      {
        id: 'rev-05',
        userName: 'Sreehari Varma',
        userCity: 'Alappuzha, Kerala',
        rating: 5,
        date: '2026-09-30',
        title: 'Life saver during Kerala rainstorms',
        comment: 'Rode my scooter in heavy rain between Kochi and Alappuzha, these dried so quickly inside the college cafe.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'cc-prod-005',
    title: 'Fort Kochi Cafe Relaxed Camp Shirt',
    subtitle: 'Airy Lightweight Cotton-Modal Open Collar Shirt in Coastal Stripes',
    price: 849,
    mrp: 1599,
    gender: 'men',
    category: 'shirts',
    collections: ['weekend-fits', 'summer-comfort', 'everyday-kerala', 'under-999'],
    fitType: 'Relaxed',
    fabric: 'Breathable Cotton-Modal Blend (160 GSM), silky soft feel with maximum air circulation',
    careInstructions: 'Machine wash delicate, cool iron or steam, hang dry.',
    description: 'The definitive weekend shirt for Fort Kochi art cafes, sunset walks along Calicut beach, and casual dates. Features a vintage cuban camp collar, mother-of-pearl buttons, and a breezy relaxed silhouette that drapes gracefully.',
    highlights: [
      'Silky cotton-modal blend keeps body cool at 34°C',
      'Cuban camp open collar with notch detail',
      'Relaxed boxy chest cut with side split hems',
      'Anti-wrinkle easy care weave'
    ],
    images: [
      KERALA_FESTIVE_IMG,
      OVERSIZED_TEE_IMG
    ],
    variants: [
      { id: 'v-005-s', size: 'S', colorName: 'Coastal Sage & Cream', colorHex: '#a3b18a', stock: 11, sku: 'CC-SHR-SGE-S' },
      { id: 'v-005-m', size: 'M', colorName: 'Coastal Sage & Cream', colorHex: '#a3b18a', stock: 19, sku: 'CC-SHR-SGE-M' },
      { id: 'v-005-l', size: 'L', colorName: 'Coastal Sage & Cream', colorHex: '#a3b18a', stock: 16, sku: 'CC-SHR-SGE-L' },
      { id: 'v-005-xl', size: 'XL', colorName: 'Coastal Sage & Cream', colorHex: '#a3b18a', stock: 5, sku: 'CC-SHR-SGE-XL' },
    ],
    availableColors: [
      { name: 'Coastal Sage & Cream', hex: '#a3b18a' },
      { name: 'Oatmeal Natural', hex: '#e6ccb2' },
      { name: 'Navy Coastal Stripe', hex: '#1e3a8a' }
    ],
    rating: 4.8,
    reviewCount: 31,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2026-08-01',
    reviews: [
      {
        id: 'rev-06',
        userName: 'Rohan Thomas',
        userCity: 'Kottayam, Kerala',
        rating: 5,
        date: '2026-09-12',
        title: 'Super soft and feels high end',
        comment: 'Drapes amazingly with baggy denim or linen pants. Highly recommended for hot afternoons.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'cc-prod-006',
    title: 'Womens Boxy Heavyweight Cropped Street Tee',
    subtitle: 'Relaxed Drop-Shoulder 220 GSM Cotton Top with Raw Edge Hem Detail',
    price: 499,
    mrp: 999,
    gender: 'women',
    category: 'oversized-tshirts',
    collections: ['new-gen-fits', 'college-wear', 'under-499', 'under-999'],
    fitType: 'Boxy',
    fabric: '100% Ring-Spun Premium Cotton (220 GSM), gentle enzyme wash',
    careInstructions: 'Machine wash inside out cold, do not tumble dry, warm iron if needed.',
    description: 'Tailored for Gen-Z girls seeking effortless high-waisted styling. Pairs seamlessly with wide-leg jeans, cargo trousers, and everyday sneakers for college lectures or casual hangouts.',
    highlights: [
      '220 GSM premium structured cotton holds boxy shape',
      'Wide ribbed crew collar that stays crisp',
      'Balanced crop length hitting right at the waistline',
      '100% skin-safe AZO-free reactive dyes'
    ],
    images: [
      HERO_BANNER_IMG,
      OVERSIZED_TEE_IMG
    ],
    variants: [
      { id: 'v-006-xs', size: 'XS', colorName: 'Lime Cyber White', colorHex: '#fafafa', stock: 12, sku: 'CC-CRP-WHT-XS' },
      { id: 'v-006-s', size: 'S', colorName: 'Lime Cyber White', colorHex: '#fafafa', stock: 25, sku: 'CC-CRP-WHT-S' },
      { id: 'v-006-m', size: 'M', colorName: 'Lime Cyber White', colorHex: '#fafafa', stock: 30, sku: 'CC-CRP-WHT-M' },
      { id: 'v-006-l', size: 'L', colorName: 'Lime Cyber White', colorHex: '#fafafa', stock: 14, sku: 'CC-CRP-WHT-L' },
    ],
    availableColors: [
      { name: 'Lime Cyber White', hex: '#fafafa' },
      { name: 'Slate Onyx', hex: '#27272a' },
      { name: 'Dusty Lilac', hex: '#c084fc' }
    ],
    rating: 4.9,
    reviewCount: 47,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2026-08-11',
    reviews: [
      {
        id: 'rev-07',
        userName: 'Meera Rajesh',
        userCity: 'Kochi, Kerala',
        rating: 5,
        date: '2026-09-20',
        title: 'Exactly what I wanted for college!',
        comment: 'Not too short, sits right at the belt line. Fabric is thick enough not to be see-through at all.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'cc-prod-007',
    title: 'Wide-Leg 90s Relaxed Carpenter Denim',
    subtitle: 'High-Rise Vintage Washed Denim with Utility Hammer Loop & Contrast Stitch',
    price: 1299,
    mrp: 2299,
    gender: 'women',
    category: 'jeans',
    collections: ['new-gen-fits', 'weekend-fits', 'minimal-streetwear'],
    fitType: 'Baggy',
    fabric: '100% Breathable Cotton Denim (11.5oz), durable non-stretch vintage weave',
    careInstructions: 'Machine wash cold inside out, wash with like denim tones, air dry.',
    description: 'The trending 90s skater & carpenter silhouette embraced by Gen-Z across Kerala campuses. High-rise fit hugging the waist while releasing into a generous wide-leg drape down to the shoes.',
    highlights: [
      '11.5oz authentic non-stretch cotton denim',
      'Classic carpenter utility side loop and ruler pocket',
      'Contrasting cream thread stitching',
      'Flattering high-rise contour waist'
    ],
    images: [
      BAGGY_CARGOS_IMG,
      HERO_BANNER_IMG
    ],
    variants: [
      { id: 'v-007-xs', size: 'XS', colorName: 'Faded Bleach Blue', colorHex: '#93c5fd', stock: 8, sku: 'CC-WJN-BLU-XS' },
      { id: 'v-007-s', size: 'S', colorName: 'Faded Bleach Blue', colorHex: '#93c5fd', stock: 15, sku: 'CC-WJN-BLU-S' },
      { id: 'v-007-m', size: 'M', colorName: 'Faded Bleach Blue', colorHex: '#93c5fd', stock: 18, sku: 'CC-WJN-BLU-M' },
      { id: 'v-007-l', size: 'L', colorName: 'Faded Bleach Blue', colorHex: '#93c5fd', stock: 10, sku: 'CC-WJN-BLU-L' },
    ],
    availableColors: [
      { name: 'Faded Bleach Blue', hex: '#93c5fd' },
      { name: 'Washed Charcoal Black', hex: '#27272a' }
    ],
    rating: 4.8,
    reviewCount: 34,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2026-09-05',
    reviews: [
      {
        id: 'rev-08',
        userName: 'Devika Nair',
        userCity: 'Kannur, Kerala',
        rating: 5,
        date: '2026-09-22',
        title: 'Fits my waist and thighs so comfortably',
        comment: 'Usually jeans are tight around thighs or loose at the waist. This cut is perfect for everyday wear.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'cc-prod-008',
    title: 'Minimal Typography Drop-Shoulder Basic Tee',
    subtitle: 'Plain Heavy 240 GSM Cotton Essential with Subtle Micro-Logo Collar Embroidery',
    price: 449,
    mrp: 899,
    gender: 'unisex',
    category: 'plain-tshirts',
    collections: ['under-499', 'under-999', 'black-white', 'college-wear'],
    fitType: 'Drop-Shoulder',
    fabric: '100% Super-Combed Long Staple Cotton (240 GSM), silicone soft wash',
    careInstructions: 'Machine wash warm, do not bleach, tumble dry low.',
    description: 'The foundation of minimalist Kerala streetwear. No loud branding—just immaculate tailoring, heavy drape, clean drop shoulders, and a reinforced neckline that refuses to stretch out.',
    highlights: [
      'Heavyweight 240 GSM combed cotton',
      'Micro embroidered tonal logo on back neck',
      'Side seam reinforcement for zero torquing after wash',
      'Breathable all-day wear for college & daily routines'
    ],
    images: [
      OVERSIZED_TEE_IMG,
      HERO_BANNER_IMG
    ],
    variants: [
      { id: 'v-008-s', size: 'S', colorName: 'Clean Bone White', colorHex: '#f5f5f4', stock: 20, sku: 'CC-PLN-WHT-S' },
      { id: 'v-008-m', size: 'M', colorName: 'Clean Bone White', colorHex: '#f5f5f4', stock: 35, sku: 'CC-PLN-WHT-M' },
      { id: 'v-008-l', size: 'L', colorName: 'Clean Bone White', colorHex: '#f5f5f4', stock: 28, sku: 'CC-PLN-WHT-L' },
      { id: 'v-008-xl', size: 'XL', colorName: 'Clean Bone White', colorHex: '#f5f5f4', stock: 15, sku: 'CC-PLN-WHT-XL' },
    ],
    availableColors: [
      { name: 'Clean Bone White', hex: '#f5f5f4' },
      { name: 'Onyx Black', hex: '#18181b' },
      { name: 'Earthy Forest Green', hex: '#14532d' }
    ],
    rating: 4.8,
    reviewCount: 65,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2026-07-20',
    reviews: [
      {
        id: 'rev-09',
        userName: 'Nihal Basheer',
        userCity: 'Malappuram, Kerala',
        rating: 5,
        date: '2026-09-15',
        title: 'Ordered 3 colors immediately',
        comment: 'For ₹449, the weight and feel beat tees I bought for ₹1,200 at the mall. Essential basic.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'cc-prod-009',
    title: 'Panampilly Relaxed French Terry Street Shorts',
    subtitle: '300 GSM Heavyweight Cotton Shorts with Deep Zipper Pockets & Raw Hem',
    price: 599,
    mrp: 1199,
    gender: 'unisex',
    category: 'shorts',
    collections: ['weekend-fits', 'summer-comfort', 'under-999'],
    fitType: 'Relaxed',
    fabric: '100% Combed French Terry Cotton (300 GSM) with loopback interior',
    careInstructions: 'Machine wash cold, air dry, cool iron if desired.',
    description: 'Crafted for laid-back Kerala weekend living. Whether you are grabbing a cold brew in Panampilly Nagar or chilling by the beach, these heavyweight terry shorts provide unmatched comfort and modern streetwear length hitting right above the knee.',
    highlights: [
      '300 GSM French Terry loopback cotton',
      'Dual concealed YKK zipper pockets so phones do not slide out on bikes',
      'Chunky flat drawstrings with metallic aglets',
      'Above-knee contemporary 6-inch inseam cut'
    ],
    images: [
      HERO_BANNER_IMG,
      BAGGY_CARGOS_IMG
    ],
    variants: [
      { id: 'v-009-s', size: 'S', colorName: 'Washed Slate Grey', colorHex: '#475569', stock: 12, sku: 'CC-SHT-GRY-S' },
      { id: 'v-009-m', size: 'M', colorName: 'Washed Slate Grey', colorHex: '#475569', stock: 22, sku: 'CC-SHT-GRY-M' },
      { id: 'v-009-l', size: 'L', colorName: 'Washed Slate Grey', colorHex: '#475569', stock: 18, sku: 'CC-SHT-GRY-L' },
      { id: 'v-009-xl', size: 'XL', colorName: 'Washed Slate Grey', colorHex: '#475569', stock: 8, sku: 'CC-SHT-GRY-XL' },
    ],
    availableColors: [
      { name: 'Washed Slate Grey', hex: '#475569' },
      { name: 'Core Black', hex: '#0f172a' },
      { name: 'Soft Sand Taupe', hex: '#d6d3d1' }
    ],
    rating: 4.7,
    reviewCount: 22,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2026-08-18',
    reviews: [
      {
        id: 'rev-10',
        userName: 'Vishnu Pillai',
        userCity: 'Kollam, Kerala',
        rating: 5,
        date: '2026-09-08',
        title: 'Zipper pockets are a game changer',
        comment: 'My phone always fell out of normal shorts when riding my two-wheeler. These keep it 100% secure.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'True to size'
      }
    ]
  },
  {
    id: 'cc-prod-010',
    title: 'Monochrome Graphic Cyber Typography Tee',
    subtitle: 'Back-Print Oversized Street Tee with Malayalam Script Modern Glyph Art',
    price: 649,
    mrp: 1249,
    gender: 'unisex',
    category: 'graphic-tshirts',
    collections: ['black-white', 'new-gen-fits', 'college-wear', 'under-999'],
    fitType: 'Oversized',
    fabric: '100% Organic Breathable Cotton (240 GSM), High-Density Plastisol Print',
    careInstructions: 'Iron on reverse side, wash inside out, gentle spin cycle.',
    description: 'Fusing cyber-typography with modern Malayalam letterforms celebrating Kerala youth resilience. Big bold back typography with quiet minimalist chest logo.',
    highlights: [
      'Original Malayalam-modern typography back print',
      'Crack-resistant high density silkscreen technique',
      'Ultra-relaxed drop shoulders',
      'Heavyweight 240 GSM combed cotton'
    ],
    images: [
      OVERSIZED_TEE_IMG,
      HERO_BANNER_IMG
    ],
    variants: [
      { id: 'v-010-s', size: 'S', colorName: 'Pitch Black', colorHex: '#09090b', stock: 16, sku: 'CC-CYB-BLK-S' },
      { id: 'v-010-m', size: 'M', colorName: 'Pitch Black', colorHex: '#09090b', stock: 24, sku: 'CC-CYB-BLK-M' },
      { id: 'v-010-l', size: 'L', colorName: 'Pitch Black', colorHex: '#09090b', stock: 19, sku: 'CC-CYB-BLK-L' },
      { id: 'v-010-xl', size: 'XL', colorName: 'Pitch Black', colorHex: '#09090b', stock: 9, sku: 'CC-CYB-BLK-XL' },
    ],
    availableColors: [
      { name: 'Pitch Black', hex: '#09090b' },
      { name: 'Clean White', hex: '#ffffff' }
    ],
    rating: 4.9,
    reviewCount: 39,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true,
    createdAt: '2026-09-12',
    reviews: [
      {
        id: 'rev-11',
        userName: 'Adithya S.',
        userCity: 'Palakkad, Kerala',
        rating: 5,
        date: '2026-09-29',
        title: 'The Malayalam typography design is fire!',
        comment: 'Finally a streetwear brand celebrating Kerala identity with clean aesthetic instead of cheesy slogans.',
        verifiedPurchase: true,
        status: 'approved',
        fitFeedback: 'Perfect oversized drape'
      }
    ]
  },
  {
    id: 'cc-prod-011',
    title: 'Monsoon Proof Relaxed Hydro Hoodie',
    subtitle: 'Breathable 320 GSM French Terry Loopback Cotton with Water-Repellent Nano Coating',
    sku: 'CC-HOD-MNS-011',
    price: 1199,
    mrp: 2199,
    gender: 'unisex',
    category: 'hoodies',
    collections: ['monsoon-essentials', 'weekend-fits', 'college-wear'],
    fitType: 'Oversized',
    fabric: '320 GSM French Terry Cotton with Hydro-Glide quick dry outer coating',
    careInstructions: 'Machine wash cold inside out, tumble dry low, do not bleach.',
    description: 'Constructed for rainy Kerala evenings and air-conditioned college halls. Heavyweight comfort with a relaxed drop-shoulder silhouette and an oversized double-lined hood.',
    highlights: [
      '320 GSM heavy loopback French terry',
      'Dual hidden kangaroo security pockets',
      'Double-layered structured hood with metal eyelets',
      'Thumbhole cuffs for bike and scooter commuting'
    ],
    images: [
      OVERSIZED_TEE_IMG,
      HERO_BANNER_IMG
    ],
    modelStats: {
      height: "6'0\" (183cm)",
      wearingSize: 'L',
      fitDrape: 'Relaxed oversized street drape'
    },
    customizationSupported: true,
    variants: [
      { id: 'v-011-s', size: 'S', colorName: 'Washed Olive', colorHex: '#3f4f34', stock: 10, sku: 'CC-HOD-OLV-S' },
      { id: 'v-011-m', size: 'M', colorName: 'Washed Olive', colorHex: '#3f4f34', stock: 18, sku: 'CC-HOD-OLV-M' },
      { id: 'v-011-l', size: 'L', colorName: 'Washed Olive', colorHex: '#3f4f34', stock: 14, sku: 'CC-HOD-OLV-L' },
      { id: 'v-011-xl', size: 'XL', colorName: 'Washed Olive', colorHex: '#3f4f34', stock: 6, sku: 'CC-HOD-OLV-XL' }
    ],
    availableColors: [
      { name: 'Washed Olive', hex: '#3f4f34' },
      { name: 'Pitch Black', hex: '#09090b' }
    ],
    rating: 4.9,
    reviewCount: 28,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true,
    createdAt: '2026-09-18',
    reviews: []
  },
  {
    id: 'cc-prod-012',
    title: 'Fort Kochi 0484 Vintage Corduroy Cap',
    subtitle: 'Unstructured 6-Panel Low Profile Cap with Minimal Tonal 0484 Embroidery',
    sku: 'CC-CAP-0484-012',
    price: 399,
    mrp: 799,
    gender: 'unisex',
    category: 'caps-accessories',
    collections: ['under-499', 'weekend-fits', 'minimal-streetwear'],
    fitType: 'Regular',
    fabric: '100% Cotton 14-Wale Corduroy with antique brass buckle strap',
    careInstructions: 'Spot clean with damp cloth, air dry.',
    description: 'The staple accessory for cafe visits and beach strolls. Soft breathable vintage corduroy featuring an unstructured crown and brass strap adjuster.',
    highlights: [
      '14-wale premium soft cotton corduroy',
      'Antiqued brass buckle with tuck-in strap',
      'Moisture-wicking internal sweatband',
      'Tonal Kochi 0484 coordinate embroidery'
    ],
    images: [
      HERO_BANNER_IMG,
      OVERSIZED_TEE_IMG
    ],
    modelStats: {
      height: 'Free Size',
      wearingSize: 'M',
      fitDrape: 'Adjustable circumference 54–62cm'
    },
    customizationSupported: true,
    variants: [
      { id: 'v-012-os', size: 'M', colorName: 'Earth Tan Sand', colorHex: '#d6d3d1', stock: 35, sku: 'CC-CAP-TAN-M' }
    ],
    availableColors: [
      { name: 'Earth Tan Sand', hex: '#d6d3d1' },
      { name: 'Washed Charcoal', hex: '#27272a' }
    ],
    rating: 4.8,
    reviewCount: 19,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false,
    createdAt: '2026-08-28',
    reviews: []
  }
];

export const MONTHLY_SALES_ANALYTICS = [
  { month: 'Jan', revenue: 142000, profit: 89000, orders: 112 },
  { month: 'Feb', revenue: 168000, profit: 104000, orders: 134 },
  { month: 'Mar', revenue: 210000, profit: 132000, orders: 165 },
  { month: 'Apr', revenue: 245000, profit: 156000, orders: 190 },
  { month: 'May', revenue: 280000, profit: 178000, orders: 218 },
  { month: 'Jun', revenue: 310000, profit: 198000, orders: 240 },
  { month: 'Jul', revenue: 360000, profit: 231000, orders: 275 },
  { month: 'Aug', revenue: 495000, profit: 320000, orders: 380 }, // Onam festival surge
  { month: 'Sep', revenue: 540000, profit: 348000, orders: 410 },
  { month: 'Oct', revenue: 585000, profit: 378000, orders: 450 }
];

export const TOP_PRODUCTS_DISTRIBUTION = [
  { name: 'K-Street 0484 Heavyweight Tee', sales: 480, revenue: 335520, fill: '#B4F724' },
  { name: 'Tactical Baggy Cargo Jeans', sales: 320, revenue: 447680, fill: '#18181b' },
  { name: 'Kasavu Accent Co-Ord Set', sales: 240, revenue: 359760, fill: '#a3e635' },
  { name: 'Hydro Parachute Pants', sales: 210, revenue: 209790, fill: '#52525b' },
  { name: 'Fort Kochi Relaxed Shirt', sales: 185, revenue: 157065, fill: '#a1a1aa' },
  { name: 'Others & Accessories', sales: 160, revenue: 99800, fill: '#d4d4d8' }
];

export const CATEGORY_REVENUE_DATA = [
  { category: 'Oversized Tees', revenue: 420000, units: 600 },
  { category: 'Pants & Cargos', revenue: 390000, units: 310 },
  { category: 'Co-Ord Sets', revenue: 285000, units: 190 },
  { category: 'Coastal Shirts', revenue: 195000, units: 230 },
  { category: 'Hoodies', revenue: 165000, units: 140 },
  { category: 'Caps & Accessories', revenue: 78000, units: 195 }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'KERALA20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 999,
    maxDiscount: 400,
    description: 'Flat 20% off on all Kerala trending orders above ₹999',
    validUntil: '2026-12-31',
    active: true
  },
  {
    code: 'CLOTH10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 200,
    description: '10% instant off on all orders above ₹499',
    validUntil: '2026-12-31',
    active: true
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 60,
    minOrderValue: 0,
    description: 'Free Express Kerala shipping on any order value',
    validUntil: '2026-12-31',
    active: true
  },
  {
    code: 'COLLEGE15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 799,
    maxDiscount: 300,
    description: '15% student special discount on orders above ₹799',
    validUntil: '2026-12-31',
    active: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-84920',
    orderNumber: 'CC-KER-84920',
    createdAt: '2026-10-09T14:32:00Z',
    userId: 'user-001',
    customerName: 'Anandhu Mohan',
    customerEmail: 'anandhu.mohan@example.com',
    customerPhone: '+91 98471 23456',
    shippingAddress: {
      id: 'addr-01',
      fullName: 'Anandhu Mohan',
      phone: '+91 98471 23456',
      street: 'Flat 4B, Skyline Ivy League',
      locality: 'Kakkanad near Infopark',
      city: 'Kochi',
      district: 'Ernakulam',
      state: 'Kerala',
      pincode: '682024',
      addressType: 'home',
      isDefault: true
    },
    items: [
      {
        productId: 'cc-prod-001',
        title: 'K-Street 0484 Heavyweight Oversized Tee',
        image: OVERSIZED_TEE_IMG,
        size: 'L',
        color: 'Washed Charcoal',
        quantity: 1,
        unitPrice: 699,
        subtotal: 699
      },
      {
        productId: 'cc-prod-002',
        title: 'Tactical Utility Baggy Cargo Jeans',
        image: BAGGY_CARGOS_IMG,
        size: 'M',
        color: 'Deep Vintage Indigo',
        quantity: 1,
        unitPrice: 1399,
        subtotal: 1399
      }
    ],
    itemTotal: 2098,
    discount: 400,
    couponCode: 'KERALA20',
    deliveryFee: 0,
    totalAmount: 1698,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    courierName: 'DTDC Kerala Express',
    trackingNumber: 'DTDC-KER-78392110',
    trackingUrl: 'https://www.dtdc.in/tracking/DTDC-KER-78392110',
    estimatedDeliveryDate: '2026-10-12',
    invoiceNumber: 'INV-2026-KL-00891',
    timeline: [
      { status: 'Order Placed', timestamp: '2026-10-09 14:32', description: 'Order successfully placed via ClothCity Web' },
      { status: 'Payment Confirmed', timestamp: '2026-10-09 14:33', description: 'UPI payment verified (Razorpay ID: pay_Kl9921b)' },
      { status: 'Processing', timestamp: '2026-10-09 16:00', description: 'Items verified & reserved from Kochi central fulfillment warehouse' },
      { status: 'Packed', timestamp: '2026-10-10 09:30', description: 'Packaged in eco-friendly water-resistant Kerala parcel sleeve' },
      { status: 'Shipped', timestamp: '2026-10-10 18:20', description: 'Dispatched via DTDC Express Hub (Aluva / Kochi)' }
    ]
  }
];
