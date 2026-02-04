'use client';

import Image from 'next/image';
import Link from 'next/link';
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
        {/* Two-Image Hero - Smaller on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2">
          <div className="relative h-[120px] sm:h-[200px] md:h-[350px] lg:h-[450px] overflow-hidden">
            <Image
              src="/images/Yogurt Parfait Shot High Res.png"
              alt="Yogurt Parfait"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative h-[120px] sm:h-[200px] md:h-[350px] lg:h-[450px] overflow-hidden">
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
                      h-[180px] sm:h-[240px] md:h-[320px]
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

      {/* Browse Full Menu Link */}
      <section className="bg-[#363333] py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-oswald text-2xl sm:text-3xl font-bold text-[#f7efd7] mb-3 tracking-wide">
            LOOKING FOR SOMETHING ELSE?
          </h3>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Browse our complete menu with over 90 items including breakfast, lunch, dinner, snacks, and beverages.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#dabb64] text-[#363333] font-oswald font-bold px-8 py-3 rounded-lg hover:bg-[#f7efd7] transition-all group"
          >
            <span>Browse Full Menu</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
