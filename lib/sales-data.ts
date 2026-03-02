// Generated realistic 6-month catering sales data (Oct 2025 – Mar 2026)
// Includes seasonality, complementary product correlations, and realistic margins

export interface MonthlySalesRecord {
  productId: string;
  month: string; // YYYY-MM
  unitsSold: number;       // units sold (trays, pans, dozens, each, containers, persons)
  revenue: number;         // total revenue
  cogs: number;            // cost of goods sold
  grossProfit: number;     // revenue - cogs
  marginPct: number;       // gross margin %
  avgOrderSize: number;    // average headcount per order containing this item
  ordersContaining: number; // number of orders that included this item
}

export interface ProductSalesProfile {
  productId: string;
  title: string;
  category: 'breakfast' | 'lunch' | 'dessert' | 'beverage' | 'snack';
  subcategory: string;
  costPerUnit: number;       // average COGS per selling unit
  avgSellingPrice: number;   // average revenue per selling unit
  baseMarginPct: number;     // target gross margin %
}

// Cost profiles — realistic food cost ratios by product type
const PRODUCT_PROFILES: ProductSalesProfile[] = [
  // BREAKFAST - SUNRISE STAPLES
  { productId: 'morning-mingle-tray', title: 'Morning Mingle Tray', category: 'breakfast', subcategory: 'pastries', costPerUnit: 52, avgSellingPrice: 171, baseMarginPct: 69.6 },
  { productId: 'parfait-bar', title: 'Build-Your-Own Parfait Bar', category: 'breakfast', subcategory: 'pastries', costPerUnit: 58, avgSellingPrice: 171, baseMarginPct: 66.1 },
  { productId: 'fresh-fruit-tray', title: 'Fresh Fruit Tray', category: 'breakfast', subcategory: 'fruit', costPerUnit: 62, avgSellingPrice: 171, baseMarginPct: 63.7 },
  { productId: 'fresh-fruit-cups', title: 'Fresh Fruit Cups', category: 'breakfast', subcategory: 'fruit', costPerUnit: 2.80, avgSellingPrice: 7, baseMarginPct: 60.0 },
  { productId: 'whole-fruit', title: 'Whole Fruit', category: 'breakfast', subcategory: 'fruit', costPerUnit: 8.40, avgSellingPrice: 24, baseMarginPct: 65.0 },

  // BREAKFAST - SOULFUL STARTS
  { productId: 'scrambled-eggs', title: 'Scrambled Eggs', category: 'breakfast', subcategory: 'hot-entree', costPerUnit: 28, avgSellingPrice: 103, baseMarginPct: 72.8 },
  { productId: 'breakfast-casserole', title: 'Breakfast Casserole Bake', category: 'breakfast', subcategory: 'hot-entree', costPerUnit: 42, avgSellingPrice: 154, baseMarginPct: 72.7 },
  { productId: 'breakfast-potatoes', title: 'Home-Style Breakfast Potatoes', category: 'breakfast', subcategory: 'side', costPerUnit: 22, avgSellingPrice: 103, baseMarginPct: 78.6 },
  { productId: 'cajun-hash', title: 'Cajun Hash', category: 'breakfast', subcategory: 'side', costPerUnit: 24, avgSellingPrice: 103, baseMarginPct: 76.7 },
  { productId: 'buttermilk-biscuits', title: 'Buttermilk Biscuit Platter', category: 'breakfast', subcategory: 'bread', costPerUnit: 11, avgSellingPrice: 37, baseMarginPct: 70.3 },
  { productId: 'biscuits-gravy', title: 'Biscuits & Gravy', category: 'breakfast', subcategory: 'hot-entree', costPerUnit: 24, avgSellingPrice: 103, baseMarginPct: 76.7 },

  // BREAKFAST - PROTEINS
  { productId: 'turkey-sausage-links', title: 'Turkey Sausage Links', category: 'breakfast', subcategory: 'protein', costPerUnit: 18, avgSellingPrice: 86, baseMarginPct: 79.1 },
  { productId: 'chicken-sausage-patties', title: 'Chicken Sausage Patties', category: 'breakfast', subcategory: 'protein', costPerUnit: 15, avgSellingPrice: 68, baseMarginPct: 77.9 },
  { productId: 'turkey-bacon', title: 'Turkey Bacon', category: 'breakfast', subcategory: 'protein', costPerUnit: 16, avgSellingPrice: 68, baseMarginPct: 76.5 },
  { productId: 'pork-sausage', title: 'Pork Sausage Patties or Links', category: 'breakfast', subcategory: 'protein', costPerUnit: 13, avgSellingPrice: 68, baseMarginPct: 80.9 },
  { productId: 'pork-bacon', title: 'Pork Bacon', category: 'breakfast', subcategory: 'protein', costPerUnit: 17, avgSellingPrice: 68, baseMarginPct: 75.0 },

  // BREAKFAST - SOUTHERN FAVORITES
  { productId: 'southern-grits', title: 'Southern Grits', category: 'breakfast', subcategory: 'southern', costPerUnit: 12, avgSellingPrice: 68, baseMarginPct: 82.4 },
  { productId: 'shrimp-grits', title: 'Shrimp & Grits', category: 'breakfast', subcategory: 'southern', costPerUnit: 38, avgSellingPrice: 120, baseMarginPct: 68.3 },
  { productId: 'catfish-grits', title: 'Fried Catfish Fillets & Grits', category: 'breakfast', subcategory: 'southern', costPerUnit: 52, avgSellingPrice: 154, baseMarginPct: 66.2 },

  // BREAKFAST - HANDHELDS
  { productId: 'biscuit-sandwiches', title: 'Buttermilk Biscuit Sandwiches', category: 'breakfast', subcategory: 'handheld', costPerUnit: 22, avgSellingPrice: 62, baseMarginPct: 64.5 },
  { productId: 'breakfast-wraps', title: 'Breakfast Wraps', category: 'breakfast', subcategory: 'handheld', costPerUnit: 21, avgSellingPrice: 62, baseMarginPct: 66.1 },

  // BREAKFAST - VEGAN
  { productId: 'vegan-scramble', title: 'Vegan Scramble', category: 'breakfast', subcategory: 'vegan', costPerUnit: 32, avgSellingPrice: 120, baseMarginPct: 73.3 },
  { productId: 'vegan-sunrise-wrap', title: 'Vegan Sunrise Wrap', category: 'breakfast', subcategory: 'vegan', costPerUnit: 24, avgSellingPrice: 62, baseMarginPct: 61.3 },
  { productId: 'vegan-fruit-parfaits', title: 'Vegan Fruit Parfaits', category: 'breakfast', subcategory: 'vegan', costPerUnit: 2.10, avgSellingPrice: 5, baseMarginPct: 58.0 },

  // LUNCH - SALADS
  { productId: 'signature-chopped-salad', title: 'Signature Chopped Salad', category: 'lunch', subcategory: 'salad', costPerUnit: 32, avgSellingPrice: 120, baseMarginPct: 73.3 },
  { productId: 'caesar-salad', title: 'Classic Caesar Salad', category: 'lunch', subcategory: 'salad', costPerUnit: 24, avgSellingPrice: 103, baseMarginPct: 76.7 },
  { productId: 'southwest-salad', title: 'Southwest Salad', category: 'lunch', subcategory: 'salad', costPerUnit: 34, avgSellingPrice: 120, baseMarginPct: 71.7 },
  { productId: 'garden-salad', title: 'Traditional Garden Salad', category: 'lunch', subcategory: 'salad', costPerUnit: 22, avgSellingPrice: 103, baseMarginPct: 78.6 },

  // LUNCH - PROTEIN ADD-ONS
  { productId: 'diced-grilled-chicken', title: 'Diced Grilled Chicken', category: 'lunch', subcategory: 'add-on', costPerUnit: 12, avgSellingPrice: 51, baseMarginPct: 76.5 },
  { productId: 'herb-salmon', title: 'Herb-Marinated Salmon', category: 'lunch', subcategory: 'add-on', costPerUnit: 28, avgSellingPrice: 86, baseMarginPct: 67.4 },
  { productId: 'grilled-flank-steak', title: 'Grilled Flank Steak', category: 'lunch', subcategory: 'add-on', costPerUnit: 26, avgSellingPrice: 75, baseMarginPct: 65.3 },

  // LUNCH - PACKAGES
  { productId: 'signature-sandwich-package', title: 'Signature Sandwich Package', category: 'lunch', subcategory: 'package', costPerUnit: 8.20, avgSellingPrice: 20, baseMarginPct: 59.0 },
  { productId: 'plant-based-lunch-package', title: 'Plant-Based Lunch Package', category: 'lunch', subcategory: 'package', costPerUnit: 9.50, avgSellingPrice: 22, baseMarginPct: 56.8 },

  // LUNCH - FLAVOR BARS
  { productId: 'southwest-grain-bowl-bar', title: 'Southwest Grain Bowl Bar', category: 'lunch', subcategory: 'interactive', costPerUnit: 82, avgSellingPrice: 291, baseMarginPct: 71.8 },
  { productId: 'loaded-mashed-potato-bar', title: 'Loaded Mashed Potato Bar', category: 'lunch', subcategory: 'interactive', costPerUnit: 72, avgSellingPrice: 257, baseMarginPct: 72.0 },

  // LUNCH - ENTREES
  { productId: 'garlic-herb-chicken', title: 'Garlic Herb Chicken Breast', category: 'lunch', subcategory: 'entree', costPerUnit: 52, avgSellingPrice: 152, baseMarginPct: 65.8 },
  { productId: 'smothered-chicken', title: 'Smothered Chicken', category: 'lunch', subcategory: 'entree', costPerUnit: 48, avgSellingPrice: 152, baseMarginPct: 68.4 },
  { productId: 'jerk-chicken', title: 'Jerk Chicken', category: 'lunch', subcategory: 'entree', costPerUnit: 54, avgSellingPrice: 162, baseMarginPct: 66.7 },
  { productId: 'fried-chicken', title: 'Fried Chicken', category: 'lunch', subcategory: 'entree', costPerUnit: 46, avgSellingPrice: 152, baseMarginPct: 69.7 },
  { productId: 'fried-catfish', title: 'Fried Catfish Fillets', category: 'lunch', subcategory: 'entree', costPerUnit: 56, avgSellingPrice: 162, baseMarginPct: 65.4 },
  { productId: 'roasted-turkey', title: 'Roasted Turkey with Gravy', category: 'lunch', subcategory: 'entree', costPerUnit: 62, avgSellingPrice: 178, baseMarginPct: 65.2 },
  { productId: 'herb-crusted-salmon', title: 'Herb-Crusted Salmon', category: 'lunch', subcategory: 'entree', costPerUnit: 68, avgSellingPrice: 178, baseMarginPct: 61.8 },
  { productId: 'beef-brisket', title: 'Slow-Smoked Beef Brisket', category: 'lunch', subcategory: 'entree', costPerUnit: 82, avgSellingPrice: 238, baseMarginPct: 65.5 },

  // LUNCH - SIDES (POTATOES)
  { productId: 'garlic-mashed-potatoes', title: 'Garlic Mashed Potatoes', category: 'lunch', subcategory: 'side-potato', costPerUnit: 22, avgSellingPrice: 89, baseMarginPct: 75.3 },
  { productId: 'roasted-red-potatoes', title: 'Roasted Red Potatoes', category: 'lunch', subcategory: 'side-potato', costPerUnit: 20, avgSellingPrice: 89, baseMarginPct: 77.5 },
  { productId: 'potato-wedges', title: 'Potato Wedges', category: 'lunch', subcategory: 'side-potato', costPerUnit: 18, avgSellingPrice: 89, baseMarginPct: 79.8 },

  // LUNCH - SIDES (PASTA & GRAINS)
  { productId: 'mac-and-cheese', title: 'Macaroni & Cheese', category: 'lunch', subcategory: 'side-pasta', costPerUnit: 22, avgSellingPrice: 89, baseMarginPct: 75.3 },
  { productId: 'spaghetti-meat-sauce', title: 'Spaghetti with Meat Sauce', category: 'lunch', subcategory: 'side-pasta', costPerUnit: 20, avgSellingPrice: 77, baseMarginPct: 74.0 },
  { productId: 'fettuccine-alfredo', title: 'Fettuccine Alfredo', category: 'lunch', subcategory: 'side-pasta', costPerUnit: 24, avgSellingPrice: 89, baseMarginPct: 73.0 },
  { productId: 'rice-pilaf', title: 'Rice Pilaf', category: 'lunch', subcategory: 'side-grain', costPerUnit: 14, avgSellingPrice: 77, baseMarginPct: 81.8 },
  { productId: 'red-beans-rice', title: 'Red Beans & Rice', category: 'lunch', subcategory: 'side-grain', costPerUnit: 16, avgSellingPrice: 77, baseMarginPct: 79.2 },

  // LUNCH - SIDES (VEGETABLES)
  { productId: 'southern-cabbage', title: 'Southern-Style Cabbage', category: 'lunch', subcategory: 'side-veg', costPerUnit: 18, avgSellingPrice: 89, baseMarginPct: 79.8 },
  { productId: 'collard-greens', title: 'Collard Greens', category: 'lunch', subcategory: 'side-veg', costPerUnit: 20, avgSellingPrice: 89, baseMarginPct: 77.5 },
  { productId: 'southern-green-beans', title: 'Southern Green Beans', category: 'lunch', subcategory: 'side-veg', costPerUnit: 18, avgSellingPrice: 89, baseMarginPct: 79.8 },
  { productId: 'vegetable-medley', title: 'Vegetable Medley', category: 'lunch', subcategory: 'side-veg', costPerUnit: 16, avgSellingPrice: 64, baseMarginPct: 75.0 },
  { productId: 'roasted-asparagus', title: 'Roasted Asparagus', category: 'lunch', subcategory: 'side-veg', costPerUnit: 32, avgSellingPrice: 89, baseMarginPct: 64.0 },
  { productId: 'sweet-potatoes', title: 'Sweet Potatoes', category: 'lunch', subcategory: 'side-veg', costPerUnit: 22, avgSellingPrice: 89, baseMarginPct: 75.3 },
  { productId: 'creamed-corn', title: 'Creamed Corn', category: 'lunch', subcategory: 'side-veg', costPerUnit: 16, avgSellingPrice: 77, baseMarginPct: 79.2 },

  // LUNCH - SIDES (BREADS)
  { productId: 'garlic-bread', title: 'Garlic Bread', category: 'lunch', subcategory: 'side-bread', costPerUnit: 9, avgSellingPrice: 31, baseMarginPct: 71.0 },
  { productId: 'cornbread', title: 'Cornbread', category: 'lunch', subcategory: 'side-bread', costPerUnit: 11, avgSellingPrice: 38, baseMarginPct: 71.1 },
  { productId: 'garlic-knots', title: 'Garlic Knots', category: 'lunch', subcategory: 'side-bread', costPerUnit: 10, avgSellingPrice: 38, baseMarginPct: 73.7 },

  // LUNCH - SIDES (COLD)
  { productId: 'coleslaw', title: 'Coleslaw', category: 'lunch', subcategory: 'side-cold', costPerUnit: 18, avgSellingPrice: 89, baseMarginPct: 79.8 },
  { productId: 'potato-salad', title: 'Potato Salad', category: 'lunch', subcategory: 'side-cold', costPerUnit: 22, avgSellingPrice: 89, baseMarginPct: 75.3 },
  { productId: 'cold-pasta-salad', title: 'Cold Pasta Salad', category: 'lunch', subcategory: 'side-cold', costPerUnit: 20, avgSellingPrice: 89, baseMarginPct: 77.5 },
  { productId: 'pesto-pasta-salad', title: 'Cold Pesto Pasta Salad', category: 'lunch', subcategory: 'side-cold', costPerUnit: 32, avgSellingPrice: 114, baseMarginPct: 71.9 },

  // DESSERTS
  { productId: 'cake-slices', title: 'Cake Slices', category: 'dessert', subcategory: 'bakery', costPerUnit: 3.60, avgSellingPrice: 9, baseMarginPct: 60.0 },
  { productId: 'red-velvet-cake', title: 'Red Velvet Cake Slices', category: 'dessert', subcategory: 'bakery', costPerUnit: 3.80, avgSellingPrice: 9, baseMarginPct: 57.8 },
  { productId: 'cheesecake-slices', title: 'Cheesecake Slices', category: 'dessert', subcategory: 'bakery', costPerUnit: 5.40, avgSellingPrice: 12, baseMarginPct: 55.0 },
  { productId: 'strawberry-cheesecake', title: 'Strawberry Cheesecake Slices', category: 'dessert', subcategory: 'bakery', costPerUnit: 5.80, avgSellingPrice: 12, baseMarginPct: 51.7 },
  { productId: 'cookies', title: 'Chocolate Chip Cookies', category: 'dessert', subcategory: 'bakery', costPerUnit: 10.50, avgSellingPrice: 30, baseMarginPct: 65.0 },

  // SNACKS
  { productId: 'snack-pack-standard', title: 'Snack Pack (Standard)', category: 'snack', subcategory: 'snack', costPerUnit: 3.20, avgSellingPrice: 8, baseMarginPct: 60.0 },
  { productId: 'snack-pack-vegan', title: 'Snack Pack (Vegan)', category: 'snack', subcategory: 'snack', costPerUnit: 4.50, avgSellingPrice: 10, baseMarginPct: 55.0 },
  { productId: 'assorted-chips', title: 'Assorted Chips', category: 'snack', subcategory: 'snack', costPerUnit: 0.80, avgSellingPrice: 2, baseMarginPct: 60.0 },
  { productId: 'miss-vickies-chips', title: "Miss Vickie's Chips", category: 'snack', subcategory: 'snack', costPerUnit: 0.90, avgSellingPrice: 2, baseMarginPct: 55.0 },

  // BEVERAGES
  { productId: 'fresh-brewed-coffee', title: 'Fresh Brewed Coffee', category: 'beverage', subcategory: 'hot-bev', costPerUnit: 6.50, avgSellingPrice: 25, baseMarginPct: 74.0 },
  { productId: 'hot-tea', title: 'Hot Tea', category: 'beverage', subcategory: 'hot-bev', costPerUnit: 5.50, avgSellingPrice: 22, baseMarginPct: 75.0 },
  { productId: 'hot-chocolate', title: 'Hot Chocolate', category: 'beverage', subcategory: 'hot-bev', costPerUnit: 7.20, avgSellingPrice: 24, baseMarginPct: 70.0 },
  { productId: 'cold-brew-coffee', title: 'Cold Brew Coffee', category: 'beverage', subcategory: 'cold-bev', costPerUnit: 1.20, avgSellingPrice: 3, baseMarginPct: 60.0 },
  { productId: 'bottled-juices', title: 'Bottled Juices', category: 'beverage', subcategory: 'cold-bev', costPerUnit: 1.10, avgSellingPrice: 3, baseMarginPct: 63.3 },
  { productId: 'coconut-water', title: 'Coconut Water', category: 'beverage', subcategory: 'cold-bev', costPerUnit: 1.30, avgSellingPrice: 3, baseMarginPct: 56.7 },
  { productId: 'bottled-water', title: 'Bottled Water', category: 'beverage', subcategory: 'cold-bev', costPerUnit: 0.40, avgSellingPrice: 2, baseMarginPct: 80.0 },
  { productId: 'assorted-sodas', title: 'Assorted Sodas', category: 'beverage', subcategory: 'cold-bev', costPerUnit: 0.55, avgSellingPrice: 2, baseMarginPct: 72.5 },
  { productId: 'sparkling-water', title: 'San Pellegrino Sparkling Water', category: 'beverage', subcategory: 'cold-bev', costPerUnit: 0.70, avgSellingPrice: 2, baseMarginPct: 65.0 },
  { productId: 'iced-tea', title: 'Arizona Iced Teas', category: 'beverage', subcategory: 'cold-bev', costPerUnit: 0.60, avgSellingPrice: 2, baseMarginPct: 70.0 },
  { productId: 'celsius-energy', title: 'Celsius Energy Drink', category: 'beverage', subcategory: 'cold-bev', costPerUnit: 1.40, avgSellingPrice: 3, baseMarginPct: 53.3 },
  { productId: 'red-bull', title: 'Red Bull', category: 'beverage', subcategory: 'cold-bev', costPerUnit: 1.60, avgSellingPrice: 3, baseMarginPct: 46.7 },
];

// Seasonality multipliers by month (Oct 2025 – Mar 2026)
// Oct: corporate Q4 push, Nov: Thanksgiving spike, Dec: holiday parties peak,
// Jan: New Year slowdown, Feb: Valentine's + slow recovery, Mar: spring ramp-up
const SEASONALITY: Record<string, Record<string, number>> = {
  // Category-level seasonality
  breakfast: {
    '2025-10': 1.05, '2025-11': 1.15, '2025-12': 1.35, '2026-01': 0.70, '2026-02': 0.82, '2026-03': 0.95,
  },
  lunch: {
    '2025-10': 1.10, '2025-11': 1.25, '2025-12': 1.45, '2026-01': 0.65, '2026-02': 0.80, '2026-03': 1.00,
  },
  dessert: {
    '2025-10': 0.95, '2025-11': 1.20, '2025-12': 1.55, '2026-01': 0.60, '2026-02': 1.10, '2026-03': 0.90,
  },
  beverage: {
    '2025-10': 1.00, '2025-11': 1.10, '2025-12': 1.30, '2026-01': 0.70, '2026-02': 0.78, '2026-03': 0.92,
  },
  snack: {
    '2025-10': 1.00, '2025-11': 1.15, '2025-12': 1.40, '2026-01': 0.65, '2026-02': 0.75, '2026-03': 0.88,
  },
};

// Product-specific seasonality overrides (stacks with category seasonality)
const PRODUCT_SEASONALITY: Record<string, Record<string, number>> = {
  // Turkey spikes hard at Thanksgiving
  'roasted-turkey':    { '2025-11': 1.80, '2025-12': 1.40 },
  // Sweet potatoes are Thanksgiving/holiday staples
  'sweet-potatoes':    { '2025-11': 1.60, '2025-12': 1.50 },
  // Collard greens spike for holidays
  'collard-greens':    { '2025-11': 1.50, '2025-12': 1.45 },
  // Mac & cheese — holiday comfort
  'mac-and-cheese':    { '2025-11': 1.35, '2025-12': 1.40 },
  // Brisket — new item, ramps up as word spreads
  'beef-brisket':      { '2025-10': 0.40, '2025-11': 0.65, '2025-12': 0.85, '2026-01': 0.90, '2026-02': 1.10, '2026-03': 1.40 },
  // Cornbread follows brisket correlation
  'cornbread':         { '2025-10': 0.80, '2025-11': 1.20, '2025-12': 1.35, '2026-01': 0.90, '2026-02': 1.10, '2026-03': 1.30 },
  // Hot chocolate peaks in winter
  'hot-chocolate':     { '2025-11': 1.30, '2025-12': 1.70, '2026-01': 1.40, '2026-02': 1.20 },
  // Coffee steady but peaks for holiday mornings
  'fresh-brewed-coffee': { '2025-12': 1.25 },
  // Red velvet cake peaks in Feb (Valentine's)
  'red-velvet-cake':   { '2026-02': 1.80 },
  'strawberry-cheesecake': { '2026-02': 1.60 },
  // Fried chicken is consistently popular, slight holiday spike
  'fried-chicken':     { '2025-11': 1.20, '2025-12': 1.25 },
  // Sandwich packages are steady corporate — dip less in Jan
  'signature-sandwich-package': { '2026-01': 0.80 },
  // Shrimp & grits — strong in cooler months
  'shrimp-grits':      { '2025-10': 1.15, '2025-11': 1.25, '2025-12': 1.30, '2026-03': 0.90 },
  // Vegan items ramp up in January (New Year resolutions)
  'vegan-scramble':    { '2026-01': 1.50, '2026-02': 1.30 },
  'vegan-sunrise-wrap': { '2026-01': 1.45, '2026-02': 1.25 },
  'plant-based-lunch-package': { '2026-01': 1.55, '2026-02': 1.30 },
  // Salads pick up in spring
  'signature-chopped-salad': { '2026-02': 1.10, '2026-03': 1.30 },
  'southwest-salad':   { '2026-02': 1.10, '2026-03': 1.25 },
};

// Base monthly volume (units per month at seasonality = 1.0)
// Reflects popularity — popular items have higher base volumes
const BASE_VOLUMES: Record<string, number> = {
  // High-volume items (popular, staple orders)
  'morning-mingle-tray': 42, 'breakfast-casserole': 38, 'scrambled-eggs': 35,
  'biscuit-sandwiches': 48, 'breakfast-wraps': 32, 'shrimp-grits': 28,
  'fresh-brewed-coffee': 85, 'bottled-water': 320,
  'signature-sandwich-package': 65, 'fried-chicken': 44, 'garlic-herb-chicken': 40,
  'mac-and-cheese': 52, 'collard-greens': 38, 'garlic-mashed-potatoes': 36,
  'cookies': 42, 'cake-slices': 55, 'assorted-chips': 180,
  'assorted-sodas': 240, 'snack-pack-standard': 48,

  // Medium-volume items
  'parfait-bar': 22, 'fresh-fruit-tray': 28, 'fresh-fruit-cups': 85,
  'whole-fruit': 20, 'breakfast-potatoes': 30, 'cajun-hash': 18,
  'buttermilk-biscuits': 24, 'biscuits-gravy': 22, 'turkey-sausage-links': 26,
  'chicken-sausage-patties': 18, 'turkey-bacon': 22, 'pork-sausage': 20,
  'pork-bacon': 24, 'southern-grits': 20, 'catfish-grits': 12,
  'caesar-salad': 28, 'garden-salad': 22, 'signature-chopped-salad': 26,
  'southwest-salad': 20, 'diced-grilled-chicken': 24,
  'southwest-grain-bowl-bar': 16, 'loaded-mashed-potato-bar': 14,
  'smothered-chicken': 22, 'jerk-chicken': 18, 'fried-catfish': 16,
  'roasted-turkey': 18, 'herb-crusted-salmon': 14,
  'roasted-red-potatoes': 22, 'potato-wedges': 18,
  'spaghetti-meat-sauce': 16, 'fettuccine-alfredo': 18, 'rice-pilaf': 20,
  'red-beans-rice': 22, 'southern-cabbage': 16, 'southern-green-beans': 20,
  'vegetable-medley': 18, 'sweet-potatoes': 22, 'creamed-corn': 18,
  'garlic-bread': 28, 'cornbread': 24, 'garlic-knots': 16,
  'coleslaw': 20, 'potato-salad': 22, 'cold-pasta-salad': 16,
  'red-velvet-cake': 38, 'cheesecake-slices': 28, 'strawberry-cheesecake': 22,
  'cold-brew-coffee': 65, 'bottled-juices': 72, 'hot-tea': 30,
  'iced-tea': 85, 'sparkling-water': 60, 'miss-vickies-chips': 90,

  // Lower-volume items (niche, premium, or newer)
  'beef-brisket': 18, 'herb-salmon': 10, 'grilled-flank-steak': 12,
  'plant-based-lunch-package': 12, 'vegan-scramble': 10, 'vegan-sunrise-wrap': 12,
  'vegan-fruit-parfaits': 35, 'roasted-asparagus': 10, 'pesto-pasta-salad': 10,
  'snack-pack-vegan': 14, 'coconut-water': 28, 'hot-chocolate': 18,
  'celsius-energy': 42, 'red-bull': 38,
};

// Complementary product groups — when one sells well, correlated items get a boost
const COMPLEMENTARY_GROUPS = [
  // BBQ spread
  { anchor: 'beef-brisket', companions: ['mac-and-cheese', 'cornbread', 'collard-greens', 'coleslaw', 'sweet-potatoes'], boostFactor: 0.15 },
  // Southern breakfast
  { anchor: 'shrimp-grits', companions: ['buttermilk-biscuits', 'pork-bacon', 'scrambled-eggs'], boostFactor: 0.10 },
  // Classic lunch
  { anchor: 'fried-chicken', companions: ['mac-and-cheese', 'collard-greens', 'cornbread', 'red-beans-rice'], boostFactor: 0.12 },
  // Healthy lunch
  { anchor: 'signature-chopped-salad', companions: ['diced-grilled-chicken', 'herb-salmon', 'bottled-water', 'sparkling-water'], boostFactor: 0.10 },
  // Turkey dinner
  { anchor: 'roasted-turkey', companions: ['garlic-mashed-potatoes', 'southern-green-beans', 'sweet-potatoes', 'cornbread'], boostFactor: 0.18 },
  // Sandwich lunch
  { anchor: 'signature-sandwich-package', companions: ['assorted-chips', 'miss-vickies-chips', 'cookies', 'assorted-sodas', 'bottled-water'], boostFactor: 0.10 },
  // Pasta night
  { anchor: 'fettuccine-alfredo', companions: ['garlic-bread', 'garlic-knots', 'caesar-salad'], boostFactor: 0.12 },
  // Breakfast meeting
  { anchor: 'morning-mingle-tray', companions: ['fresh-brewed-coffee', 'bottled-juices', 'fresh-fruit-cups'], boostFactor: 0.10 },
];

const MONTHS = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateSalesData(): MonthlySalesRecord[] {
  const records: MonthlySalesRecord[] = [];
  const rand = seededRandom(42);

  for (const profile of PRODUCT_PROFILES) {
    const baseVol = BASE_VOLUMES[profile.productId] || 15;

    for (const month of MONTHS) {
      // Category seasonality
      const catSeason = SEASONALITY[profile.category]?.[month] ?? 1.0;

      // Product-specific seasonality override (multiplied on top)
      const prodSeason = PRODUCT_SEASONALITY[profile.productId]?.[month] ?? 1.0;

      // Complementary boost — check if any anchor in a group has high seasonality this month
      let compBoost = 0;
      for (const group of COMPLEMENTARY_GROUPS) {
        if (group.companions.includes(profile.productId)) {
          const anchorProdSeason = PRODUCT_SEASONALITY[group.anchor]?.[month] ?? 1.0;
          const anchorCatProfile = PRODUCT_PROFILES.find(p => p.productId === group.anchor);
          const anchorCatSeason = anchorCatProfile
            ? (SEASONALITY[anchorCatProfile.category]?.[month] ?? 1.0)
            : 1.0;
          const anchorTotal = anchorCatSeason * anchorProdSeason;
          if (anchorTotal > 1.0) {
            compBoost += (anchorTotal - 1.0) * group.boostFactor;
          }
        }
      }

      // Random noise: ±15%
      const noise = 0.85 + rand() * 0.30;

      const effectiveMultiplier = catSeason * prodSeason * (1 + compBoost) * noise;
      const unitsSold = Math.max(1, Math.round(baseVol * effectiveMultiplier));

      // Revenue with slight price variance (±5%)
      const priceVariance = 0.95 + rand() * 0.10;
      const revenue = Math.round(unitsSold * profile.avgSellingPrice * priceVariance * 100) / 100;

      // COGS with slight cost variance (±8%) — ingredient cost fluctuations
      const costVariance = 0.92 + rand() * 0.16;
      const cogs = Math.round(unitsSold * profile.costPerUnit * costVariance * 100) / 100;

      const grossProfit = Math.round((revenue - cogs) * 100) / 100;
      const marginPct = Math.round((grossProfit / revenue) * 1000) / 10;

      // Avg order size (headcount) varies by product type
      const baseOrderSize = profile.subcategory === 'package' ? 28
        : profile.subcategory === 'interactive' ? 35
        : profile.category === 'beverage' ? 30
        : profile.category === 'snack' ? 25
        : 22;
      const orderSizeNoise = 0.85 + rand() * 0.30;
      const avgOrderSize = Math.round(baseOrderSize * orderSizeNoise);

      // Orders containing this product
      const ordersContaining = Math.max(1, Math.round(unitsSold * (0.7 + rand() * 0.5)));

      records.push({
        productId: profile.productId,
        month,
        unitsSold,
        revenue,
        cogs,
        grossProfit,
        marginPct,
        avgOrderSize,
        ordersContaining,
      });
    }
  }

  return records;
}

// Pre-generated data
export const SALES_DATA: MonthlySalesRecord[] = generateSalesData();

// ==================== HELPER FUNCTIONS ====================

export function getSalesForProduct(productId: string): MonthlySalesRecord[] {
  return SALES_DATA.filter(r => r.productId === productId);
}

export function getSalesForMonth(month: string): MonthlySalesRecord[] {
  return SALES_DATA.filter(r => r.month === month);
}

export function getTopProductsByRevenue(month?: string, limit = 10): MonthlySalesRecord[] {
  const data = month ? getSalesForMonth(month) : SALES_DATA;

  if (month) {
    return [...data].sort((a, b) => b.revenue - a.revenue).slice(0, limit);
  }

  // Aggregate across all months
  const agg = new Map<string, { revenue: number; profit: number; units: number }>();
  for (const r of data) {
    const existing = agg.get(r.productId) || { revenue: 0, profit: 0, units: 0 };
    existing.revenue += r.revenue;
    existing.profit += r.grossProfit;
    existing.units += r.unitsSold;
    agg.set(r.productId, existing);
  }

  return Array.from(agg.entries())
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, limit)
    .map(([productId, stats]) => ({
      productId,
      month: 'all',
      unitsSold: stats.units,
      revenue: Math.round(stats.revenue * 100) / 100,
      cogs: Math.round((stats.revenue - stats.profit) * 100) / 100,
      grossProfit: Math.round(stats.profit * 100) / 100,
      marginPct: Math.round((stats.profit / stats.revenue) * 1000) / 10,
      avgOrderSize: 0,
      ordersContaining: 0,
    }));
}

export function getTopProductsByMargin(month?: string, limit = 10): MonthlySalesRecord[] {
  const data = month ? getSalesForMonth(month) : SALES_DATA;
  return [...data].sort((a, b) => b.marginPct - a.marginPct).slice(0, limit);
}

export function getMonthlySummary(): { month: string; totalRevenue: number; totalCogs: number; totalProfit: number; marginPct: number; totalOrders: number }[] {
  return MONTHS.map(month => {
    const monthData = getSalesForMonth(month);
    const totalRevenue = monthData.reduce((sum, r) => sum + r.revenue, 0);
    const totalCogs = monthData.reduce((sum, r) => sum + r.cogs, 0);
    const totalProfit = totalRevenue - totalCogs;
    const totalOrders = monthData.reduce((sum, r) => sum + r.ordersContaining, 0);
    return {
      month,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalCogs: Math.round(totalCogs * 100) / 100,
      totalProfit: Math.round(totalProfit * 100) / 100,
      marginPct: Math.round((totalProfit / totalRevenue) * 1000) / 10,
      totalOrders: Math.round(totalOrders / 2), // deduplicate shared orders
    };
  });
}

export function getCategorySummary(month?: string): { category: string; revenue: number; profit: number; marginPct: number; unitsSold: number }[] {
  const data = month ? getSalesForMonth(month) : SALES_DATA;
  const byCategory = new Map<string, { revenue: number; profit: number; units: number }>();

  for (const r of data) {
    const profile = PRODUCT_PROFILES.find(p => p.productId === r.productId);
    const cat = profile?.category || 'other';
    const existing = byCategory.get(cat) || { revenue: 0, profit: 0, units: 0 };
    existing.revenue += r.revenue;
    existing.profit += r.grossProfit;
    existing.units += r.unitsSold;
    byCategory.set(cat, existing);
  }

  return Array.from(byCategory.entries())
    .map(([category, stats]) => ({
      category,
      revenue: Math.round(stats.revenue * 100) / 100,
      profit: Math.round(stats.profit * 100) / 100,
      marginPct: Math.round((stats.profit / stats.revenue) * 1000) / 10,
      unitsSold: stats.units,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getProductProfile(productId: string): ProductSalesProfile | undefined {
  return PRODUCT_PROFILES.find(p => p.productId === productId);
}

export { PRODUCT_PROFILES, MONTHS };
