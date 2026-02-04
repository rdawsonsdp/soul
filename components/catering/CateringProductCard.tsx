'use client';

import Image from 'next/image';
import { CateringProduct } from '@/lib/types';
import { useCatering } from '@/context/CateringContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getDisplayPrice, getPricingTypeLabel, calculateProductOrder, formatCurrency } from '@/lib/pricing';

interface CateringProductCardProps {
  product: CateringProduct;
}

export default function CateringProductCard({ product }: CateringProductCardProps) {
  const { state, dispatch, isItemInCart } = useCatering();
  const inCart = isItemInCart(product.id);

  // Calculate what the customer will get based on current headcount
  const orderCalc = calculateProductOrder(product, state.headcount);

  const handleAdd = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: product.id });
  };

  return (
    <Card className="flex flex-col h-full hover-lift group relative overflow-hidden bg-[#f7efd7]">
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-[#dabb64]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      <div className="relative z-10">
        {/* Product Image */}
        <div className="aspect-square bg-gray-200 rounded-lg mb-3 sm:mb-4 overflow-hidden relative">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover img-zoom"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-[#f7efd7] to-[#dabb64]/30">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* In Cart indicator */}
          {inCart && (
            <div className="absolute top-2 left-2">
              <Badge variant="success">
                In Cart
              </Badge>
            </div>
          )}

          {/* Pricing type badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="text-xs">
              {getPricingTypeLabel(product)}
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <h3 className="font-oswald font-semibold text-[#363333] mb-2 text-sm sm:text-base line-clamp-2 tracking-wide">
          {product.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 flex-grow line-clamp-2">
          {product.description}
        </p>

        {/* Price Display */}
        <div className="mb-3">
          <div className="text-lg sm:text-xl font-oswald font-bold text-[#363333]">
            {getDisplayPrice(product)}
          </div>
          <div className="text-xs text-[#8B7355] mt-1">
            For {state.headcount} guests: <span className="font-semibold">{orderCalc.displayText}</span>
          </div>
          <div className="text-xs text-[#363333] font-semibold">
            = {formatCurrency(orderCalc.totalPrice)} ({formatCurrency(orderCalc.totalPrice / state.headcount)}/person)
          </div>
        </div>

        {/* Add/Remove Button */}
        {inCart ? (
          <div className="space-y-2">
            <Button
              variant="secondary"
              onClick={handleRemove}
              className="w-full"
            >
              Remove from Order
            </Button>
          </div>
        ) : (
          <Button onClick={handleAdd} className="w-full">
            Add to Order
          </Button>
        )}
      </div>
    </Card>
  );
}
