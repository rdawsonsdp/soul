'use client';

import Image from 'next/image';
import { useCatering } from '@/context/CateringContext';
import { EVENT_TYPES } from '@/lib/event-types';
import ProductSelectionStep from '@/components/catering/ProductSelectionStep';

export default function HomePage() {
  const { state, dispatch } = useCatering();

  const handleSelectEventType = (eventTypeId: string) => {
    dispatch({
      type: 'SET_EVENT_TYPE',
      payload: eventTypeId as 'breakfast' | 'lunch' | 'snack',
    });
  };

  return (
    <div className="min-h-screen bg-[#f7efd7]">
      {/* Hero Section */}
      <section className="relative">
        {/* Two-Image Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
            <Image
              src="/images/Yogurt Parfait Shot High Res.png"
              alt="Yogurt Parfait"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
            <Image
              src="/images/Stacked Sandwiches Hi Res Shot.png"
              alt="Gourmet Sandwiches"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Title Banner - Black */}
        <div className="bg-[#363333] py-8 sm:py-10 text-center">
          <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#f7efd7] tracking-wider mb-2">
            SOUL DELIVERED
          </h1>
          <p className="font-oswald text-base sm:text-xl md:text-[2.5rem] font-bold text-[#dabb64] tracking-wider whitespace-nowrap">
            EXCEPTIONAL FOOD. FLAWLESS DELIVERY. SEAMLESS SETUP.
          </p>
        </div>

        {/* Gold Banner with CTA */}
        <div className="bg-[#dabb64] py-4 text-center">
          <a
            href="#catering"
            className="inline-block font-oswald text-sm sm:text-base tracking-wide border-2 border-[#363333] px-6 py-3 bg-[#f7efd7] text-[#363333] hover:bg-[#363333] hover:text-white transition-all"
          >
            Plan your next remarkable event!
          </a>
        </div>
      </section>

      {/* Step 1: Event Type Selection */}
      <section id="catering" className="bg-[#f7efd7] py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold text-[#363333] tracking-wider mb-4">
              WHAT ARE YOU PLANNING?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Select your event type to see our curated menu options
            </p>
          </div>

          {/* Event Type Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {EVENT_TYPES.map((eventType, index) => {
              const eventImages: Record<string, string> = {
                breakfast: '/images/Shrimp and Grits Shot High Res.png',
                lunch: '/images/Stacked Sandwiches Hi Res Shot.png',
                snack: '/images/BSB Chocolate Chip Cookies Hi Res Shot.png',
              };

              return (
                <div
                  key={eventType.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    onClick={() => handleSelectEventType(eventType.id)}
                    className={`
                      relative overflow-hidden rounded-xl cursor-pointer
                      transition-all duration-300 hover:scale-105 shadow-md
                      h-[280px] sm:h-[320px]
                      ${state.eventType === eventType.id
                        ? 'ring-4 ring-[#dabb64]'
                        : ''
                      }
                    `}
                  >
                    {/* Background Image */}
                    <Image
                      src={eventImages[eventType.id] || '/images/Yogurt Parfait Shot High Res.png'}
                      alt={eventType.name}
                      fill
                      className="object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                      <h3 className="font-oswald text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wide drop-shadow-lg">
                        {eventType.name.toUpperCase()}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base drop-shadow">
                        {eventType.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step 2: Build Your Event */}
      {state.currentStep >= 2 && (
        <ProductSelectionStep />
      )}
    </div>
  );
}
