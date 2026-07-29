"use client";

import { useState, useEffect } from "react";

export default function HappyLifeSection() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await fetch("/api/naver-blog?category=교회이야기");
        if (res.ok) {
          const data = await res.json();
          setBlogPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch church story posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchBlogPosts();
  }, []);

  return (
    <section id="happylife" className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Happy Church Life
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900 mt-3 mb-4">
            행복한교회생활
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            경안교회는 성도님들의 삶이 예수님 안에서 풍성해지도록 돕습니다. <br className="hidden sm:block" />
            함께 울고 함께 웃는 따뜻한 신앙 공동체를 누려보세요.
          </p>
        </div>

        {/* Blog Image Grid */}
        <div className="max-w-xl mx-auto space-y-6">
          {isLoading ? (
            <div className="relative aspect-[4/3] bg-stone-200 rounded-3xl animate-pulse" />
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <a 
                key={post.id} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block bg-stone-950 rounded-3xl overflow-hidden border border-stone-800/90 shadow-xl transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Natural Un-cropped Photo Frame */}
                <div className="w-full bg-stone-950 flex flex-col items-center">
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block rounded-t-3xl"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-56 bg-stone-900 flex items-center justify-center text-stone-400">
                      <span className="text-sm font-medium">이미지가 없습니다</span>
                    </div>
                  )}
                  
                  {/* Title Bar */}
                  <div className="w-full bg-stone-950 border-t border-stone-800/80 py-4 px-5 sm:px-6 text-center">
                    <h3 className="text-white text-base sm:text-lg font-bold font-serif leading-snug group-hover:text-amber-200 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <>
              {/* Fallback place holder if no posts */}
              <div className="relative aspect-[4/3] bg-stone-100 rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400">
                <span className="text-sm">새로운 소식을 준비 중입니다</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
