'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCatering } from '@/context/CateringContext';
import { getEventTypeName } from '@/lib/event-types';
import { formatCurrency, getDisplayPrice, getPricingTypeLabel } from '@/lib/pricing';
import { getProductsByEventType } from '@/lib/products';
import CateringProductCard from './CateringProductCard';
import CateringCart from './CateringCart';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ProductSelectionStep() {
  const router = useRouter();
  const { state, dispatch, perPersonCost, totalCost } = useCatering();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate delivery and total for mobile cart button
  const getDeliveryFee = (headcount: number): number => {
    if (headcount <= 25) return 75;
    if (headcount <= 50) return 125;
    return 200;
  };
  const deliveryFee = getDeliveryFee(state.headcount);
  const orderTotal = totalCost + (state.selectedItems.length > 0 ? deliveryFee : 0);

  // Close cart when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when cart is open on mobile
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Get products filtered by event type from local data
  const products = getProductsByEventType(state.eventType);

  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.tags?.some(tag => tag.toLowerCase().includes(term))
    );
  });

  // Sort by pricing type to group similar items
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const typeOrder = { 'tray': 0, 'pan': 1, 'per-person': 2, 'per-dozen': 3, 'per-each': 4, 'per-container': 5 };
    const typeA = typeOrder[a.pricing.type] ?? 99;
    const typeB = typeOrder[b.pricing.type] ?? 99;
    return typeA - typeB;
  });

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const handleHeadcountChange = (value: number) => {
    dispatch({ type: 'SET_HEADCOUNT', payload: Math.max(1, value) });
  };

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {state.eventType && (
              <Badge variant={state.eventType as 'breakfast' | 'lunch' | 'dessert'}>
                {getEventTypeName(state.eventType)}
              </Badge>
            )}
            {state.selectedItems.length > 0 && (
              <Badge variant="default">
                {formatCurrency(perPersonCost)}/person
              </Badge>
            )}
          </div>
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-[#363333] tracking-wider mb-4">
            BUILD YOUR {state.eventType?.toUpperCase() || 'EVENT'}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Select items for your {state.eventType || ''} - sizes auto-adjust to your guest count
          </p>

          {/* Headcount Input */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <label className="font-oswald text-lg text-[#363333]">
              GUESTS:
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleHeadcountChange(state.headcount - 5)}
                className="w-10 h-10 rounded-full bg-[#f7efd7] hover:bg-[#dabb64] text-[#363333] font-bold transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={state.headcount}
                onChange={(e) => handleHeadcountChange(parseInt(e.target.value) || 10)}
                className="w-20 h-10 text-center text-xl font-bold border-2 border-[#363333] rounded-lg"
                min="1"
              />
              <button
                onClick={() => handleHeadcountChange(state.headcount + 5)}
                className="w-10 h-10 rounded-full bg-[#f7efd7] hover:bg-[#dabb64] text-[#363333] font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#dabb64] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Product Grid */}
          <div className="lg:col-span-2">
            {sortedProducts.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-500">
                  {searchTerm
                    ? 'No products match your search.'
                    : 'No products available for this event type.'}
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-scale-in"
                    style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s` }}
                  >
                    <CateringProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <CateringCart onCheckout={handleCheckout} />
          </div>
        </div>

        {/* Mobile Cart Button - Fixed at bottom */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#363333] text-white rounded-xl py-4 px-6 flex items-center justify-between shadow-lg hover:bg-[#4a4646] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {state.selectedItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#dabb64] text-[#363333] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {state.selectedItems.length}
                  </span>
                )}
              </div>
              <span className="font-oswald font-semibold">
                {state.selectedItems.length === 0 ? 'View Cart' : `${state.selectedItems.length} item${state.selectedItems.length !== 1 ? 's' : ''}`}
              </span>
            </div>
            {state.selectedItems.length > 0 && (
              <span className="font-oswald font-bold text-[#dabb64]">
                {formatCurrency(orderTotal)}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Cart Drawer */}
        {isCartOpen && (
          <>
            {/* Overlay */}
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsCartOpen(false)}
            />
            {/* Drawer */}
            <div className="lg:hidden fixed inset-y-0 right-0 w-full max-w-md bg-[#f7efd7] z-50 shadow-2xl animate-slide-in-right overflow-y-auto">
              {/* Drawer Header */}
              <div className="sticky top-0 bg-[#363333] text-white px-4 py-4 flex items-center justify-between z-10">
                <h2 className="font-oswald text-xl font-bold tracking-wide">Your Order</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close cart"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Cart Content */}
              <div className="p-4 pb-24">
                <CateringCart onCheckout={() => { setIsCartOpen(false); handleCheckout(); }} />
              </div>
            </div>
          </>
        )}

        {/* Back button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleBack}
            className="font-oswald text-gray-500 hover:text-[#363333] transition-colors tracking-wide"
          >
            ← BACK TO EVENT TYPE
          </button>
        </div>
      </div>
    </div>
  );
}
