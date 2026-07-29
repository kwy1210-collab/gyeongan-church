"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Church, Video, MapPin, Calendar, Compass, Heart, Users, Lock, KeyRound, ShieldAlert } from "lucide-react";
import MemberManagementModal from "@/components/MemberManagementModal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // Password Protection State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

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

  const handleOpenMemberManagement = () => {
    if (typeof window !== "undefined" && sessionStorage.getItem("member_auth_passed") === "true") {
      setIsMemberModalOpen(true);
    } else {
      setPasswordInput("");
      setPasswordError(false);
      setIsPasswordModalOpen(true);
    }
  };

  const handleVerifyPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === "2580") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("member_auth_passed", "true");
      }
      setIsPasswordModalOpen(false);
      setPasswordError(false);
      setPasswordInput("");
      setIsMemberModalOpen(true);
    } else {
      setPasswordError(true);
      setPasswordInput("");
    }
  };

  const navLinks = [
    { name: "우리교회", href: "#about", icon: Church },
    { name: "설교/미디어", href: "#media", icon: Video },
    { name: "행복한교회생활", href: "#happylife", icon: Heart },
    { name: "예배안내", href: "#worship", icon: Calendar },
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
        {/* Logo Text */}
        <a href="#" className="inline-grid grid-cols-1 w-max group">
          <span
            className={`text-xs font-semibold uppercase whitespace-nowrap leading-tight ${
              isScrolled ? "text-amber-800" : "text-amber-300"
            }`}
          >
            예수교대한성결교회
          </span>
          <div
            className={`w-full flex justify-between text-xl font-extrabold font-serif leading-tight mt-0.5 ${
              isScrolled ? "text-stone-900" : "text-white"
            }`}
          >
            <span>경</span>
            <span>안</span>
            <span>교</span>
            <span>회</span>
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

        {/* Call Quick Action & Member Management */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="tel:010-2074-0691"
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 sm:px-4 py-2 rounded-full transition-all shadow-sm ${
              isScrolled
                ? "bg-amber-800 text-white hover:bg-amber-900 shadow-amber-900/10"
                : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>신앙상담 010-2074-0691</span>
          </a>

          <button
            onClick={handleOpenMemberManagement}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-all shadow-sm cursor-pointer hover:scale-105 ${
              isScrolled
                ? "bg-amber-800 text-white hover:bg-amber-900 shadow-amber-900/10"
                : "bg-stone-900/80 hover:bg-stone-900 text-white backdrop-blur-md border border-white/30"
            }`}
            title="성도 & 심방 관리"
            aria-label="성도관리"
          >
            <Users className="w-4.5 h-4.5 text-amber-400" />
          </button>
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
            <div className="pt-4 mt-2 border-t border-stone-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenMemberManagement();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-stone-900 text-white rounded-xl font-bold shadow-md hover:bg-stone-800 transition-colors text-sm"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>성도 & 심방 관리</span>
              </button>
              <a
                href="tel:010-2074-0691"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-800 text-white rounded-xl font-bold shadow-md hover:bg-amber-900 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>담임목사 신앙상담 (010-2074-0691)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Password Protection Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-stone-200 text-stone-900 relative">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold font-serif text-stone-900">관리자 비밀번호 인증</h3>
              <p className="text-xs text-stone-500 mt-1">성도 & 심방 관리에 접근하려면 비밀번호를 입력하세요.</p>
            </div>

            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div>
                <div className="relative">
                  <KeyRound className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={4}
                    autoFocus
                    placeholder="비밀번호 4자리"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError(false);
                    }}
                    className={`w-full pl-11 pr-4 py-3 bg-stone-50 border rounded-2xl text-center text-lg font-mono font-bold tracking-widest text-stone-900 focus:outline-none focus:ring-2 transition-all ${
                      passwordError
                        ? "border-red-500 focus:ring-red-200 bg-red-50/30"
                        : "border-stone-200 focus:border-amber-600 focus:ring-amber-100"
                    }`}
                  />
                </div>
                {passwordError && (
                  <p className="flex items-center justify-center gap-1 text-xs font-semibold text-red-600 mt-2">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>비밀번호가 올바르지 않습니다.</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-bold text-sm transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold text-sm shadow-md transition-colors"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member & Visitation Management Single Window */}
      <MemberManagementModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
      />
    </header>
  );
}
