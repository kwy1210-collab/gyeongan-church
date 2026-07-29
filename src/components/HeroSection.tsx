"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Heart } from "lucide-react";
import YoutubeIcon from "@/components/icons/YoutubeIcon";

const heroImages = [
  { src: "/hero-bg.jpg", fit: "object-cover object-center" },
  { src: "/hero-bg-2.jpg", fit: "object-cover object-center" },
  { src: "/hero-bg-3.jpg", fit: "object-contain" },
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // 5초마다 배경 변경

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative min-h-[90vh] flex flex-col justify-end pt-24 pb-16 overflow-hidden">
      {/* Background Hero Image Carousel */}
      <div className="absolute inset-0 z-0 bg-stone-900">
        {heroImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={`경안교회 배경 ${index + 1}`}
            fill
            priority={index === 0}
            quality={100}
            sizes="100vw"
            className={`${image.fit} transition-all duration-1000 ease-in-out ${
              index === currentImageIndex 
                ? "opacity-100 scale-100" 
                : (image.fit.includes('contain') ? "opacity-0 scale-95" : "opacity-0 scale-105")
            }`}
          />
        ))}
        
        {/* Darkening & Blurring Overlay for Text Readability */}
        <div className="absolute inset-0 bg-stone-950/50 backdrop-blur-[4px] z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mb-8">
        
        {/* Denomination Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/60 backdrop-blur-md border border-amber-500/30 mb-6 shadow-xl">
          <span className="text-xs sm:text-sm font-bold text-amber-200 tracking-wider">
            예수교대한성결교회 경안교회
          </span>
        </div>

        {/* Vision Text */}
        <div className="mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif leading-relaxed sm:leading-snug drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wide">
            복음을 통해 구원으로 부름받고,<br className="hidden sm:block" />
            훈련을 통해 성숙한 신자로 세워지고,<br className="hidden sm:block" />
            삶의 자리에서 그리스도의 향기를 나타냄으로 <br className="hidden sm:block" />
            하나님나라를 구현하는 공동체
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#media"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-base backdrop-blur-md border border-white/25 transition-all duration-200 shadow-md hover:scale-105"
          >
            <YoutubeIcon className="w-4 h-4 text-red-400" />
            <span>최신 설교 보기</span>
          </a>
          <a
            href="#worship"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-amber-900/40 hover:scale-105"
          >
            <Calendar className="w-4 h-4" />
            <span>예배 안내</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#happylife"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 font-bold text-base backdrop-blur-md border border-emerald-700/60 transition-all duration-200 shadow-md hover:scale-105"
          >
            <Heart className="w-4 h-4 text-emerald-400" />
            <span>행복한교회생활</span>
          </a>
        </div>
      </div>
    </section>
  );
}
