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
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <>
              <div className="relative aspect-video bg-stone-200 rounded-3xl animate-pulse"></div>
              <div className="relative aspect-video bg-stone-200 rounded-3xl animate-pulse"></div>
            </>
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <a 
                key={post.id} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative bg-stone-950 rounded-3xl flex flex-col items-center justify-center overflow-hidden hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300"
              >
                {post.imageUrl ? (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[80vh] object-contain transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">
                    <span className="text-sm font-medium">이미지가 없습니다</span>
                  </div>
                )}
                {/* Overlay Gradient for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center text-center">
                  <h3 className="text-white text-xl sm:text-2xl font-bold font-serif leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                </div>
              </a>
            ))
          ) : (
            <>
              {/* Fallback place holder if no posts */}
              <div className="relative aspect-video bg-stone-100 rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400">
                <span className="text-sm">새로운 소식을 준비 중입니다</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
