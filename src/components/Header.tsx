"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Church, Video, MapPin, Calendar, Compass, Heart } from "lucide-react";
import ChurchLogo from "@/components/icons/ChurchLogo";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "우리교회", href: "#about", icon: Church },
    { name: "설교/미디어", href: "#media", icon: Video },
    { name: "예배안내", href: "#worship", icon: Calendar },
    { name: "행복한교회생활", href: "#happylife", icon: Heart },
    { name: "오시는길", href: "#location", icon: MapPin },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 text-stone-900 border-b border-stone-200/80"
          : "bg-gradient-to-b from-stone-950/80 via-stone-900/40 to-transparent py-5 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className={`transition-transform duration-300 group-hover:scale-105 ${isScrolled ? "drop-shadow-sm" : "drop-shadow-lg"}`}>
            <ChurchLogo className="w-10 h-10" />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-xs font-medium tracking-wider uppercase ${
                isScrolled ? "text-amber-800" : "text-amber-300"
              }`}
            >
              예수교대한성결교회
            </span>
            <span
              className={`text-xl font-extrabold tracking-tight font-serif ${
                isScrolled ? "text-stone-900" : "text-white"
              }`}
            >
              경안교회
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isScrolled
                  ? "text-stone-700 hover:text-amber-800 hover:bg-stone-100"
                  : "text-stone-100 hover:text-amber-300 hover:bg-white/10"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Call Quick Action */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:010-2074-0691"
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full transition-all shadow-sm ${
              isScrolled
                ? "bg-amber-800 text-white hover:bg-amber-900 shadow-amber-900/10"
                : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>신앙상담 010-2074-0691</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? "text-stone-900 hover:bg-stone-100" : "text-white hover:bg-white/10"
          }`}
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 shadow-xl animate-fade-in">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                >
                  <Icon className="w-5 h-5 text-amber-700" />
                  <span>{link.name}</span>
                </a>
              );
            })}
            <div className="pt-4 mt-2 border-t border-stone-100">
              <a
                href="tel:010-2074-0691"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-800 text-white rounded-xl font-bold shadow-md hover:bg-amber-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>담임목사 신앙상담 (010-2074-0691)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
