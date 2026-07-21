import { HeartHandshake, Bell, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export default function ChurchNewsSection() {
  const notices = [
    {
      id: 1,
      title: "2026년 하반기 새가족 성경공부 모임 개강 안내",
      date: "2026.07.18",
      category: "공지사항",
      isNew: true,
    },
    {
      id: 2,
      title: "여름 구역별 찬양 축제 및 교제 순서 안내",
      date: "2026.07.11",
      category: "교회 소식",
      isNew: false,
    },
    {
      id: 3,
      title: "전교인 특별 새벽기도회 및 금식 기도의 날",
      date: "2026.07.04",
      category: "기도회",
      isNew: false,
    },
  ];

  const newFamilySteps = [
    { step: "01", title: "방문 및 안내", desc: "안내위원의 따뜻한 맞이와 주보 안내를 받습니다." },
    { step: "02", title: "새가족 등록", desc: "등록 카드를 작성하시고 선물과 안내 책자를 받습니다." },
    { step: "03", title: "바나바 만남", desc: "전담 바나바 일대일 멘토와 교제를 시작합니다." },
    { step: "04", title: "새가족 교육", desc: "4주간의 기본 성경공부와 경안교회 가족이 됩니다." },
  ];

  return (
    <section id="news" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 tracking-wider uppercase bg-amber-900/40 border border-amber-500/30 px-3 py-1 rounded-full">
            COMMUNITY & NEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-100 mt-3 mb-4">
            교회 소식 & 새가족 안내
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            경안교회는 처음 찾아오시는 분들을 주님의 사랑으로 온전히 환영합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* New Family Welcome Card (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-stone-800 to-stone-850 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-100">새가족을 환영합니다</h3>
                <p className="text-xs text-stone-400">경안교회와의 첫 만남, 언제든 편안하게 방문해 주세요.</p>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed mb-8 font-light">
              예수 그리스도의 은혜 안에서 새 삶의 출발을 꿈꾸는 여러분을 진심으로 축복합니다.
              처음 방문하시더라도 부담 없이 안내를 받으실 수 있도록 온 성도가 기도로 준비하고 있습니다.
            </p>

            {/* 4 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {newFamilySteps.map((item) => (
                <div key={item.step} className="bg-stone-900/80 rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-black text-amber-400 bg-amber-900/40 px-2 py-0.5 rounded">
                      STEP {item.step}
                    </span>
                    <h4 className="text-sm font-bold text-stone-100">{item.title}</h4>
                  </div>
                  <p className="text-xs text-stone-400 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>담임목사 일대일 신앙상담 문의 가능</span>
              </div>
              <a
                href="tel:010-2074-0691"
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 transition-colors shadow-md"
              >
                <span>새가족 상담 010-2074-0691</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Notice & Bulletins (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-stone-800/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold font-serif text-stone-100">교회 공지사항</h3>
                </div>
                <span className="text-xs text-stone-400">최신 주보 및 소식</span>
              </div>

              <div className="space-y-3 mb-6">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-4 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                      <span className="text-amber-400 font-semibold">{notice.category}</span>
                      <span>{notice.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-200 hover:text-white line-clamp-1">
                      {notice.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Bulletin Download Card */}
            <div className="bg-stone-900 rounded-2xl p-4 border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-amber-300 font-bold">금주 주보 보기</p>
                  <p className="text-xs text-stone-400">이번 주 주일 예배 순서지</p>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200 transition-colors border border-white/10">
                다운로드
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
