'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCatering } from '@/context/CateringContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useCatering();

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/menus', label: 'OUR MENUS' },
    { href: '#delivery', label: 'DELIVERY' },
    { href: '/#catering', label: 'CATERING' },
    { href: '#network', label: 'JOIN OUR NETWORK' },
    { href: '#about', label: 'ABOUT US' },
  ];

  return (
    <header className="bg-[#363333] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/SOUL DELIVERED NEW LOGO.png"
              alt="Soul Delivered"
              width={120}
              height={120}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-oswald text-sm xl:text-base tracking-wide text-white hover:text-[#dabb64] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#catering"
              className="font-oswald text-sm xl:text-base tracking-wide border-2 border-white px-4 py-2 hover:bg-white hover:text-[#363333] transition-all"
            >
              BOOK CATERING
            </Link>

            {/* Cart Icon - Desktop */}
            <Link href="#catering" className="relative p-2 hover:bg-white/10 rounded transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {state.selectedItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#dabb64] text-[#363333] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {state.selectedItems.length}
                </span>
              )}
            </Link>
          </nav>

          {/* Cart Icon - Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="#catering" className="relative p-2 hover:bg-white/10 rounded transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {state.selectedItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#dabb64] text-[#363333] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {state.selectedItems.length}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="p-2 hover:bg-white/10 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 font-oswald tracking-wide text-white hover:text-[#dabb64] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#catering"
              className="block mt-4 font-oswald tracking-wide border-2 border-white px-4 py-3 text-center hover:bg-white hover:text-[#363333] transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              BOOK CATERING
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
