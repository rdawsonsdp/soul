'use client';

import { useCatering } from '@/context/CateringContext';
import { formatCurrency } from '@/lib/pricing';
import { getEventTypeName } from '@/lib/event-types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface CateringCartProps {
  onCheckout: () => void;
}

export default function CateringCart({ onCheckout }: CateringCartProps) {
  const {
    state,
    dispatch,
    totalCost,
    perPersonCost,
    calculatedItems,
    canProceedToCheckout,
  } = useCatering();

  const handleHeadcountChange = (value: number) => {
    dispatch({ type: 'SET_HEADCOUNT', payload: Math.max(1, value) });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const handleClearAll = () => {
    dispatch({ type: 'CLEAR_ITEMS' });
  };

  const quickHeadcounts = [10, 25, 50, 100, 150, 200];

  return (
    <Card className="sticky top-20 sm:top-24 lg:top-4 animate-scale-in delay-200 bg-[#f7efd7]" hover={false}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-oswald font-bold text-[#363333] tracking-wide">
          Your Order
        </h2>
      </div>

      {/* Large Stats Display */}
      {state.selectedItems.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-xl border-l-4 border-[#dabb64]">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Per Person</p>
            <p className="font-oswald text-2xl sm:text-3xl font-bold text-[#363333]">
              {formatCurrency(perPersonCost)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total</p>
            <p className="font-oswald text-2xl sm:text-3xl font-bold text-[#dabb64]">
              {formatCurrency(totalCost)}
            </p>
          </div>
        </div>
      )}

      {/* Event Type Summary */}
      {state.eventType && (
        <div className="mb-4 p-3 bg-white/50 rounded-lg text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Event Type:</span>
            <span className="font-medium text-[#363333]">
              {getEventTypeName(state.eventType)}
            </span>
          </div>
        </div>
      )}

      {/* Headcount Input */}
      <div className="mb-4 sm:mb-6">
        <label className="text-xs font-semibold text-[#363333] uppercase tracking-wide mb-2 block font-oswald">
          Number of Guests
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleHeadcountChange(state.headcount - 5)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-white transition-colors text-lg font-medium"
            aria-label="Decrease guests"
          >
            -
          </button>
          <input
            type="number"
            min={1}
            value={state.headcount}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1) handleHeadcountChange(val);
            }}
            className="flex-1 text-center font-bold text-[#363333] text-lg border border-gray-300 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-[#dabb64]/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={() => handleHeadcountChange(state.headcount + 5)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-white transition-colors text-lg font-medium"
            aria-label="Increase guests"
          >
            +
          </button>
        </div>

        {/* Quick-select presets */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {quickHeadcounts.map((n) => (
            <button
              key={n}
              onClick={() => handleHeadcountChange(n)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                state.headcount === n
                  ? 'bg-[#363333] text-white'
                  : 'bg-white text-gray-600 hover:bg-[#dabb64]/20 hover:text-[#363333]'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Cart Items */}
      {calculatedItems.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🍽️</div>
          <p className="text-sm text-gray-500">Add items to build your order</p>
          <p className="text-xs text-gray-400 mt-1">Sizes auto-adjust to your guest count</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-[300px] sm:max-h-[350px] overflow-y-auto">
            {calculatedItems.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-start border-b border-gray-200 pb-3"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-oswald font-semibold text-[#363333] text-sm truncate">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-[#8B7355] mt-0.5">
                    {item.displayText}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-oswald font-bold text-[#363333] text-sm whitespace-nowrap">
                    {formatCurrency(item.totalPrice)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-red-400 hover:text-red-600 p-1"
                    aria-label={`Remove ${item.product.title}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Clear All Button */}
          <button
            onClick={handleClearAll}
            className="w-full text-sm text-gray-500 hover:text-red-500 mb-4 transition-colors"
          >
            Clear All Items
          </button>

          {/* Totals */}
          <div className="border-t-2 border-[#dabb64] pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Guests</span>
              <span className="font-semibold text-[#363333]">
                {state.headcount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-[#363333]">
                {formatCurrency(totalCost)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-oswald font-bold pt-2 border-t border-gray-200">
              <span className="text-[#363333]">Per Person</span>
              <span className="text-[#dabb64]">
                {formatCurrency(perPersonCost)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            onClick={onCheckout}
            disabled={!canProceedToCheckout()}
            className="w-full mt-4"
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Card>
  );
}
