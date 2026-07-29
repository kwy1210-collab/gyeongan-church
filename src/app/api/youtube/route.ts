import { NextResponse } from 'next/server';

interface SermonItem {
  id: string;
  title: string;
  speaker: string;
  date: string;
  bible: string;
  videoId: string;
}

const defaultSermons: SermonItem[] = [
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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchFromChannelPage(): Promise<SermonItem[]> {
  const sermons: SermonItem[] = [];
  const res = await fetch('https://www.youtube.com/@%EA%B2%BD%EC%95%88%EA%B5%90%ED%9A%8C/videos', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ko-KR,ko;q=0.9'
    },
    cache: 'no-store'
  });
  if (!res.ok) return [];

  const html = await res.text();
  const match = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/);
  if (!match) return [];

  const data = JSON.parse(match[1]);

  function findVideos(obj: any) {
    if (!obj || typeof obj !== 'object') return;

    if (obj.lockupViewModel) {
      const lockup = obj.lockupViewModel;
      const contentId = lockup.contentId;
      const rawTitle = lockup.metadata?.lockupMetadataViewModel?.title?.content || '';

      if (contentId && rawTitle) {
        const isSunday = (rawTitle.includes('주일') || rawTitle.includes('주일예배') || rawTitle.includes('주일오전예배') || rawTitle.includes('주일설교')) &&
                         !rawTitle.includes('새벽') &&
                         !rawTitle.includes('수요') &&
                         !rawTitle.includes('금요') &&
                         !rawTitle.includes('말씀묵상') &&
                         !rawTitle.includes('큐티');

        if (isSunday) {
          let dateStr = '';
          const dateMatch = rawTitle.match(/20\d{2}\s*-\s*\d{1,2}\s*-\s*\d{1,2}/);
          if (dateMatch) {
            const parts = dateMatch[0].split('-').map((p: string) => p.trim());
            dateStr = `${parts[0]}-${parts[1]}-${parts[2]}`;
          }

          let bible = '주일오전예배';
          const verseMatch = rawTitle.match(/([가-힣]+\s*\d+장\s*[\d\s~-]+절)/);
          if (verseMatch) {
            bible = verseMatch[1].trim();
          }

          let cleanTitle = '';
          const parenMatch = rawTitle.match(/\((.*?)\)/);
          if (parenMatch) {
            cleanTitle = `${dateStr} 주일오전예배 (${parenMatch[1].trim()})`;
          } else {
            cleanTitle = `${dateStr} 주일오전예배`;
          }

          sermons.push({
            id: `yt-${contentId}`,
            title: cleanTitle,
            speaker: '고원영 담임목사',
            date: dateStr,
            bible: bible,
            videoId: contentId
          });
        }
      }
    }

    for (const k of Object.keys(obj)) {
      findVideos(obj[k]);
    }
  }

  findVideos(data);

  const uniqueMap = new Map<string, SermonItem>();
  for (const s of sermons) {
    if (!uniqueMap.has(s.videoId)) {
      uniqueMap.set(s.videoId, s);
    }
  }
  return Array.from(uniqueMap.values());
}

async function fetchFromRSSFeed(): Promise<SermonItem[]> {
  const channelId = 'UC0LYnudynbWtqTSIfHRPWrQ';
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    cache: 'no-store'
  });
  if (!response.ok) return [];

  const xml = await response.text();
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

  const sermons: (SermonItem & { hasParen: boolean })[] = [];

  for (const entry of entries) {
    const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>(.*?)<\/title>/);
    const publishedMatch = entry.match(/<published>(.*?)<\/published>/);

    const rawTitle = titleMatch ? titleMatch[1].trim() : '';
    const videoId = videoIdMatch ? videoIdMatch[1].trim() : '';
    let pubDate = publishedMatch ? publishedMatch[1].split('T')[0] : '';

    const isSunday = (rawTitle.includes('주일') || rawTitle.includes('주일예배') || rawTitle.includes('주일오전예배') || rawTitle.includes('주일설교')) &&
                     !rawTitle.includes('새벽') &&
                     !rawTitle.includes('수요') &&
                     !rawTitle.includes('금요') &&
                     !rawTitle.includes('말씀묵상') &&
                     !rawTitle.includes('큐티');

    if (!isSunday) continue;

    let dateStr = pubDate;
    const dateMatch = rawTitle.match(/20\d{2}\s*-\s*\d{1,2}\s*-\s*\d{1,2}/);
    if (dateMatch) {
      const parts = dateMatch[0].split('-').map((p: string) => p.trim());
      dateStr = `${parts[0]}-${parts[1]}-${parts[2]}`;
    }

    let bible = '주일오전예배';
    const verseMatch = rawTitle.match(/([가-힣]+\s*\d+장\s*[\d\s~-]+절)/);
    if (verseMatch) {
      bible = verseMatch[1].trim();
    }

    let cleanTitle = '';
    const parenMatch = rawTitle.match(/\((.*?)\)/);
    if (parenMatch) {
      cleanTitle = `${dateStr} 주일오전예배 (${parenMatch[1].trim()})`;
    } else {
      cleanTitle = `${dateStr} 주일오전예배`;
    }

    sermons.push({
      id: `yt-${videoId}`,
      title: cleanTitle,
      speaker: '고원영 담임목사',
      date: dateStr,
      bible: bible,
      videoId: videoId,
      hasParen: !!parenMatch
    });
  }

  const byDate = new Map<string, typeof sermons[0]>();
  for (const v of sermons) {
    if (!byDate.has(v.date) || v.hasParen) {
      byDate.set(v.date, v);
    }
  }

  return Array.from(byDate.values());
}

export async function GET() {
  try {
    let SundaySermons: SermonItem[] = [];

    // Try YouTube channel page scraping first
    try {
      SundaySermons = await fetchFromChannelPage();
    } catch (e) {
      console.error('Channel page fetch failed:', e);
    }

    // Merge with RSS feed if needed
    if (SundaySermons.length < 4) {
      try {
        const rssSermons = await fetchFromRSSFeed();
        const existingIds = new Set(SundaySermons.map(s => s.videoId));
        for (const s of rssSermons) {
          if (!existingIds.has(s.videoId)) {
            SundaySermons.push(s);
          }
        }
      } catch (e) {
        console.error('RSS fetch failed:', e);
      }
    }

    // Merge with defaults if still less than 4
    const fetchedIds = new Set(SundaySermons.map(s => s.videoId));
    const fetchedDates = new Set(SundaySermons.map(s => s.date));

    for (const def of defaultSermons) {
      if (!fetchedDates.has(def.date) && !fetchedIds.has(def.videoId)) {
        SundaySermons.push(def);
      }
    }

    // Sort descending by date (newest first)
    SundaySermons.sort((a, b) => {
      const parseDate = (dStr: string) => {
        const parts = dStr.split('-').map(Number);
        if (parts.length >= 3 && !isNaN(parts[0])) {
          return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
        }
        return 0;
      };
      return parseDate(b.date) - parseDate(a.date);
    });

    const finalVideos = SundaySermons.slice(0, 4);

    return NextResponse.json(finalVideos, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('YouTube Fetch Error:', error);
    return NextResponse.json(defaultSermons, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
}
