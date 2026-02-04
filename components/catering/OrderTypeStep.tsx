'use client';

import { useCatering } from '@/context/CateringContext';
import { OrderType } from '@/lib/types';

export default function OrderTypeStep() {
  const { state, dispatch } = useCatering();

  const handleSelect = (orderType: OrderType) => {
    dispatch({ type: 'SET_ORDER_TYPE', payload: orderType });
  };

  const handleBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const options = [
    {
      id: 'build-your-own' as OrderType,
      icon: '🛠️',
      title: 'BUILD YOUR OWN',
      description: 'Customize your menu with individual items',
    },
    {
      id: 'packages' as OrderType,
      icon: '📦',
      title: 'CHOOSE A PACKAGE',
      description: 'Pre-built menus ready to order',
    },
  ];

  return (
    <div className="bg-[#f7efd7] py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-[#363333] tracking-wider mb-4">
            HOW WOULD YOU LIKE TO ORDER?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Build a custom menu or choose from our curated packages
          </p>
        </div>

        {/* Order Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {options.map((option, index) => (
            <div
              key={option.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                onClick={() => handleSelect(option.id)}
                className={`
                  bg-white border-2 rounded-xl p-8 sm:p-10 text-center cursor-pointer
                  transition-all duration-300 hover:scale-105 shadow-md
                  ${state.orderType === option.id
                    ? 'border-[#363333] bg-[#dabb64]/20'
                    : 'border-gray-200 hover:border-[#dabb64]'
                  }
                `}
              >
                <div className="text-6xl sm:text-7xl mb-4">{option.icon}</div>
                <h3 className="font-oswald text-2xl sm:text-3xl font-bold text-[#363333] mb-3 tracking-wide">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
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
