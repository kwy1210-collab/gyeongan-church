import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filterCategory = searchParams.get('category');
    
    const rssUrl = 'https://rss.blog.naver.com/kwy1210.xml';
    const response = await fetch(rssUrl, {
      next: { revalidate: 60 } // 1분마다 캐시 갱신
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Naver Blog RSS');
    }
    
    const xml = await response.text();
    
    // <item> 블록 파싱
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    let posts = items.map((item, index) => {
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = item.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>/);
      const categoryMatch = item.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/);
      const descMatch = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
      const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
      
      const title = titleMatch ? titleMatch[1] : '';
      const link = linkMatch ? linkMatch[1] : 'https://blog.naver.com/kwy1210';
      const category = categoryMatch ? categoryMatch[1] : '목회칼럼';
      
      // Extract first image URL from description if it exists
      const imgMatch = descMatch ? descMatch[1].match(/<img[^>]+src="([^">]+)"/) : null;
      let imageUrl = imgMatch ? imgMatch[1] : null;
      
      // 사용자 요청에 따라 '예배는 행복합니다' 글의 썸네일 수동 지정 (여러 명이 나온 사진)
      if (title.includes('예배는 행복합니다')) {
        imageUrl = "https://postfiles.pstatic.net/MjAyNTA3MDlfMTIz/MDAxNzUyMDI1NTMxNDE5.I4Md8wU2tI3l8PP3WAF0unwYHld1VRwOtZa6FuSQ3oQg.YpEl2BX7HJQoQUdc1R4SaRU2eohmg682IbMFBzSK6XYg.JPEG/KakaoTalk_20250709_103944223.jpg?type=w773";
      }
      
      // HTML 태그 제거 및 길이 제한
      let summary = descMatch ? descMatch[1].replace(/<\/?[^>]+(>|$)/g, "").trim() : '';
      if (summary.length > 100) {
        summary = summary.substring(0, 100) + '...';
      }
      
      // 날짜 포맷 변환 (Sat, 14 Dec 2024 10:00:00 +0900 -> 2024.12.14)
      let dateStr = '';
      if (pubDateMatch) {
        const dateObj = new Date(pubDateMatch[1]);
        if (!isNaN(dateObj.getTime())) {
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          dateStr = `${year}.${month}.${day}`;
        }
      }
      
      // 날짜 파싱 실패시 임시로 오늘 날짜 표시 (옵션)
      if (!dateStr) {
        const today = new Date();
        dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
      }
      
      return {
        id: index + 1,
        title,
        date: dateStr,
        category,
        summary,
        link,
        imageUrl
      };
    });
    
    // Filter by category if requested
    let filteredPosts = posts;
    if (filterCategory) {
      if (filterCategory === '교회이야기') {
        filteredPosts = posts.filter(post => post.category === '교회이야기' || post.category === '교회 이야기');
      } else {
        filteredPosts = posts.filter(post => post.category === filterCategory);
      }
    }
    
    // 최신 글 1개만 반환
    const limit = filterCategory === '교회이야기' ? 1 : 3;
    
    let finalPosts = filteredPosts.slice(0, limit);
    
    return NextResponse.json(finalPosts);
  } catch (error) {
    console.error('Naver Blog Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
