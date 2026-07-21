import { Clock, MapPin, Users, Heart, Shield, Sparkles } from "lucide-react";

export default function WorshipSection() {
  const sundayWorships: Array<{name: string, time: string, location: string, description: string, highlight?: boolean, badge?: string}> = [
    {
      name: "주일예배",
      time: "주일 오전 11:00",
      location: "2층 예배실",
      description: "온 성도가 모여 드리는 경안교회 메인 예배",
      highlight: true,
    },
    {
      name: "목장예배",
      time: "주일 오후 02:00",
      location: "목장별 모임장소",
      description: "생명의 나눔이 있는 소그룹 모임",
    },
  ];

  const weekdayWorships = [
    {
      name: "수요 기도회",
      time: "수요일 오후 07:30",
      location: "2층 예배실",
      description: "한 주의 중간, 영적 충전을 위한 말씀과 기도",
    },
    {
      name: "금요 심야기도회",
      time: "금요일 오후 09:00",
      location: "2층 예배실",
      description: "부르짖어 기도하는 성령 충만 기도회",
    },
    {
      name: "새벽 기도회 (말씀은 큐티영상으로)",
      time: "월~금 오전 05:30 - 자유롭게 개인기도",
      location: "2층 비전홀",
      description: "매일 아침을 말씀과 기도로 시작하는 모임",
    },
  ];

  const nextGen = [
    {
      dept: "주일학교",
      time: "주일 오전 09:30",
      place: "1층 교육관",
    },
    {
      dept: "청소년부 (중고등부)",
      time: "주일 오후 02:00",
      place: "2층 예배실",
    },
    {
      dept: "청년부 (청년공동체)",
      time: "주일 오후 02:00",
      place: "3층 목양실",
    },
  ];

  return (
    <section id="worship" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            WORSHIP TIME
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-3 mb-4">
            예배 및 모임 안내
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            경안교회는 하나님을 참되게 예배하고 기도로 소통하는 거룩한 모임을 지향합니다.
          </p>
        </div>

        {/* Sunday Worship Grid */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-2xl font-bold font-serif text-stone-900">주일 예배</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
            {sundayWorships.map((item, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                  item.highlight
                    ? "bg-gradient-to-br from-amber-900 via-amber-950 to-stone-900 text-white shadow-xl ring-2 ring-amber-500/50 scale-102"
                    : "bg-stone-50 hover:bg-stone-100/80 text-stone-900 border border-stone-200/80 shadow-md"
                }`}
              >
                <div className={`flex items-center ${item.badge ? 'justify-between' : 'justify-end'} mb-4`}>
                  {item.badge && (
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        item.highlight
                          ? "bg-amber-500/30 text-amber-200 border border-amber-400/30"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      item.highlight ? "bg-amber-500/20 text-amber-300" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <h4 className={`text-xl font-bold font-serif mb-2 ${item.highlight ? "text-amber-100" : "text-stone-900"}`}>
                  {item.name}
                </h4>

                <div className="space-y-2 mb-4">
                  <p className={`text-2xl font-black ${item.highlight ? "text-amber-300" : "text-amber-800"}`}>
                    {item.time}
                  </p>
                  <p className={`flex items-center gap-1.5 text-xs font-semibold ${item.highlight ? "text-stone-300" : "text-stone-500"}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </p>
                </div>

                <p className={`text-xs leading-relaxed ${item.highlight ? "text-stone-300" : "text-stone-600"}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekday Prayer Meetings */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-amber-600" />
            <h3 className="text-2xl font-bold font-serif text-stone-900">주중 예배 및 기도회</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {weekdayWorships.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-amber-800 font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-900">{item.name}</h4>
                </div>
                <p className="text-xl font-bold text-stone-800 mb-1">{item.time}</p>
                <p className="text-xs text-stone-500 flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{item.location}</span>
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Generation / Church School */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-amber-600" />
            <h3 className="text-2xl font-bold font-serif text-stone-900">다음세대 (교회학교)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto gap-6">
            {nextGen.map((dept, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-amber-700" />
                  <h4 className="text-base font-bold text-stone-900">{dept.dept}</h4>
                </div>
                <p className="text-sm font-semibold text-amber-800 mb-1">{dept.time}</p>
                <p className="text-xs text-stone-500">{dept.place}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
