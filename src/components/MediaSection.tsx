"use client";

import { useState, useEffect } from "react";
import { BookOpen, ExternalLink, Play, Calendar, User, ChevronRight } from "lucide-react";
import YoutubeIcon from "@/components/icons/YoutubeIcon";

export default function MediaSection() {
  const initialSermons = [
    {
      id: "sunday-1",
      title: "2026-7-26 주일오전예배 (겨자씨와 같은 하나님 나라)",
      speaker: "고원영 담임목사",
      date: "2026-7-26",
      bible: "마태복음 13장 31-32절",
      videoId: "meMuMncX3mI",
    },
    {
      id: "sunday-2",
      title: "2026-7-19 주일오전예배 (하나님을 평가하는 사람들)",
      speaker: "고원영 담임목사",
      date: "2026-7-19",
      bible: "누가복음 7장 31-35절",
      videoId: "psjy6XhC9bM",
    },
    {
      id: "sunday-3",
      title: "2026-7-12 주일오전예배 (어린아이가 되어야 합니다)",
      speaker: "고원영 담임목사",
      date: "2026-7-12",
      bible: "마태복음 19장 1-15절",
      videoId: "yxRySKafxOc",
    },
    {
      id: "sunday-4",
      title: "2026-7-5 주일오전예배 (곤고한 날에, 형통한 날에)",
      speaker: "고원영 담임목사",
      date: "2026-7-5",
      bible: "전도서 7장 11-14절",
      videoId: "ZxR3TXQ28Bo",
    },
  ];

  const [sermons, setSermons] = useState<any[]>(initialSermons);
  const [activeSermon, setActiveSermon] = useState(initialSermons[0]);

  useEffect(() => {
    const fetchYouTubeSermons = async () => {
      try {
        const response = await fetch(`/api/youtube?t=${Date.now()}`, { 
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            // Must contain '주일' and MUST NOT contain non-Sunday keywords
            const sundayOnly = data.filter((s: any) => {
              const t = s.title || '';
              const isSundayTitle = t.includes('주일');
              const hasWeekdayKey = t.includes('수요') || t.includes('새벽') || t.includes('말씀묵상') || t.includes('큐티') || t.includes('금요');
              return isSundayTitle && !hasWeekdayKey;
            });
            if (sundayOnly.length >= 4) {
              setSermons(sundayOnly.slice(0, 4));
              setActiveSermon(sundayOnly[0]);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch sermons', error);
      }
    };
    
    fetchYouTubeSermons();
  }, []);

  // Sample blog columns
  const initialBlogPosts = [
    {
      id: 1,
      title: "신안 촌놈의 하나님나라 여행 - 은혜의 바다에서",
      date: "2026.07.20",
      category: "목회칼럼",
      summary: "바닷바람을 맞으며 걸어온 모든 길 위에 하나님의 은혜가 깃들어 있었습니다. 오늘 우리 경안교회 성도들의 일상 속에도...",
      link: "https://blog.naver.com/kwy1210",
    },
    {
      id: 2,
      title: "일상 속에 스며드는 묵상의 시간",
      date: "2026.07.14",
      category: "말씀묵상",
      summary: "바쁜 삶의 굴레 속에서 잠시 멈추어 주님의 나직한 음성에 귀 기울이는 시간이 필요합니다. 무더위 속에서도 충만한...",
      link: "https://blog.naver.com/kwy1210",
    },
    {
      id: 3,
      title: "경안교회 가족들과 함께 나누는 기도의 제목들",
      date: "2026.07.07",
      category: "교제이야기",
      summary: "서로의 아픔을 함께 담당하고 기쁨을 배가시키는 성도의 교제야말로 이 땅에서 누리는 천국의 전초기지입니다.",
      link: "https://blog.naver.com/kwy1210",
    },
  ];

  const [blogPosts, setBlogPosts] = useState<any[]>(initialBlogPosts);

  useEffect(() => {
    const fetchNaverBlog = async () => {
      try {
        const response = await fetch('/api/naver-blog');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setBlogPosts(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch blog posts', error);
      }
    };
    
    fetchNaverBlog();
  }, []);

  return (
    <section id="media" className="py-20 bg-stone-100/70 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-800 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
            SERMON & BLOG
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-3 mb-4">
            말씀과 목회칼럼
          </h2>

        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: YouTube Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                    <YoutubeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-stone-900">최신 설교 영상</h3>
                    <p className="text-xs text-stone-500">경안교회 공식 유튜브 채널</p>
                  </div>
                </div>
                <a
                  href="https://www.youtube.com/@%EA%B2%BD%EC%95%88%EA%B5%90%ED%9A%8C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
                >
                  <span>채널 구독</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* YouTube Video Player Embed */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 shadow-md mb-6 border border-stone-800">
                <iframe
                  src={`https://www.youtube.com/embed/${activeSermon.videoId}`}
                  title={activeSermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>



              {/* Sermon Playlist Tabs */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">설교 목록</p>
                {sermons.map((sermon) => (
                  <button
                    key={sermon.id}
                    onClick={() => setActiveSermon(sermon)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                      activeSermon.id === sermon.id
                        ? "bg-amber-50 border-amber-300 text-stone-900 font-semibold shadow-sm"
                        : "bg-white border-stone-100 hover:border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                          activeSermon.id === sermon.id ? "bg-amber-700 text-white" : "bg-stone-100 text-stone-400"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{sermon.title}</p>
                        <p className="text-xs text-stone-400">{sermon.date} | {sermon.bible}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100">
              <a
                href="https://www.youtube.com/@%EA%B2%BD%EC%95%88%EA%B5%90%ED%9A%8C"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-sm transition-colors shadow-md"
              >
                <YoutubeIcon className="w-4 h-4 text-red-500" />
                <span>유튜브에서 더많은 설교 보기</span>
              </a>
            </div>
          </div>

          {/* Right Column: Pastor's Blog Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-stone-900">신안 촌놈의 하나님나라 여행기</h3>
                  </div>
                </div>
              </div>

              {/* Pastor Intro Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-2xl p-5 mb-6 shadow-md relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold mb-2">
                    <User className="w-3.5 h-3.5" />
                    <span>담임목사 고원영</span>
                  </div>
                  <h4 className="text-lg font-extrabold font-serif mb-2 leading-snug">
                    신안 촌놈의 하나님나라 여행
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed font-light mb-4">
                    하나님의 나라를 소망하는 진솔한 신앙의 고백과 목회 현장의 생생한 감동을 성도 및 이웃 여러분과 공유합니다.
                  </p>
                  <a
                    href="https://blog.naver.com/kwy1210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs px-4 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    <span>네이버 블로그 방문하기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Blog Post List */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">최신 말씀 & 칼럼</p>
                {blogPosts.map((post) => (
                  <a
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group bg-stone-50 hover:bg-emerald-50/50 p-4 rounded-2xl border border-stone-200/70 hover:border-emerald-300/80 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
                      <span className="font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <h5 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors mb-1">
                      {post.title}
                    </h5>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100">
              <a
                href="https://blog.naver.com/kwy1210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-colors shadow-md"
              >
                <span>네이버 블로그 전체 글 보기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
