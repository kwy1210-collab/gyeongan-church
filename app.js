// 말씀속으로 "경안교회" App Controller Logic (One-Page Scroll Version)

let isAdminLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
  // Clear obsolete cache to update pastor name & recent 3-week Sunday sermons immediately
  if (localStorage.getItem('gy_sermons')) {
    const sermonsStr = localStorage.getItem('gy_sermons');
    if (sermonsStr.includes('김경안') || sermonsStr.includes('수요기도회')) {
      localStorage.removeItem('gy_sermons');
      localStorage.removeItem('gy_main_sermon');
    }
  }

  // Initial Rendering
  renderMainSermonPlayers();
  renderHomeView();
  renderNewsPage();
});

// 1. HOME VIEW RENDER (Recent 3 Weeks Sermons)
function renderHomeView() {
  const sermons = ChurchStorage.getSermons().slice(0, 3);
  const homeSermonGrid = document.getElementById('home-sermon-grid');
  
  if (homeSermonGrid) {
    homeSermonGrid.innerHTML = sermons.map(s => createSermonCardHtml(s)).join('');
  }
}

// Render Main Sermon Video Players cleanly without YouTube Error 153 (file:// domain safe)
function renderMainSermonPlayers() {
  const sermons = ChurchStorage.getSermons();
  const latestSermon = sermons[0] || {
    title: "경안교회 주일 대예배 설교 말씀",
    speaker: "고원영 담임목사",
    date: "2026.07.19",
    passage: "시편 23편 1~6절",
    youtubeId: "psjy6XhC9bM"
  };

  const videoId = latestSermon.youtubeId || "psjy6XhC9bM";
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;

  // Error 153 Safe Video Card Player
  const playerContent = `
    <div style="position: relative; width: 100%; height: 100%; min-height: 360px; background: #0F172A; border-radius: var(--radius-md); overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-md);">
      <img src="${thumbUrl}" alt="${latestSermon.title}" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; opacity: 0.85; filter: brightness(0.9);">
      <div style="position: absolute; top:0; left:0; right:0; bottom:0; background: linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.75) 100%);"></div>

      <!-- Play Action Overlay -->
      <div style="position: relative; z-index: 10; text-align: center; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 14px;">
        <button onclick="openSermonModal('${latestSermon.id || 'sermon_1'}')" style="width: 80px; height: 80px; background: #FF0000; color: white; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 30px rgba(255, 0, 0, 0.5); transition: transform 0.2s ease;">
          <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24" style="margin-left: 4px;"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <div>
          <h4 style="color: white; font-size: 1.25rem; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.6); margin-bottom: 4px;">
            ${latestSermon.title}
          </h4>
          <p style="color: #F1F5F9; font-size: 0.92rem; font-weight: 600; text-shadow: 0 1px 3px rgba(0,0,0,0.6);">
            ${latestSermon.speaker || '고원영 담임목사'} | ${latestSermon.passage || '주일 대예배'}
          </p>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 6px;">
          <button onclick="openSermonModal('${latestSermon.id || 'sermon_1'}')" class="btn btn-primary btn-sm" style="background: var(--primary); font-weight: 700;">
            ▶ 설교 영상 시청하기
          </button>
          <a href="${youtubeLink}" target="_blank" class="btn btn-secondary btn-sm" style="background: rgba(255, 255, 255, 0.9); color: #1E293B; font-weight: 700;">
            유튜브 앱으로 보기 ↗
          </a>
        </div>
      </div>
    </div>
  `;

  const homeContainer = document.getElementById('home-main-sermon-player-container');
  if (homeContainer) {
    homeContainer.innerHTML = playerContent;
  }

  const sermonsContainer = document.getElementById('sermons-main-player-container');
  if (sermonsContainer) {
    sermonsContainer.innerHTML = playerContent;
  }

  const homeTitle = document.getElementById('home-main-sermon-title');
  if (homeTitle) {
    homeTitle.innerText = `${latestSermon.title} (${latestSermon.speaker || '고원영 담임목사'})`;
  }

  const homePassage = document.getElementById('home-main-sermon-passage');
  if (homePassage && latestSermon.passage) {
    homePassage.innerText = latestSermon.passage;
  }
}

// 2. SERMON CARD HTML CREATOR
function createSermonCardHtml(sermon) {
  return `
    <div class="sermon-card" onclick="openSermonModal('${sermon.id}')">
      <div class="sermon-thumb">
        <img src="${sermon.thumbnail}" alt="${sermon.title}">
        <div class="play-badge">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      <div class="sermon-body">
        <div class="sermon-meta">
          <span class="category-tag">${sermon.category}</span>
          <span>${sermon.date}</span>
        </div>
        <h3 class="sermon-card-title">${sermon.title}</h3>
        <p class="sermon-passage">📖 ${sermon.passage}</p>
        <div class="sermon-footer">
          <span>${sermon.speaker}</span>
          <span style="color: var(--accent-gold); font-weight: 700;">시청하기 →</span>
        </div>
      </div>
    </div>
  `;
}

// 3. NEWS ITEM HTML CREATOR
function createNewsItemHtml(news) {
  const badgeClass = news.category === '주보' ? 'bulletin' : 'notice';
  return `
    <div class="news-item" onclick="openNewsModal('${news.id}')">
      <div class="news-info">
        <span class="news-badge ${badgeClass}">${news.category}</span>
        <span class="news-title">${news.title}</span>
      </div>
      <span class="news-date">${news.date}</span>
    </div>
  `;
}

// 4. NEWS PAGE RENDER
function renderNewsPage() {
  const newsList = ChurchStorage.getNews();
  const container = document.getElementById('news-page-list');
  if (container) {
    container.innerHTML = newsList.map(n => createNewsItemHtml(n)).join('');
  }
}

// 5. MODALS LOGIC
function openSermonModal(id) {
  const sermons = ChurchStorage.getSermons();
  const sermon = sermons.find(s => s.id === id);
  if (!sermon) return;

  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  modalTitle.innerText = `${sermon.title} - ${sermon.speaker}`;
  
  const videoSrc = sermon.youtubeId 
    ? `https://www.youtube.com/embed/${sermon.youtubeId}?autoplay=1` 
    : `https://www.youtube.com/embed/psjy6XhC9bM?autoplay=1`;

  modalBody.innerHTML = `
    <div style="position: relative; padding-top: 56.25%; width: 100%; background: #000; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 16px;">
      <iframe style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;" 
        src="${videoSrc}" 
        title="${sermon.title}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
    <div style="font-size: 0.95rem; line-height: 1.6;">
      <p style="margin-bottom: 6px;"><strong>말씀 본문:</strong> <span style="color: var(--accent-gold); font-weight:700;">${sermon.passage}</span></p>
      <p style="margin-bottom: 6px;"><strong>설교 일자:</strong> ${sermon.date} (${sermon.category})</p>
      <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <span style="color: var(--text-muted); font-size: 0.85rem;">경안교회 유튜브 채널(@경안교회)의 설교 영상입니다.</span>
        <a href="https://www.youtube.com/@%EA%B2%BD%EC%95%88%EA%B5%90%ED%9A%8C" target="_blank" class="btn btn-secondary btn-sm" style="background: var(--accent-red); color: white; display: inline-flex; align-items: center; gap: 6px;">
          경안교회 유튜브 채널 보기 ↗
        </a>
      </div>
    </div>
  `;

  document.getElementById('custom-modal').classList.add('active');
}

function openNewsModal(id) {
  const newsList = ChurchStorage.getNews();
  const news = newsList.find(n => n.id === id);
  if (!news) return;

  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  modalTitle.innerText = `[${news.category}] ${news.title}`;
  
  modalBody.innerHTML = `
    <div style="font-size: 0.95rem; line-height: 1.8;">
      <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 14px;">등록일: ${news.date}</div>
      <div style="background: var(--bg-light); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color); white-space: pre-wrap; margin-bottom: 20px;">
        ${news.content}
      </div>
      ${news.fileUrl ? `
        <div style="display: flex; gap: 10px;">
          <a href="${news.fileUrl}" target="_blank" class="btn btn-primary btn-sm">PDF 주보 다운로드 / 원본보기</a>
        </div>
      ` : ''}
    </div>
  `;

  document.getElementById('custom-modal').classList.add('active');
}

function closeModal(event) {
  if (event.target.classList.contains('modal-overlay')) {
    closeModalDirect();
  }
}

function closeModalDirect() {
  const modal = document.getElementById('custom-modal');
  modal.classList.remove('active');
  setTimeout(() => {
    document.getElementById('modal-body').innerHTML = '';
  }, 200);
}

// 6. ADMIN MODAL LOGIC
function openAdminModal() {
  document.getElementById('admin-modal').classList.add('active');
}

function closeAdminModal(event) {
  if (event.target.classList.contains('modal-overlay')) {
    closeAdminModalDirect();
  }
}

function closeAdminModalDirect() {
  document.getElementById('admin-modal').classList.remove('active');
}

function handleAdminLogin(event) {
  event.preventDefault();
  const pass = document.getElementById('admin-pass-input').value;
  const correctPass = ChurchStorage.getAdminPassword();

  if (pass === correctPass) {
    isAdminLoggedIn = true;
    document.getElementById('admin-login-box').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    renderAdminBelieversTable();
    showToast('관리자 로그인 성공!');
  } else {
    showToast('비밀번호가 올바르지 않습니다.');
  }
}

function adminLogout() {
  isAdminLoggedIn = false;
  document.getElementById('admin-login-box').style.display = 'block';
  document.getElementById('admin-dashboard').style.display = 'none';
  document.getElementById('admin-pass-input').value = '';
  showToast('로그아웃 되었습니다.');
}

function switchAdminTab(tabId) {
  document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';

  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-outline');
    } else {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline');
    }
  });

  if (tabId === 'tab-believers') {
    renderAdminBelieversTable();
  }
}

function renderAdminBelieversTable() {
  const believers = ChurchStorage.getNewBelievers();
  const tbody = document.getElementById('admin-believers-tbody');
  if (!tbody) return;

  if (believers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 20px;">신청된 새가족 명단이 없습니다.</td></tr>`;
    return;
  }

  tbody.innerHTML = believers.map(b => `
    <tr>
      <td>${b.date}</td>
      <td><strong>${b.name}</strong></td>
      <td>${b.phone}</td>
      <td>${b.birth || '-'}</td>
      <td><span class="category-tag">${b.baptized}</span></td>
      <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${b.motive}">${b.motive || '-'}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteBeliever('${b.id}')">삭제</button>
      </td>
    </tr>
  `).join('');
}

function deleteBeliever(id) {
  if (confirm('해당 새가족 신청 기록을 삭제하시겠습니까?')) {
    ChurchStorage.deleteNewBeliever(id);
    renderAdminBelieversTable();
    showToast('삭제되었습니다.');
  }
}

function handleAddSermon(event) {
  event.preventDefault();
  const title = document.getElementById('adm-sermon-title').value.trim();
  const speaker = document.getElementById('adm-sermon-speaker').value.trim();
  const category = document.getElementById('adm-sermon-category').value;
  const passage = document.getElementById('adm-sermon-passage').value.trim();
  let youtubeId = document.getElementById('adm-sermon-yt').value.trim();

  if (youtubeId.includes('v=')) {
    youtubeId = youtubeId.split('v=')[1].split('&')[0];
  } else if (youtubeId.includes('youtu.be/')) {
    youtubeId = youtubeId.split('youtu.be/')[1].split('?')[0];
  }

  const todayStr = new Date().toISOString().split('T')[0].replace(/-/g, '.');

  const newSermon = {
    title,
    speaker,
    category,
    passage,
    youtubeId,
    date: todayStr,
    thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
  };

  ChurchStorage.addSermon(newSermon);
  if (category === '주일대예배') {
    ChurchStorage.setMainSermon(newSermon);
  }

  showToast('새 설교 영상이 성공적으로 등록되었습니다!');
  renderMainSermonPlayers();
  renderHomeView();
  closeAdminModalDirect();
}

function handleAddNews(event) {
  event.preventDefault();
  const title = document.getElementById('adm-news-title').value.trim();
  const category = document.getElementById('adm-news-category').value;
  const content = document.getElementById('adm-news-content').value.trim();

  ChurchStorage.addNews({ title, category, content, fileUrl: '' });
  showToast('소식/주보가 등록되었습니다!');
  renderNewsPage();
  closeAdminModalDirect();
}

// 7. NEW BELIEVER FORM SUBMISSION
function submitNewBeliever(event) {
  event.preventDefault();

  const name = document.getElementById('nb-name').value.trim();
  const phone = document.getElementById('nb-phone').value.trim();
  const birth = document.getElementById('nb-birth').value;
  const address = document.getElementById('nb-address').value.trim();
  const baptized = document.getElementById('nb-baptized').value;
  const motive = document.getElementById('nb-motive').value.trim();

  if (!name || !phone) {
    showToast('성명과 연락처는 필수 입력 항목입니다.');
    return;
  }

  ChurchStorage.addNewBeliever({ name, phone, birth, address, baptized, motive });
  
  showToast('🎉 새가족 등록 신청이 완료되었습니다. 교역자가 곧 연락드리겠습니다!');
  document.getElementById('new-believer-form').reset();
}

// 8. TOAST NOTIFIER
function showToast(msg) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
