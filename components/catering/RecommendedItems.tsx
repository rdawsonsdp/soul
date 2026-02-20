'use client';

import { useCatering } from '@/context/CateringContext';
import { getProductsByEventType } from '@/lib/products';
import { getEventTypeName } from '@/lib/event-types';
import { formatCurrency, calculateProductOrder } from '@/lib/pricing';
import { CateringProduct } from '@/lib/types';
import Image from 'next/image';

export default function RecommendedItems() {
  const { state, dispatch, isItemInCart } = useCatering();

  if (!state.eventType) return null;

  const allProducts = getProductsByEventType(state.eventType);

  // Filter: popular items not already in cart, respecting budget if set
  const recommended = allProducts
    .filter(p => p.tags?.includes('popular') && !isItemInCart(p.id))
    .filter(p => {
      if (!state.budgetRange) return true;
      const calc = calculateProductOrder(p, state.headcount);
      const perPerson = calc.totalPrice / state.headcount;
      return perPerson <= state.budgetRange.max;
    })
    .slice(0, 6);

  if (recommended.length === 0) return null;

  const handleAdd = (product: CateringProduct) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="border-2 border-[#dabb64]/50 rounded-xl p-4 sm:p-6 bg-[#dabb64]/5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#dabb64] text-lg">&#9733;</span>
        <h3 className="font-oswald text-lg font-bold text-[#363333] tracking-wide">
          RECOMMENDED FOR YOUR {getEventTypeName(state.eventType).toUpperCase()}
        </h3>
        <span className="text-xs text-gray-500">
          ({state.headcount} guests{state.budgetRange ? `, ${state.budgetRange.label} budget` : ''})
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {recommended.map((product) => {
          const calc = calculateProductOrder(product, state.headcount);
          return (
            <div
              key={product.id}
              className="flex-shrink-0 w-[180px] sm:w-[200px] bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-24">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="p-3">
                <h4 className="font-oswald font-semibold text-[#363333] text-sm line-clamp-1 mb-1">
                  {product.title}
                </h4>
                <p className="text-xs text-gray-500 mb-2">
                  {formatCurrency(calc.totalPrice / state.headcount)}/person
                </p>
                <button
                  onClick={() => handleAdd(product)}
                  className="w-full text-xs font-semibold bg-[#363333] text-white py-1.5 rounded-lg hover:bg-[#dabb64] hover:text-[#363333] transition-colors"
                >
                  Add to Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
