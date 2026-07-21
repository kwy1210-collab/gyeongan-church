import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const channelId = 'UC0LYnudynbWtqTSIfHRPWrQ'; // 경안교회 채널 ID
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 3600 } // 1시간마다 캐시 갱신
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube RSS');
    }
    
    const xml = await response.text();
    
    // 간단한 정규식으로 <entry> 블록 파싱
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
    
    const videos = entries.map((entry, index) => {
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
      
      const title = titleMatch ? titleMatch[1] : '';
      const videoId = videoIdMatch ? videoIdMatch[1] : '';
      
      // 제목 파싱 로직
      // 예: "[주일] 마가복음 7장 31-35절 (하나님 하시는 일) | 2026 -7- 19 | 경안교회"
      let dateStr = publishedMatch ? publishedMatch[1].split('T')[0] : '';
      let bible = '주일예배';
      let cleanTitle = title;
      
      // 날짜 추출 (예: 2026 -7- 19)
      const dateMatch = title.match(/20\d{2}\s*-\s*\d{1,2}\s*-\s*\d{1,2}/);
      if (dateMatch) {
        dateStr = dateMatch[0].replace(/\s/g, ''); // 공백 제거 "2026-7-19"
      }
      
      // 괄호 안의 소제목 추출
      const parenMatch = title.match(/\((.*?)\)/);
      if (parenMatch) {
        cleanTitle = parenMatch[1];
      } else {
        // 괄호가 없으면 앞의 주제목 사용
        const bracketMatch = title.replace(/\[.*?\]/, '').trim();
        cleanTitle = bracketMatch.split('|')[0].trim();
      }
      
      // 성경 구절 추출 (대괄호 뒤 괄호 앞)
      const verseMatch = title.match(/\]\s*(.*?)\s*(?:\(|\|)/);
      if (verseMatch) {
        bible = verseMatch[1].trim();
      }
      
      return {
        id: (index + 1).toString(),
        title: cleanTitle,
        speaker: '고원영 담임목사',
        date: dateStr,
        bible: bible,
        videoId: videoId,
        fullTitle: title
      };
    });
    
    // '주일'이 포함된 영상만 필터링
    const sundaySermons = videos.filter(v => v.fullTitle.includes('주일'));
      
    // 주일예배 영상이 4개 이상이면 그것들 반환, 아니면 전체 중 최신 4개
    let finalVideos = sundaySermons.length >= 4 ? sundaySermons.slice(0, 4) : videos.slice(0, 4);
    
    return NextResponse.json(finalVideos);
  } catch (error) {
    console.error('YouTube Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
