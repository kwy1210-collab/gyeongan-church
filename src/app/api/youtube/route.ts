import { NextResponse } from 'next/server';

export interface SermonItem {
  id: string;
  title: string;
  speaker: string;
  date: string;
  bible: string;
  videoId: string;
  sermonSubject?: string;
}

const defaultSermons: SermonItem[] = [
  {
    id: "sunday-0",
    title: "2026-8-2 주일오전예배 (가치를 알면 선택이 달라진다)",
    speaker: "고원영 담임목사",
    date: "2026-8-2",
    bible: "마태복음 13장 44~46절",
    videoId: "Tte9mEojwcg",
    sermonSubject: "가치를 알면 선택이 달라진다"
  },
  {
    id: "sunday-1",
    title: "2026-7-26 주일오전예배 (겨자씨와 같은 하나님 나라)",
    speaker: "고원영 담임목사",
    date: "2026-7-26",
    bible: "마태복음 13장 31-32절",
    videoId: "meMuMncX3mI",
    sermonSubject: "겨자씨와 같은 하나님 나라"
  },
  {
    id: "sunday-2",
    title: "2026-7-19 주일오전예배 (하나님을 평가하는 사람들)",
    speaker: "고원영 담임목사",
    date: "2026-7-19",
    bible: "누가복음 7장 31-35절",
    videoId: "psjy6XhC9bM",
    sermonSubject: "하나님을 평가하는 사람들"
  },
  {
    id: "sunday-3",
    title: "2026-7-12 주일오전예배 (어린아이가 되어야 합니다)",
    speaker: "고원영 담임목사",
    date: "2026-7-12",
    bible: "마태복음 19장 1-15절",
    videoId: "yxRySKafxOc",
    sermonSubject: "어린아이가 되어야 합니다"
  },
  {
    id: "sunday-4",
    title: "2026-7-5 주일오전예배 (곤고한 날에, 형통한 날에)",
    speaker: "고원영 담임목사",
    date: "2026-7-5",
    bible: "전도서 7장 11-14절",
    videoId: "ZxR3TXQ28Bo",
    sermonSubject: "곤고한 날에, 형통한 날에"
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function parseSermonTitle(rawTitle: string, fallbackDate: string = '') {
  const isSunday = (rawTitle.includes('주일') || rawTitle.includes('주일예배') || rawTitle.includes('주일오전예배') || rawTitle.includes('주일설교')) &&
                   !rawTitle.includes('새벽') &&
                   !rawTitle.includes('수요') &&
                   !rawTitle.includes('금요') &&
                   !rawTitle.includes('말씀묵상') &&
                   !rawTitle.includes('큐티') &&
                   !rawTitle.includes('기도회');

  if (!isSunday) return null;

  // 1. Extract Date
  let dateStr = '';
  const dateMatch = rawTitle.match(/20\d{2}\s*[-./]\s*\d{1,2}\s*[-./]\s*\d{1,2}/);
  if (dateMatch) {
    const parts = dateMatch[0].split(/[-./]/).map((p) => p.trim());
    dateStr = `${parts[0]}-${parseInt(parts[1], 10)}-${parseInt(parts[2], 10)}`;
  } else if (fallbackDate) {
    const parts = fallbackDate.split('T')[0].split('-');
    if (parts.length >= 3) {
      dateStr = `${parts[0]}-${parseInt(parts[1], 10)}-${parseInt(parts[2], 10)}`;
    }
  }

  // 2. Extract Bible Verse
  let bible = '주일오전예배';
  const verseMatch1 = rawTitle.match(/([가-힣1-3]+\s*\d+\s*장\s*[\d\s~,-]+절)/);
  const verseMatch2 = rawTitle.match(/([가-힣1-3]+\s*\d+\s*:\s*[\d\s~,-]+)/);
  if (verseMatch1) {
    bible = verseMatch1[1].trim();
  } else if (verseMatch2) {
    const vStr = verseMatch2[1].trim();
    const colonParts = vStr.match(/([가-힣1-3]+)\s*(\d+)\s*:\s*([\d\s~,-]+)/);
    if (colonParts) {
      bible = `${colonParts[1]} ${colonParts[2]}장 ${colonParts[3].trim()}절`;
    } else {
      bible = vStr;
    }
  }

  // 3. Extract Sermon Subject
  let sermonSubject = '';
  const parenMatches = [...rawTitle.matchAll(/\((.*?)\)/g)];
  for (const pm of parenMatches) {
    const content = pm[1].trim();
    if (!content.includes(':') && !content.includes('장')) {
      sermonSubject = content;
      break;
    }
  }

  if (!sermonSubject) {
    let clean = rawTitle
      .replace(/\[.*?\]/g, '')
      .replace(/20\d{2}\s*[-./]\s*\d{1,2}\s*[-./]\s*\d{1,2}/g, '')
      .replace(/경안교회/g, '')
      .replace(/주일예배|주일오전예배|주일설교/g, '')
      .replace(/([가-힣1-3]+\s*\d+\s*장\s*[\d\s~,-]+절)/g, '')
      .replace(/([가-힣1-3]+\s*\d+\s*:\s*[\d\s~,-]+)/g, '')
      .replace(/\|/g, '')
      .replace(/\(.*?\)/g, '')
      .trim();

    if (clean) {
      sermonSubject = clean;
    }
  }

  let finalTitle = dateStr ? `${dateStr} 주일오전예배` : '주일오전예배';
  if (sermonSubject) {
    finalTitle += ` (${sermonSubject})`;
  }

  return {
    date: dateStr,
    bible: bible,
    title: finalTitle,
    sermonSubject
  };
}

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
  const match = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/) || html.match(/ytInitialData\s*=\s*(\{[\s\S]*?\});/);
  if (!match) return [];

  let data: any;
  try {
    data = JSON.parse(match[1]);
  } catch (e) {
    return [];
  }

  function findVideos(obj: any) {
    if (!obj || typeof obj !== 'object') return;

    if (obj.lockupViewModel) {
      const lockup = obj.lockupViewModel;
      const contentId = lockup.contentId;
      const rawTitle = lockup.metadata?.lockupMetadataViewModel?.title?.content || '';

      if (contentId && rawTitle) {
        const parsed = parseSermonTitle(rawTitle);
        if (parsed) {
          sermons.push({
            id: `yt-${contentId}`,
            title: parsed.title,
            speaker: '고원영 담임목사',
            date: parsed.date,
            bible: parsed.bible,
            videoId: contentId,
            sermonSubject: parsed.sermonSubject
          });
        }
      }
    }

    for (const k of Object.keys(obj)) {
      findVideos(obj[k]);
    }
  }

  findVideos(data);
  return sermons;
}

async function fetchFromRSSFeed(): Promise<SermonItem[]> {
  const channelId = 'UC0LYnudynbWtqTSIfHRPWrQ';
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    cache: 'no-store'
  });
  if (!response.ok) return [];

  const xml = await response.text();
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

  const sermons: SermonItem[] = [];

  for (const entry of entries) {
    const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>(.*?)<\/title>/);
    const publishedMatch = entry.match(/<published>(.*?)<\/published>/);

    const rawTitle = titleMatch ? titleMatch[1].trim() : '';
    const videoId = videoIdMatch ? videoIdMatch[1].trim() : '';
    const published = publishedMatch ? publishedMatch[1].trim() : '';

    const parsed = parseSermonTitle(rawTitle, published);
    if (parsed) {
      sermons.push({
        id: `yt-${videoId}`,
        title: parsed.title,
        speaker: '고원영 담임목사',
        date: parsed.date,
        bible: parsed.bible,
        videoId: videoId,
        sermonSubject: parsed.sermonSubject
      });
    }
  }

  return sermons;
}

export async function GET() {
  try {
    const rawList: SermonItem[] = [];

    // 1. Fetch from Channel Page
    try {
      const channelList = await fetchFromChannelPage();
      rawList.push(...channelList);
    } catch (e) {
      console.error('Channel page fetch failed:', e);
    }

    // 2. Fetch from RSS Feed
    try {
      const rssList = await fetchFromRSSFeed();
      rawList.push(...rssList);
    } catch (e) {
      console.error('RSS fetch failed:', e);
    }

    // 3. Fallback to default sermons
    rawList.push(...defaultSermons);

    // 4. Group by date and choose highest quality sermon entry
    const dateMap = new Map<string, SermonItem>();

    for (const item of rawList) {
      if (!item.date) continue;

      const existing = dateMap.get(item.date);
      if (!existing) {
        dateMap.set(item.date, item);
      } else {
        const score = (s: SermonItem) =>
          (s.sermonSubject ? 2 : 0) +
          (s.bible && s.bible !== '주일오전예배' ? 1 : 0) +
          (s.videoId === 'Tte9mEojwcg' ? 1 : 0);
        if (score(item) > score(existing)) {
          dateMap.set(item.date, item);
        }
      }
    }

    const SundaySermons = Array.from(dateMap.values());

    // 5. Sort descending by date
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
    return NextResponse.json(defaultSermons.slice(0, 4), {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
}
