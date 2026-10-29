"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, MessageCircle, TrendingUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const services = [
  { label: "Mutual Funds & SIP", href: "/#services" },
  { label: "Loans", href: "/#loans" },
  { label: "Fixed Deposits", href: "/#fixed-deposits" },
  { label: "Insurance", href: "/#insurance" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-white shadow-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 rounded-lg"
            aria-label="Modi Services - Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700 text-white shadow-sm group-hover:bg-navy-800 transition-colors">
              <TrendingUp className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-lg font-bold text-navy-900 leading-tight">
                Modi Services
              </span>
              <span className="block text-xs text-teal-600 font-medium leading-tight">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200",
                  isActive(link.href)
                    ? "text-navy-700 bg-navy-50"
                    : "text-gray-700 hover:text-navy-700 hover:bg-gray-50"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-navy-700 hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Our Services
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", servicesOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white shadow-lg border border-gray-100 py-2 animate-fade-in">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-navy-50 hover:text-navy-700 transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about#contact"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-navy-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.social.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-xs py-2.5"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <Link href="/about#contact" className="btn-primary text-xs py-2.5">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-in"
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-semibold transition-colors",
                  isActive(link.href)
                    ? "text-navy-700 bg-navy-50"
                    : "text-gray-700 hover:text-navy-700 hover:bg-gray-50"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}

            <div>
              <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Our Services
              </p>
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:text-navy-700 hover:bg-gray-50"
                >
                  {s.label}
                </Link>
              ))}
            </div>

            <Link
              href="/about#contact"
              className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:text-navy-700 hover:bg-gray-50"
            >
              Contact Us
            </Link>

            <div className="pt-3 flex flex-col gap-2.5 border-t border-gray-100">
              <a
                href={siteConfig.social.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp justify-center"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
              <Link href="/about#contact" className="btn-primary justify-center">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
