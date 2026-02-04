'use client';

import { useState } from 'react';
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

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleHeadcountChange = (value: number) => {
    dispatch({ type: 'SET_HEADCOUNT', payload: Math.max(1, value) });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const handleClearAll = () => {
    dispatch({ type: 'CLEAR_ITEMS' });
  };

  const handleResetOrder = () => {
    dispatch({ type: 'RESET' });
    setShowResetConfirm(false);
  };

  const quickHeadcounts = [10, 25, 50, 100, 150, 200];

  // Calculate delivery fee based on order size
  const getDeliveryFee = (headcount: number): number => {
    if (headcount <= 25) return 75;   // Small order
    if (headcount <= 50) return 125;  // Medium order
    return 200;                        // Large order (>50)
  };

  const getOrderSizeLabel = (headcount: number): string => {
    if (headcount <= 25) return 'Small';
    if (headcount <= 50) return 'Medium';
    return 'Large';
  };

  const deliveryFee = getDeliveryFee(state.headcount);
  const orderTotal = totalCost + (calculatedItems.length > 0 ? deliveryFee : 0);
  const totalPerPerson = calculatedItems.length > 0 ? orderTotal / state.headcount : 0;

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
              {formatCurrency(totalPerPerson)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total</p>
            <p className="font-oswald text-2xl sm:text-3xl font-bold text-[#dabb64]">
              {formatCurrency(orderTotal)}
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
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="text-gray-600">Delivery</span>
                <span className="text-xs text-gray-400">({getOrderSizeLabel(state.headcount)})</span>
              </div>
              <span className="font-semibold text-[#363333]">
                {formatCurrency(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-medium">Order Total</span>
              <span className="font-bold text-[#363333]">
                {formatCurrency(orderTotal)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-oswald font-bold pt-2 border-t border-gray-200">
              <span className="text-[#363333]">Per Person</span>
              <span className="text-[#dabb64]">
                {formatCurrency(totalPerPerson)}
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

      {/* Reset Order Bar */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start Over
          </button>
        ) : (
          <div className="bg-red-50 rounded-lg p-3 animate-scale-in">
            <p className="text-sm text-gray-700 text-center mb-3">
              Reset your entire order?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetOrder}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
