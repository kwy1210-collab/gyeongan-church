// 말씀속으로 "경안교회" 데이터 레이어 및 State Management

const DEFAULT_SERMONS = [
  {
    id: "sermon_1",
    title: "경안교회 주일대예배 말씀 (7월 3주)",
    speaker: "고원영 담임목사",
    date: "2026.07.19",
    category: "주일대예배",
    youtubeId: "psjy6XhC9bM",
    passage: "시편 23편 1~6절",
    thumbnail: "https://img.youtube.com/vi/psjy6XhC9bM/hqdefault.jpg"
  },
  {
    id: "sermon_2",
    title: "믿음으로 승리하는 삶 (7월 2주)",
    speaker: "고원영 담임목사",
    date: "2026.07.12",
    category: "주일대예배",
    youtubeId: "psjy6XhC9bM",
    passage: "히브리서 11장 1~6절",
    thumbnail: "https://img.youtube.com/vi/psjy6XhC9bM/hqdefault.jpg"
  },
  {
    id: "sermon_3",
    title: "빛과 소금으로 살아가기 (7월 1주)",
    speaker: "고원영 담임목사",
    date: "2026.07.05",
    category: "주일대예배",
    youtubeId: "psjy6XhC9bM",
    passage: "마태복음 5장 13~16절",
    thumbnail: "https://img.youtube.com/vi/psjy6XhC9bM/hqdefault.jpg"
  },
  {
    id: "sermon_4",
    title: "은혜 아래 거하는 공동체 (6월 4주)",
    speaker: "고원영 담임목사",
    date: "2026.06.28",
    category: "주일대예배",
    youtubeId: "psjy6XhC9bM",
    passage: "로마서 6장 14~18절",
    thumbnail: "https://img.youtube.com/vi/psjy6XhC9bM/hqdefault.jpg"
  }
];

const DEFAULT_NEWS = [
  {
    id: "news_1",
    title: "2026년 7월 3주차 주보",
    date: "2026.07.19",
    category: "주보",
    content: "7월 3주차 주보입니다. 이번 주 공동체 소식 및 예배 순서를 확인해 주세요.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    pinned: true
  },
  {
    id: "news_2",
    title: "여름 전교인 수련회 안내 (8월 10일~12일)",
    date: "2026.07.15",
    category: "공지사항",
    content: "'말씀 안에 하나되는 공동체'라는 주제로 2026년 여름 전교인 수련회가 개최됩니다. 성도님들의 많은 참여와 기도 부탁드립니다.",
    fileUrl: "",
    pinned: true
  },
  {
    id: "news_3",
    title: "7월 성경통독 릴레이 안내",
    date: "2026.07.01",
    category: "공지사항",
    content: "매일 한 장씩 읽는 성경통독 릴레이가 진행 중입니다. 카카오톡 공식 채널을 통해 일일 통독표를 확인하실 수 있습니다.",
    fileUrl: "",
    pinned: false
  }
];

const DEFAULT_NEW_BELIEVERS = [
  {
    id: "believer_1",
    name: "홍길동",
    phone: "010-1234-5678",
    birth: "1990-05-15",
    address: "경기도 용인시 기흥구 구갈동",
    baptized: "유세례",
    motive: "지인(이은혜 성도)의 권유로 방문하게 되었습니다.",
    date: "2026.07.19 11:30"
  }
];

class ChurchStorage {
  static getSermons() {
    const data = localStorage.getItem('gy_sermons');
    return data ? JSON.parse(data) : DEFAULT_SERMONS;
  }

  static saveSermons(sermons) {
    localStorage.setItem('gy_sermons', JSON.stringify(sermons));
  }

  static addSermon(sermon) {
    const sermons = this.getSermons();
    const newSermon = { id: `sermon_${Date.now()}`, ...sermon };
    sermons.unshift(newSermon);
    this.saveSermons(sermons);
    return newSermon;
  }

  static deleteSermon(id) {
    let sermons = this.getSermons();
    sermons = sermons.filter(s => s.id !== id);
    this.saveSermons(sermons);
  }

  static getNews() {
    const data = localStorage.getItem('gy_news');
    return data ? JSON.parse(data) : DEFAULT_NEWS;
  }

  static saveNews(newsList) {
    localStorage.setItem('gy_news', JSON.stringify(newsList));
  }

  static addNews(newsItem) {
    const newsList = this.getNews();
    const newItem = { id: `news_${Date.now()}`, date: new Date().toISOString().split('T')[0].replace(/-/g, '.'), ...newsItem };
    newsList.unshift(newItem);
    this.saveNews(newsList);
    return newItem;
  }

  static deleteNews(id) {
    let newsList = this.getNews();
    newsList = newsList.filter(n => n.id !== id);
    this.saveNews(newsList);
  }

  static getNewBelievers() {
    const data = localStorage.getItem('gy_believers');
    return data ? JSON.parse(data) : DEFAULT_NEW_BELIEVERS;
  }

  static addNewBeliever(believer) {
    const believers = this.getNewBelievers();
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const newRecord = { id: `believer_${Date.now()}`, date: dateStr, ...believer };
    believers.unshift(newRecord);
    localStorage.setItem('gy_believers', JSON.stringify(believers));
    return newRecord;
  }

  static deleteNewBeliever(id) {
    let believers = this.getNewBelievers();
    believers = believers.filter(b => b.id !== id);
    localStorage.setItem('gy_believers', JSON.stringify(believers));
  }

  static getMainSermon() {
    const data = localStorage.getItem('gy_main_sermon');
    return data ? JSON.parse(data) : {
      title: "경안교회 주일 대예배 설교 말씀",
      speaker: "고원영 담임목사",
      date: "2026.07.19",
      passage: "주일 대예배 말씀",
      youtubeId: "psjy6XhC9bM"
    };
  }

  static setMainSermon(sermonData) {
    localStorage.setItem('gy_main_sermon', JSON.stringify(sermonData));
  }
}

window.ChurchStorage = ChurchStorage;
