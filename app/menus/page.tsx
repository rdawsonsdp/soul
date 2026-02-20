'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATERING_PRODUCTS } from '@/lib/products';
import { CateringProduct } from '@/lib/types';
import { getDisplayPrice, getPricingTypeLabel } from '@/lib/pricing';
import DietaryFilterBar from '@/components/catering/DietaryFilterBar';

// Menu sections organized by the PDF structure
const MENU_SECTIONS = [
  {
    id: 'breakfast',
    title: 'BREAKFAST',
    subtitle: 'Start Your Day with Soul',
    image: '/images/Shrimp and Grits Shot High Res.png',
    subsections: [
      { id: 'sunrise-staples', title: 'Sunrise Staples', description: 'Light bites to start your morning' },
      { id: 'soulful-starts', title: 'Soulful Starts', description: 'Hearty breakfast favorites' },
      { id: 'breakfast-proteins', title: 'Proteins', description: 'Savory breakfast meats' },
      { id: 'southern-favorites', title: 'Southern Favorites', description: 'Classic southern breakfast dishes' },
      { id: 'breakfast-handhelds', title: 'Handhelds', description: 'Grab-and-go options' },
      { id: 'breakfast-vegan', title: 'Vegan Options', description: 'Plant-based breakfast items' },
    ],
  },
  {
    id: 'lunch',
    title: 'LUNCH & DINNER',
    subtitle: 'Satisfying Meals for Any Occasion',
    image: '/images/Stacked Sandwiches Hi Res Shot.png',
    subsections: [
      { id: 'salads', title: 'Fresh Salads', description: 'Crisp and flavorful' },
      { id: 'protein-addons', title: 'Protein Add-Ons', description: 'Top your salad with protein' },
      { id: 'lunch-packages', title: 'Lunch Packages', description: 'Complete boxed meals' },
      { id: 'flavor-bars', title: 'Flavor Bars', description: 'Interactive build-your-own stations' },
      { id: 'entrees', title: 'Entrées', description: 'Main course selections' },
      { id: 'sides-potatoes', title: 'Sides - Potatoes', description: 'Hearty potato dishes' },
      { id: 'sides-pasta', title: 'Sides - Pasta & Grains', description: 'Comfort classics' },
      { id: 'sides-vegetables', title: 'Sides - Vegetables', description: 'Fresh and flavorful veggies' },
      { id: 'sides-breads', title: 'Sides - Breads', description: 'Fresh-baked accompaniments' },
      { id: 'sides-cold', title: 'Sides - Cold', description: 'Refreshing cold sides' },
    ],
  },
  {
    id: 'desserts',
    title: 'DESSERTS',
    subtitle: 'Sweet Endings from Brown Sugar Bakery',
    image: '/images/BSB Caramel Cake Slices Hi Res Shot.png',
    subsections: [],
  },
  {
    id: 'beverages',
    title: 'BEVERAGES',
    subtitle: 'Drinks for Every Occasion',
    image: '/images/Cold Brew Hi Res Shot.png',
    subsections: [
      { id: 'hot-beverages', title: 'Hot Beverages', description: 'Coffee, tea, and more' },
      { id: 'cold-beverages', title: 'Cold Beverages', description: 'Refreshing cold drinks' },
    ],
  },
];

// Map products to menu subsections
function getProductsForSubsection(subsectionId: string): CateringProduct[] {
  const mappings: Record<string, (p: CateringProduct) => boolean> = {
    'sunrise-staples': (p) =>
      p.categories.includes('breakfast') &&
      ['morning-mingle-tray', 'parfait-bar', 'fresh-fruit-tray', 'fresh-fruit-cups', 'whole-fruit'].includes(p.id),
    'soulful-starts': (p) =>
      p.categories.includes('breakfast') &&
      ['scrambled-eggs', 'breakfast-casserole', 'breakfast-potatoes', 'cajun-hash', 'buttermilk-biscuits', 'biscuits-gravy'].includes(p.id),
    'breakfast-proteins': (p) =>
      p.categories.includes('breakfast') &&
      ['turkey-sausage-links', 'chicken-sausage-patties', 'turkey-bacon', 'pork-sausage', 'pork-bacon'].includes(p.id),
    'southern-favorites': (p) =>
      p.categories.includes('breakfast') &&
      ['southern-grits', 'shrimp-grits', 'catfish-grits'].includes(p.id),
    'breakfast-handhelds': (p) =>
      p.categories.includes('breakfast') &&
      ['biscuit-sandwiches', 'breakfast-wraps'].includes(p.id),
    'breakfast-vegan': (p) =>
      p.categories.includes('breakfast') &&
      ['vegan-scramble', 'vegan-sunrise-wrap', 'vegan-fruit-parfaits'].includes(p.id),
    'salads': (p) =>
      p.categories.includes('lunch') &&
      ['signature-chopped-salad', 'caesar-salad', 'southwest-salad', 'garden-salad'].includes(p.id),
    'protein-addons': (p) =>
      p.categories.includes('lunch') &&
      ['diced-grilled-chicken', 'herb-salmon', 'grilled-flank-steak'].includes(p.id),
    'lunch-packages': (p) =>
      p.categories.includes('lunch') &&
      ['signature-sandwich-package', 'plant-based-lunch-package'].includes(p.id),
    'flavor-bars': (p) =>
      p.categories.includes('lunch') &&
      ['southwest-grain-bowl-bar', 'loaded-mashed-potato-bar'].includes(p.id),
    'entrees': (p) =>
      p.categories.includes('lunch') &&
      ['garlic-herb-chicken', 'smothered-chicken', 'jerk-chicken', 'fried-chicken', 'fried-catfish', 'roasted-turkey', 'herb-crusted-salmon'].includes(p.id),
    'sides-potatoes': (p) =>
      p.categories.includes('lunch') &&
      ['garlic-mashed-potatoes', 'roasted-red-potatoes', 'potato-wedges'].includes(p.id),
    'sides-pasta': (p) =>
      p.categories.includes('lunch') &&
      ['mac-and-cheese', 'spaghetti-meat-sauce', 'fettuccine-alfredo', 'rice-pilaf', 'red-beans-rice'].includes(p.id),
    'sides-vegetables': (p) =>
      p.categories.includes('lunch') &&
      ['southern-cabbage', 'collard-greens', 'southern-green-beans', 'vegetable-medley', 'roasted-asparagus', 'sweet-potatoes', 'creamed-corn'].includes(p.id),
    'sides-breads': (p) =>
      p.categories.includes('lunch') &&
      ['garlic-bread', 'cornbread', 'garlic-knots'].includes(p.id),
    'sides-cold': (p) =>
      p.categories.includes('lunch') &&
      ['coleslaw', 'potato-salad', 'cold-pasta-salad', 'pesto-pasta-salad'].includes(p.id),
    'hot-beverages': (p) =>
      (p.tags?.includes('beverage') ?? false) &&
      ['fresh-brewed-coffee', 'hot-tea', 'hot-chocolate'].includes(p.id),
    'cold-beverages': (p) =>
      (p.tags?.includes('beverage') ?? false) &&
      ['cold-brew-coffee', 'bottled-juices', 'coconut-water', 'bottled-water', 'assorted-sodas', 'sparkling-water', 'iced-tea', 'celsius-energy', 'red-bull'].includes(p.id),
  };

  const filter = mappings[subsectionId];
  if (!filter) return [];
  return CATERING_PRODUCTS.filter(filter);
}

function filterByDietary(products: CateringProduct[], filters: string[]): CateringProduct[] {
  if (filters.length === 0) return products;
  return products.filter(p => filters.every(f => p.tags?.includes(f)));
}

function getProductsForSection(sectionId: string): CateringProduct[] {
  if (sectionId === 'desserts') {
    return CATERING_PRODUCTS.filter(p => p.tags?.includes('dessert'));
  }
  if (sectionId === 'desserts') {
    return CATERING_PRODUCTS.filter(p =>
      p.categories.includes('dessert') &&
      !p.tags?.includes('dessert') &&
      !p.tags?.includes('beverage') &&
      !p.categories.includes('breakfast') &&
      !p.categories.includes('lunch')
    );
  }
  return [];
}

function MenuItemCard({ product }: { product: CateringProduct }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-32 sm:h-40">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="font-oswald font-bold text-[#363333] text-sm sm:text-base mb-1 line-clamp-1">
          {product.title}
        </h4>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-oswald font-bold text-[#dabb64]">
            {getDisplayPrice(product)}
          </span>
          <span className="text-[10px] text-gray-400 uppercase">
            {getPricingTypeLabel(product)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MenusPage() {
  const [activeSection, setActiveSection] = useState<string | null>('breakfast');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleToggleFilter = (tag: string) => {
    setActiveFilters(prev =>
      prev.includes(tag)
        ? prev.filter(f => f !== tag)
        : [...prev, tag]
    );
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = MENU_SECTIONS.map(s => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7efd7]">
      {/* Hero Header */}
      <div className="bg-[#363333] py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#dabb64] to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#f7efd7] tracking-wider mb-4">
              OUR MENUS
            </h1>
            <p className="text-[#dabb64] text-lg sm:text-xl max-w-2xl mx-auto">
              Exceptional food crafted with soul. Browse our complete catering menu featuring over 90 delicious items.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
            {MENU_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full font-oswald font-semibold text-sm whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-[#363333] text-white'
                    : 'bg-[#f7efd7] text-[#363333] hover:bg-[#dabb64]/30'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
          {/* Dietary Filters */}
          <div className="pb-3">
            <DietaryFilterBar activeTags={activeFilters} onToggleTag={handleToggleFilter} />
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {MENU_SECTIONS.map((section, sectionIndex) => (
          <section
            key={section.id}
            id={section.id}
            className={`mb-16 sm:mb-20 scroll-mt-20 ${sectionIndex > 0 ? 'pt-8' : ''}`}
          >
            {/* Section Header */}
            <div className="relative mb-8 sm:mb-12 rounded-2xl overflow-hidden">
              <div className="relative h-48 sm:h-64">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#363333]/90 via-[#363333]/70 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
                <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-[#f7efd7] tracking-wider mb-2">
                  {section.title}
                </h2>
                <p className="text-[#dabb64] text-base sm:text-lg">
                  {section.subtitle}
                </p>
              </div>
            </div>

            {/* Subsections */}
            {section.subsections.length > 0 ? (
              <div className="space-y-12">
                {section.subsections.map((subsection) => {
                  const products = filterByDietary(getProductsForSubsection(subsection.id), activeFilters);
                  if (products.length === 0) return null;

                  return (
                    <div key={subsection.id}>
                      <div className="flex items-center gap-4 mb-6">
                        <div>
                          <h3 className="font-oswald text-xl sm:text-2xl font-bold text-[#363333]">
                            {subsection.title}
                          </h3>
                          <p className="text-sm text-gray-500">{subsection.description}</p>
                        </div>
                        <div className="flex-1 h-px bg-[#dabb64]/50" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {products.map((product) => (
                          <MenuItemCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Direct products for sections without subsections */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filterByDietary(getProductsForSection(section.id), activeFilters).map((product) => (
                  <MenuItemCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-[#363333] py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold text-[#f7efd7] mb-4 tracking-wide">
            READY TO ORDER?
          </h3>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Build your custom catering order with our easy-to-use ordering system. Prices auto-adjust based on your guest count.
          </p>
          <Link
            href="/#catering"
            className="inline-flex items-center gap-2 bg-[#dabb64] text-[#363333] font-oswald font-bold px-8 py-3 rounded-lg hover:bg-[#f7efd7] transition-all"
          >
            <span>Start Your Order</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Pricing Note */}
      <div className="bg-[#f7efd7] py-8 border-t border-[#dabb64]/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="font-oswald text-lg font-bold text-[#363333] mb-2">PRICING INFORMATION</h4>
            <p className="text-sm text-gray-600">
              Our catering is priced by serving size to accommodate groups of all sizes.
              <strong> Trays</strong> serve 10-40 guests, <strong>Pans</strong> serve 10-25 guests,
              and <strong>Per-Person</strong> items are priced individually.
              Minimum orders apply to some items. Delivery fees are based on order size.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
