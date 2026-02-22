import { CateringPackage, EventType } from './types';

export const CATERING_PACKAGES: CateringPackage[] = [
  // Breakfast Packages
  {
    id: 'breakfast-essential',
    title: 'Breakfast Essentials',
    description: 'A classic breakfast spread with all the essentials to start the day right.',
    pricePerPerson: 22,
    image: '/images/Yogurt Parfait Shot High Res.png',
    items: [
      'Assorted Breakfast Pastries',
      'Fresh Fruit Platter',
      'Yogurt Parfaits',
      'Orange Juice & Coffee',
    ],
    categories: ['breakfast'],
    minHeadcount: 10,
  },
  {
    id: 'breakfast-premium',
    title: 'Southern Breakfast',
    description: 'A hearty Southern-style breakfast featuring our signature dishes.',
    pricePerPerson: 32,
    image: '/images/Shrimp and Grits Shot High Res.png',
    items: [
      'Shrimp & Grits',
      'Breakfast Casserole',
      'Southern Potatoes',
      'Breakfast Meats',
      'Fresh Fruit',
      'Coffee & Juice Service',
    ],
    categories: ['breakfast'],
    minHeadcount: 15,
  },
  {
    id: 'breakfast-deluxe',
    title: 'Executive Breakfast',
    description: 'An elevated breakfast experience for special occasions and VIP events.',
    pricePerPerson: 45,
    image: '/images/Breakfast Casserole Bake Hi Res Shot.png',
    items: [
      'Shrimp & Grits Station',
      'Breakfast Casserole',
      'Belgian Waffle Station',
      'Omelet Bar',
      'Fresh Fruit Display',
      'Pastry Selection',
      'Premium Coffee & Juice Bar',
    ],
    categories: ['breakfast'],
    minHeadcount: 20,
  },

  // Lunch Packages
  {
    id: 'lunch-essential',
    title: 'Lunch Essentials',
    description: 'A satisfying lunch spread perfect for working meetings.',
    pricePerPerson: 24,
    image: '/images/Sandwich and Chips Shot Hi Res.png',
    items: [
      'Assorted Gourmet Sandwiches',
      'Garden Salad',
      'Kettle Chips',
      'Cookies',
      'Bottled Water & Sodas',
    ],
    categories: ['lunch'],
    minHeadcount: 10,
  },
  {
    id: 'lunch-premium',
    title: 'Southern Comfort Lunch',
    description: 'Authentic Southern comfort food that nourishes the spirit.',
    pricePerPerson: 35,
    image: '/images/Macaroni and Cheese Shot Hi Res.png',
    items: [
      'Choice of Protein (Fried Chicken, Salmon, or Chicken Breast)',
      'Mac & Cheese',
      'Collard Greens',
      'Red Beans & Rice',
      'Cornbread',
      'Beverages',
    ],
    categories: ['lunch'],
    minHeadcount: 15,
  },
  {
    id: 'lunch-deluxe',
    title: 'Executive Lunch',
    description: 'A premium lunch experience with multiple courses and elevated presentation.',
    pricePerPerson: 48,
    image: '/images/Herb-Crusted Salmon with Garlic Butter Sauce Shot Hi Res.png',
    items: [
      'Southwest Salad Course',
      'Herb-Crusted Salmon OR Garlic Butter Chicken',
      'Garlic Mashed Potatoes',
      'Seasonal Vegetables',
      'Fresh Baked Rolls',
      'Dessert Selection',
      'Premium Beverage Service',
    ],
    categories: ['lunch'],
    minHeadcount: 20,
  },

  // Dessert Packages
  {
    id: 'dessert-essential',
    title: 'Afternoon Break',
    description: 'Light refreshments perfect for afternoon meetings or breaks.',
    pricePerPerson: 15,
    image: '/images/Kind Bars and Granola Snacks Hi Res Shot.png',
    items: [
      'Granola & Energy Bars',
      'Fresh Fruit',
      'Assorted Chips',
      'Bottled Water',
      'Coffee & Tea',
    ],
    categories: ['dessert'],
    minHeadcount: 10,
  },
  {
    id: 'dessert-premium',
    title: 'Sweet Treats',
    description: 'Indulgent sweets and treats from our bakery.',
    pricePerPerson: 20,
    image: '/images/BSB Chocolate Chip Cookies Hi Res Shot.png',
    items: [
      'Chocolate Chip Cookies',
      'Assorted Cake Slices',
      'Fresh Fruit Display',
      'Coffee & Tea Service',
      'Lemonade',
    ],
    categories: ['dessert'],
    minHeadcount: 10,
  },
  {
    id: 'dessert-deluxe',
    title: 'Celebration Spread',
    description: 'A full dessert and snack spread for celebrations and special occasions.',
    pricePerPerson: 28,
    image: '/images/BSB Red Velvet Cake.png',
    items: [
      'Red Velvet Cake',
      'Caramel Cake',
      'Strawberry Cheesecake',
      'Chocolate Chip Cookies',
      'Fresh Fruit Display',
      'Premium Coffee & Tea',
      'Sparkling Water & Sodas',
    ],
    categories: ['dessert'],
    minHeadcount: 15,
  },
];

export function getPackagesByEventType(eventType: EventType): CateringPackage[] {
  return CATERING_PACKAGES.filter((pkg) => pkg.categories.includes(eventType));
}

export function getPackagesByBudget(
  packages: CateringPackage[],
  minBudget: number,
  maxBudget: number
): CateringPackage[] {
  return packages.filter(
    (pkg) => pkg.pricePerPerson >= minBudget && pkg.pricePerPerson <= maxBudget
  );
}
