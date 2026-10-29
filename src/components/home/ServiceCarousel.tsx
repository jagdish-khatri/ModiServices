"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, TrendingUp, Layers, Home, User, Award, Car, PiggyBank, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const carouselItems = [
  {
    icon: TrendingUp,
    title: "SIP Investments",
    desc: "Systematic monthly investments for long-term wealth creation with disciplined investing.",
    color: "from-blue-600 to-blue-800",
    href: "/#services",
  },
  {
    icon: Layers,
    title: "Lump-Sum Investments",
    desc: "Invest a one-time amount in mutual funds to pursue your financial objectives.",
    color: "from-indigo-600 to-indigo-800",
    href: "/#services",
  },
  {
    icon: Home,
    title: "Home Loans",
    desc: "Explore home loan options for purchasing or constructing your dream home.",
    color: "from-amber-600 to-amber-800",
    href: "/#loans",
  },
  {
    icon: User,
    title: "Personal Loans",
    desc: "Unsecured loans for personal needs — understand rates, fees, and repayment terms.",
    color: "from-orange-600 to-orange-800",
    href: "/#loans",
  },
  {
    icon: Award,
    title: "Gold Loans",
    desc: "Leverage your gold assets to meet financial needs with secured loan options.",
    color: "from-yellow-600 to-yellow-800",
    href: "/#loans",
  },
  {
    icon: Car,
    title: "Vehicle Loans",
    desc: "Finance your two-wheeler or car with suitable loan options and manageable EMIs.",
    color: "from-green-600 to-green-800",
    href: "/#loans",
  },
  {
    icon: PiggyBank,
    title: "Fixed Deposits",
    desc: "Earn predetermined interest over a fixed tenure — understand terms before investing.",
    color: "from-teal-600 to-teal-800",
    href: "/#fixed-deposits",
  },
  {
    icon: Shield,
    title: "Insurance",
    desc: "Protect your family and assets with appropriate life, health, and general insurance.",
    color: "from-purple-600 to-purple-800",
    href: "/#insurance",
  },
];

const VISIBLE_CARDS = 3; // on desktop
const AUTO_PLAY_MS = 3500;

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const total = carouselItems.length;

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, AUTO_PLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, next]);

  // Get visible items with wrapping
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < total; i++) {
      items.push(carouselItems[(activeIndex + i) % total]);
    }
    return items;
  };

  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="carousel-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-tag">All Services</span>
          <h2 id="carousel-heading" className="section-title mb-4">
            Explore Our Products & Services
          </h2>
          <p className="section-subtitle">
            Browse all the financial products and services Modi Services can
            help you understand and access.
          </p>
        </div>

        <div className="relative">
          {/* Previous button */}
          <button
            onClick={() => { prev(); setIsPaused(true); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>

          {/* Cards */}
          <div
            className="overflow-hidden"
            aria-live="polite"
            aria-atomic="false"
          >
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              style={{ touchAction: "pan-y" }}
            >
              {getVisibleItems()
                .slice(0, VISIBLE_CARDS)
                .map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={`${item.title}-${activeIndex}`}
                      className={cn(
                        "rounded-2xl text-white p-6 flex flex-col transition-all duration-500 bg-gradient-to-br",
                        item.color,
                        idx === 0 ? "opacity-100 scale-100" : "opacity-90 scale-[0.98]"
                      )}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 mb-5">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed mb-5 flex-grow">
                        {item.desc}
                      </p>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 px-4 py-2.5 text-sm font-semibold transition-colors w-fit"
                      >
                        Enquire Now
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={() => { next(); setIsPaused(true); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
            aria-label="Next service"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>
        </div>

        {/* Dots */}
        <div
          className="flex justify-center gap-2 mt-8"
          role="tablist"
          aria-label="Service carousel position"
        >
          {carouselItems.map((item, i) => (
            <button
              key={item.title}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to ${item.title}`}
              onClick={() => { setActiveIndex(i); setIsPaused(true); }}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-navy-700"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
