import { Phone, MapPin, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Info (Left 5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <p className="text-xs text-amber-500 font-bold uppercase tracking-wider">
                예수교대한성결교회
              </p>
              <h3 className="text-2xl font-extrabold text-stone-100 font-serif">
                경안교회
              </h3>
            </div>


            <div className="flex items-center gap-4 text-xs pt-2">
              <a
                href="https://www.youtube.com/@%EA%B2%BD%EC%95%88%EA%B5%90%ED%9A%8C"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-red-950/60 text-stone-300 hover:text-red-400 border border-stone-800 transition-colors"
              >
                유튜브 채널
              </a>
              <a
                href="https://blog.naver.com/kwy1210"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-emerald-950/60 text-stone-300 hover:text-emerald-400 border border-stone-800 transition-colors"
              >
                네이버 블로그
              </a>
            </div>
          </div>

          {/* Contact & Location (Middle 4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider font-serif">
              교회 안내 & 상담
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>부천시 안곡로 86번길 21 (괴안동)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>담임목사 신앙상담: <a href="tel:010-2074-0691" className="text-amber-400 font-bold hover:underline">010-2074-0691</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-500 shrink-0" />
                <span>담임목사: 고원영 목사</span>
              </li>
            </ul>
          </div>

          {/* Navigation Links (Right 3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider font-serif">
              빠른 메뉴
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">우리교회 소개</a>
              </li>
              <li>
                <a href="#worship" className="hover:text-amber-400 transition-colors">예배 및 모임 안내</a>
              </li>
              <li>
                <a href="#media" className="hover:text-amber-400 transition-colors">설교 동영상 / 목회칼럼</a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">오시는 길 (지도)</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} 예수교대한성결교회 경안교회. All rights reserved.</p>
          <a
            href="#about"
            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400 transition-colors"
          >
            <span>맨 위로 이동</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
