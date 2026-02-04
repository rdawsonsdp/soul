'use client';

import { useState } from 'react';
import { useCatering } from '@/context/CateringContext';
import { getEventTypeName } from '@/lib/event-types';
import { formatCurrency, getDisplayPrice, getPricingTypeLabel } from '@/lib/pricing';
import { getProductsByEventType } from '@/lib/products';
import CateringProductCard from './CateringProductCard';
import CateringCart from './CateringCart';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ProductSelectionStep() {
  const { state, dispatch, perPersonCost } = useCatering();
  const [searchTerm, setSearchTerm] = useState('');

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
    alert('Checkout functionality would redirect to Shopify checkout here.');
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
              <Badge variant={state.eventType as 'breakfast' | 'lunch' | 'snack'}>
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
          <div className="lg:col-span-2 order-2 lg:order-1">
            {sortedProducts.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-500">
                  {searchTerm
                    ? 'No products match your search.'
                    : 'No products available for this event type.'}
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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

          {/* Cart Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <CateringCart onCheckout={handleCheckout} />
          </div>
        </div>

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
