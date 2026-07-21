import { MapPin, Phone, Navigation, Bus, Car, ExternalLink, Clock } from "lucide-react";

export default function LocationSection() {
  const address = "부천시 안곡로 86번길 21";
  const fullAddress = "경기도 부천시 소사구 안곡로 86번길 21 (괴안동)";

  // Encoded map links
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent("부천 경안교회")}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent("부천 경안교회")}`;

  return (
    <section id="location" className="py-24 bg-stone-50 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
            LOCATION & CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-3 mb-4">
            오시는 길 & 연락처
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            경안교회는 성도님들과 방문자분들을 기쁨으로 맞이할 준비가 되어 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Card (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Address Header */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">교회 주소</span>
                  <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">{address}</h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">{fullAddress}</p>
                </div>
              </div>

              {/* Pastor Contact Card with direct call */}
              <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-2xl p-5 border border-amber-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-800" />
                    <span className="text-xs font-bold text-amber-900">담임목사 신앙상담 / 문의</span>
                  </div>
                  <span className="text-xs font-bold bg-amber-800 text-white px-2 py-0.5 rounded">고원영 목사</span>
                </div>
                <a
                  href="tel:010-2074-0691"
                  className="block text-2xl font-black text-amber-900 hover:text-amber-700 transition-colors my-1 tracking-tight"
                >
                  010-2074-0691
                </a>
                <p className="text-xs text-stone-500">
                  모바일 접속 시 위 번호를 터치하면 바로 전화 연결이 가능합니다.
                </p>
              </div>

              {/* Public Transport */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Bus className="w-4 h-4 text-stone-600" />
                  <span>대중교통 안내</span>
                </h4>
                <div className="bg-stone-50 rounded-xl p-3 text-xs text-stone-600 space-y-1.5 border border-stone-200/60">
                  <p><strong className="text-stone-800">지하철:</strong> 1호선 역곡역 또는 소사역 하차 후 마을버스 이용</p>
                  <p><strong className="text-stone-800">버스:</strong> 안곡로86번길 주변 버스정류장 도보 3분 거리</p>
                </div>
              </div>

              {/* Parking */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Car className="w-4 h-4 text-stone-600" />
                  <span>주차 안내</span>
                </h4>
                <div className="bg-stone-50 rounded-xl p-3 text-xs text-stone-600 border border-stone-200/60">
                  <p>교회 전용 주차장 및 주변 안심 주차 구역을 이용하실 수 있습니다.</p>
                </div>
              </div>
            </div>

            {/* Nav Apps External Buttons */}
            <div className="pt-4 border-t border-stone-100">
              <p className="text-xs font-bold text-stone-400 mb-2">모바일 길찾기 앱 연결</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={kakaoMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>카카오맵</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href={naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>네이버지도</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 min-h-[420px] flex flex-col">
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between text-xs px-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-stone-200">경안교회 지도 위치</span>
              </div>
              <span className="text-stone-400">부천시 안곡로 86번길 21</span>
            </div>
            <div className="relative w-full h-full min-h-[380px] grow bg-stone-200">
              <iframe
                title="경안교회 지도 위치"
                src="https://maps.google.com/maps?q=%EB%B6%80%EC%B2%84%EC%8B%9C%20%EC%95%88%EA%B3%A0%EB%A1%9C%2086%EB%B2%88%EA%B8%B8%2021&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
