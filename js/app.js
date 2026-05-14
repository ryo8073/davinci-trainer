// DaVinci Resolve 認定トレーナー 学習システム - アプリロジック
'use strict';

// ── Badge Definitions ────────────────────────────────────
const BADGE_DEFS = {
  'first-quiz':    { title: '初挑戦',       icon: '🎯', desc: '最初のクイズを完了' },
  'first-pass':    { title: '合格者',       icon: '🎓', desc: '初めてクイズに合格（85%以上）' },
  'perfect':       { title: '満点王',       icon: '💯', desc: 'クイズで100%を達成' },
  'perfect-3':     { title: 'パーフェクト3', icon: '👑', desc: '100%を3回達成' },
  'streak-7':      { title: '7日連続',      icon: '🔥', desc: '7日間連続で学習' },
  'streak-30':     { title: '30日連続',     icon: '⚡', desc: '30日間連続で学習' },
  'centurion':     { title: '100問突破',    icon: '🏅', desc: '累計100問以上に正解' },
  'exam-ready':    { title: '試験準備完了',  icon: '🏆', desc: '全カテゴリで85%以上を達成' },
};

// ── XP / Level Helpers ───────────────────────────────────
function calcLevel(xp) { return Math.floor(Math.sqrt((xp || 0) / 100)) + 1; }
function xpForLevel(level) { return (level - 1) * (level - 1) * 100; }
function xpForNextLevel(xp) {
  const lvl = calcLevel(xp);
  return xpForLevel(lvl + 1) - (xp || 0);
}

// ── Toast Notification ───────────────────────────────────
function showToast(message, icon, duration) {
  icon = icon || '';
  duration = duration || 3500;
  const toast = document.createElement('div');
  toast.className = 'toast-notify';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ── State (Firestore 経由) ────────────────────────────────
async function getState() {
  const s = await loadState(); // db.js
  return {
    completed:      s.completed      || [],
    quizSessions:   s.quizSessions   || [],
    streak:         s.streak         || 0,
    lastActiveDate: s.lastActiveDate || null,
    startedDate:    s.startedDate    || null,
    notes:          s.notes          || {},
    xp:             s.xp             || 0,
    badges:         s.badges         || [],
    totalCorrect:   s.totalCorrect   || 0,
    catBest:        s.catBest        || {},
    perfectCount:   s.perfectCount   || 0,
    reviewItems:    s.reviewItems    || [],
  };
}

// ── Date Helpers ─────────────────────────────────────────
function toDateStr(d) { return d.toISOString().slice(0, 10); }
function todayStr()   { return toDateStr(new Date()); }

function getDayIndex() {
  const start = new Date(START_DATE);
  const today = new Date(todayStr());
  const diff  = Math.floor((today - start) / 86400000);
  return Math.max(0, Math.min(diff, DAYS.length - 1));
}

function getDayData(idx) { return DAYS[idx] || DAYS[DAYS.length - 1]; }

// ── Streak ───────────────────────────────────────────────
function updateStreak(state) {
  const today     = todayStr();
  const yesterday = toDateStr(new Date(Date.now() - 86400000));
  if (state.lastActiveDate === today) return state;
  state.streak = (state.lastActiveDate === yesterday) ? (state.streak || 0) + 1 : 1;
  state.lastActiveDate = today;
  return state;
}

// ── Progress ─────────────────────────────────────────────
function getTodayProgress(state) {
  const tasks = getDayData(getDayIndex()).tasks;
  const done  = tasks.filter(t => state.completed.includes(t.id)).length;
  return { done, total: tasks.length, pct: tasks.length ? Math.round(done / tasks.length * 100) : 0 };
}

function getOverallProgress(state) {
  const total = DAYS.reduce((s, d) => s + d.tasks.length, 0);
  const done  = state.completed.length;
  return { done, total, pct: Math.round(done / total * 100) };
}

function getWeekProgress(weekNum, state) {
  const allTasks = DAYS.filter(d => d.w === weekNum).flatMap(d => d.tasks);
  const done     = allTasks.filter(t => state.completed.includes(t.id)).length;
  return { done, total: allTasks.length, pct: allTasks.length ? Math.round(done / allTasks.length * 100) : 0 };
}

function markTask(taskId, state) {
  if (!state.completed.includes(taskId)) {
    state.completed.push(taskId);
    updateStreak(state);
  }
  return state;
}

function unmarkTask(taskId, state) {
  state.completed = state.completed.filter(id => id !== taskId);
  return state;
}

// ── Quiz ─────────────────────────────────────────────────
function getQuestions(cat, limit) {
  let pool = cat === 'all' ? [...QUESTIONS] : QUESTIONS.filter(q => q.cat === cat);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return limit ? pool.slice(0, limit) : pool;
}

function saveQuizSession(score, total, cats, state) {
  state.quizSessions.push({
    date: todayStr(), score, total, cats,
    pct: Math.round(score / total * 100),
  });
  updateStreak(state);
  return state;
}

function getAvgQuizScore(state) {
  if (!state.quizSessions.length) return null;
  return Math.round(state.quizSessions.reduce((s, q) => s + q.pct, 0) / state.quizSessions.length);
}

// ── Task Meta ─────────────────────────────────────────────
const TASK_META = {
  r: { icon: '📖', label: '読む',     color: '#3b82f6' },
  v: { icon: '▶️', label: '動画',     color: '#8b5cf6' },
  p: { icon: '🎬', label: '実践',     color: '#10b981' },
  q: { icon: '🧠', label: 'クイズ',   color: '#f59e0b' },
  e: { icon: '📝', label: '模擬試験', color: '#ef4444' },
};

// ── DOM Helpers ───────────────────────────────────────────
function el(id)            { return document.getElementById(id); }
function qs(sel, p)        { return (p || document).querySelector(sel); }
function qsa(sel, p)       { return [...(p || document).querySelectorAll(sel)]; }
function formatMin(min)    {
  return min >= 60 ? `${Math.floor(min/60)}時間${min%60 ? (min%60)+'分' : ''}` : `${min}分`;
}

// ── Ring SVG ──────────────────────────────────────────────
function updateRing(id, pct) {
  const ring = el(id);
  if (!ring) return;
  const circle = ring.querySelector('.ring-progress');
  if (!circle) return;
  const r = 36, c = 2 * Math.PI * r;
  circle.style.strokeDasharray  = c;
  circle.style.strokeDashoffset = c - (pct / 100) * c;
}

// ── Dashboard ─────────────────────────────────────────────
async function initDashboard() {
  let state = await getState();

  const idx     = getDayIndex();
  const dayData = getDayData(idx);
  const weekData = WEEKS[dayData.w - 1];

  if (!state.startedDate) {
    state.startedDate = todayStr();
    await saveState(state);
  }

  if (el('today-day-num')) el('today-day-num').textContent = `Day ${dayData.d}`;
  if (el('today-week'))    el('today-week').textContent    = `Week ${dayData.w}`;
  if (el('today-title'))   el('today-title').textContent   = dayData.title;
  if (el('week-theme'))    el('week-theme').textContent    = weekData.title;

  if (el('exam-countdown')) {
    const daysLeft = Math.max(0, Math.ceil((new Date(EXAM_TARGET_DATE) - new Date(todayStr())) / 86400000));
    el('exam-countdown').textContent = `試験まで あと ${daysLeft} 日`;
  }

  if (el('streak-count')) el('streak-count').textContent = state.streak || 0;

  const overall = getOverallProgress(state);
  if (el('overall-pct')) el('overall-pct').textContent = overall.pct + '%';
  updateRing('overall-ring', overall.pct);

  const todayProg = getTodayProgress(state);
  if (el('today-pct')) el('today-pct').textContent = todayProg.pct + '%';
  updateRing('today-ring', todayProg.pct);

  const avg = getAvgQuizScore(state);
  if (el('quiz-avg')) el('quiz-avg').textContent = avg !== null ? avg + '%' : '—';

  // XP / Level display
  const level = calcLevel(state.xp);
  if (el('xp-value'))    el('xp-value').textContent    = state.xp || 0;
  if (el('level-value'))  el('level-value').textContent  = level;
  if (el('xp-next'))      el('xp-next').textContent      = xpForNextLevel(state.xp);
  const xpProg = state.xp - xpForLevel(level);
  const xpRange = xpForLevel(level + 1) - xpForLevel(level);
  if (el('xp-bar'))       el('xp-bar').style.width       = Math.round(xpProg / xpRange * 100) + '%';

  // Badges
  renderBadges(state);

  // Review card
  const reviewCount = getDueReviewCount(state);
  if (el('review-card')) {
    if (reviewCount > 0) {
      el('review-card').classList.remove('hidden');
      el('review-count').textContent = reviewCount;
    } else {
      el('review-card').classList.add('hidden');
    }
  }

  // Category skill rings
  renderSkillRings(state);

  // Activity timeline
  renderActivityTimeline(state);

  renderTasks(dayData.tasks, state);
  renderWeekBars(state);
}

function renderBadges(state) {
  const container = el('badge-row');
  if (!container) return;
  container.innerHTML = '';
  const earned = state.badges || [];
  Object.entries(BADGE_DEFS).forEach(([id, b]) => {
    const has = earned.includes(id);
    const badge = document.createElement('div');
    badge.className = `badge-item ${has ? 'earned' : 'locked'}`;
    badge.title = `${b.title}: ${b.desc}`;
    badge.innerHTML = `<span class="badge-icon">${b.icon}</span><span class="badge-name">${b.title}</span>`;
    container.appendChild(badge);
  });
}

function renderSkillRings(state) {
  const container = el('skill-rings');
  if (!container) return;
  container.innerHTML = '';
  const catBest = state.catBest || {};
  Object.entries(CAT_LABELS).forEach(([cat, label]) => {
    const pct = catBest[cat] || 0;
    const r = 32, c = 2 * Math.PI * r;
    const offset = c - (pct / 100) * c;
    const color = pct >= 85 ? 'var(--green)' : pct >= 50 ? 'var(--gold)' : 'var(--blue)';
    const div = document.createElement('div');
    div.className = 'skill-ring-item';
    div.innerHTML = `
      <div class="skill-ring-wrap">
        <svg width="76" height="76" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r="${r}" fill="none" stroke="var(--bg3)" stroke-width="5"/>
          <circle cx="38" cy="38" r="${r}" fill="none" stroke="${color}" stroke-width="5"
            stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"
            style="transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset .6s ease"/>
        </svg>
        <span class="skill-ring-pct" style="color:${color}">${pct}%</span>
      </div>
      <span class="skill-ring-label">${label.replace(/^.+\s/, '')}</span>
    `;
    container.appendChild(div);
  });
}

function renderActivityTimeline(state) {
  const container = el('activity-timeline');
  if (!container) return;
  const sessions = [...(state.quizSessions || [])].reverse().slice(0, 5);
  if (!sessions.length) {
    container.innerHTML = '<p style="color:var(--text3);font-size:13px">まだ活動記録がありません</p>';
    return;
  }
  container.innerHTML = sessions.map(s => {
    const passed = s.pct >= 85;
    const catLabel = CAT_LABELS[s.cats] || s.cats || 'すべて';
    return `<div class="activity-item">
      <span class="activity-icon">${passed ? '✅' : '📝'}</span>
      <span class="activity-text">${catLabel} ${s.score}/${s.total} (${s.pct}%)</span>
      <span class="activity-date">${s.date}</span>
    </div>`;
  }).join('');
}

function renderTasks(tasks, state) {
  const container = el('task-list');
  if (!container) return;
  container.innerHTML = '';

  tasks.forEach(task => {
    const meta = TASK_META[task.t] || TASK_META.p;
    const done = state.completed.includes(task.id);
    const li   = document.createElement('div');
    li.className = `task-item ${done ? 'done' : ''}`;
    li.innerHTML = `
      <label class="task-check">
        <input type="checkbox" data-id="${task.id}" ${done ? 'checked' : ''}>
        <span class="checkmark"></span>
      </label>
      <div class="task-body">
        <span class="task-badge" style="background:${meta.color}20;color:${meta.color}">${meta.icon} ${meta.label}</span>
        <span class="task-text">${task.text}</span>
      </div>
      <span class="task-min">${formatMin(task.min)}</span>
    `;
    container.appendChild(li);
  });

  qsa('input[type=checkbox]', container).forEach(cb => {
    cb.addEventListener('change', async (e) => {
      const taskId = e.target.dataset.id;
      const checked = e.target.checked;

      // アトミック操作（競合安全）
      if (checked) {
        await addCompleted(taskId);
      } else {
        await removeCompleted(taskId);
      }

      // UI即時反映（Firestoreの再読込を待たない）
      let s = await getState();
      if (checked && !s.completed.includes(taskId)) s.completed.push(taskId);
      if (!checked) s.completed = s.completed.filter(id => id !== taskId);

      const tp = getTodayProgress(s);
      if (el('today-pct')) el('today-pct').textContent = tp.pct + '%';
      updateRing('today-ring', tp.pct);
      const ov = getOverallProgress(s);
      if (el('overall-pct')) el('overall-pct').textContent = ov.pct + '%';
      updateRing('overall-ring', ov.pct);
      if (el('streak-count')) el('streak-count').textContent = s.streak || 0;
      e.target.closest('.task-item').classList.toggle('done', checked);
    });
  });
}

function renderWeekBars(state) {
  const container = el('week-bars');
  if (!container) return;
  container.innerHTML = '';
  const currentWeek = getDayData(getDayIndex()).w;

  WEEKS.forEach(week => {
    const prog     = getWeekProgress(week.w, state);
    const isActive = week.w === currentWeek;
    const div      = document.createElement('div');
    div.className  = `week-bar-item ${isActive ? 'active' : ''}`;
    div.innerHTML  = `
      <div class="wb-header">
        <span>${week.icon} Week ${week.w}</span>
        <span class="wb-pct">${prog.pct}%</span>
      </div>
      <div class="wb-track"><div class="wb-fill" style="width:${prog.pct}%;background:${week.color}"></div></div>
      <div class="wb-title">${week.title}</div>
    `;
    container.appendChild(div);
  });
}

// ── Quiz ──────────────────────────────────────────────────
let quizState = null;

let quizTimer = null;

async function initQuiz() {
  const catSelect   = el('cat-select');
  const countSelect = el('count-select');
  const startBtn    = el('start-btn');
  const reviewBtn   = el('review-start-btn');
  if (!catSelect) return;

  catSelect.innerHTML = '<option value="all">すべて（全カテゴリ混合）</option>';
  Object.entries(CAT_LABELS).forEach(([k, v]) => {
    const opt = document.createElement('option');
    opt.value = k; opt.textContent = v;
    catSelect.appendChild(opt);
  });

  // Show review count
  const state = await getState();
  const reviewCount = getDueReviewCount(state);
  if (el('review-count-quiz')) {
    el('review-count-quiz').textContent = reviewCount;
  }
  if (reviewBtn) {
    if (reviewCount > 0) {
      reviewBtn.classList.remove('hidden');
      reviewBtn.textContent = `復習モード（${reviewCount}問）`;
      reviewBtn.onclick = () => startReviewQuiz(state);
    } else {
      reviewBtn.classList.add('hidden');
    }
  }

  // 中断復帰: sessionStorageにクイズ状態があれば復帰を提案
  const saved = loadQuizFromSession();
  if (saved && saved.current < saved.questions.length) {
    const resumeBar = document.createElement('div');
    resumeBar.style.cssText = 'background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:10px;padding:14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px';
    resumeBar.innerHTML = `
      <span style="font-size:13px;color:var(--text2)">前回の中断データがあります（${saved.current}/${saved.questions.length}問目）</span>
      <div style="display:flex;gap:8px">
        <button class="btn btn-primary" id="resume-btn" style="padding:8px 16px;font-size:13px">続きから再開</button>
        <button class="btn btn-secondary" id="discard-btn" style="padding:8px 16px;font-size:13px">破棄</button>
      </div>
    `;
    el('quiz-setup').prepend(resumeBar);
    document.getElementById('resume-btn').onclick = () => {
      quizState = saved;
      el('quiz-setup').classList.add('hidden');
      el('quiz-area').classList.remove('hidden');
      el('quiz-result').classList.add('hidden');
      if (el('timer-bar')) el('timer-bar').classList.add('hidden');
      renderQuestion();
    };
    document.getElementById('discard-btn').onclick = () => {
      clearQuizSession();
      resumeBar.remove();
    };
  }

  startBtn.addEventListener('click', () => {
    clearQuizSession();
    const modeSelect = el('mode-select');
    const mode = modeSelect ? modeSelect.value : 'practice';
    startQuiz(catSelect.value, parseInt(countSelect.value) || 10, mode);
  });
}

// ── Quiz Persistence (sessionStorage) ────────────────────
function saveQuizToSession() {
  if (!quizState) return;
  try {
    // Save only serializable parts (not DOM refs)
    const save = {
      questions: quizState.questions,
      current: quizState.current,
      score: quizState.score,
      answers: quizState.answers,
      cat: quizState.cat,
      mode: quizState.mode,
    };
    sessionStorage.setItem('dv_quiz_state', JSON.stringify(save));
  } catch (e) { /* quota exceeded — ignore */ }
}

function loadQuizFromSession() {
  try {
    const raw = sessionStorage.getItem('dv_quiz_state');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}

function clearQuizSession() {
  sessionStorage.removeItem('dv_quiz_state');
}

function startReviewQuiz(state) {
  const questions = getDueReviewQuestions(state);
  if (!questions.length) { showToast('復習する問題がありません', '📚'); return; }
  quizState = { questions, current: 0, score: 0, answers: [], cat: 'review', mode: 'practice' };
  el('quiz-setup').classList.add('hidden');
  el('quiz-area').classList.remove('hidden');
  el('quiz-result').classList.add('hidden');
  if (el('timer-bar')) el('timer-bar').classList.add('hidden');
  saveQuizToSession();
  renderQuestion();
}

function startQuiz(cat, count, mode) {
  mode = mode || 'practice';
  quizState = { questions: getQuestions(cat, count), current: 0, score: 0, answers: [], cat, mode };
  el('quiz-setup').classList.add('hidden');
  el('quiz-area').classList.remove('hidden');
  el('quiz-result').classList.add('hidden');

  saveQuizToSession();

  // Timer for exam mode
  if (mode === 'exam') {
    const timerBar = el('timer-bar');
    if (timerBar) {
      timerBar.classList.remove('hidden');
      let seconds = 3600; // 60 minutes
      const timerDisp = el('timer-disp');
      const timerProgress = el('timer-progress');
      const totalSec = seconds;
      function updateTimer() {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        if (timerDisp) timerDisp.textContent = `${m}:${String(s).padStart(2, '0')}`;
        if (timerProgress) timerProgress.style.width = (seconds / totalSec * 100) + '%';
        if (seconds <= 60 && timerDisp) timerDisp.classList.add('timer-warn');
        if (seconds <= 0) {
          clearInterval(quizTimer);
          quizTimer = null;
          showToast('時間切れです。提出します。', '⏰');
          showQuizResult();
        }
        seconds--;
      }
      updateTimer();
      quizTimer = setInterval(updateTimer, 1000);
    }
  } else {
    if (el('timer-bar')) el('timer-bar').classList.add('hidden');
  }

  renderQuestion();
}

function shuffleOptions(q) {
  // Create indexed options: [{text, origIdx}]
  const indexed = q.opts.map((text, i) => ({ text, origIdx: i }));
  // Fisher-Yates shuffle
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  // Find new correct answer index
  const shuffledAns = indexed.findIndex(o => o.origIdx === q.ans);
  return { shuffledOpts: indexed.map(o => o.text), shuffledAns, origMap: indexed.map(o => o.origIdx) };
}

function renderQuestion() {
  if (!quizState) return;
  const { questions, current } = quizState;
  const q = questions[current];

  // Shuffle options for this question
  const { shuffledOpts, shuffledAns, origMap } = shuffleOptions(q);
  quizState._shuffledAns = shuffledAns;
  quizState._origMap = origMap;

  if (el('q-num'))  el('q-num').textContent  = `問 ${current + 1} / ${questions.length}`;
  if (el('q-cat'))  el('q-cat').textContent  = CAT_LABELS[q.cat] || q.cat;

  // Language toggle support
  const lang = (typeof quizLang !== 'undefined') ? quizLang : 'en';
  const qText = (lang === 'ja' && q.q_ja) ? q.q_ja : q.q;
  if (el('q-text')) el('q-text').textContent = qText;

  const optsEl = el('q-options');
  if (!optsEl) return;
  optsEl.innerHTML = '';

  const labels = ['A','B','C','D'];
  shuffledOpts.forEach((optText, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="opt-label">${labels[i]}</span> ${optText}`;
    btn.dataset.idx = i;
    btn.addEventListener('click', () => selectAnswer(i));
    optsEl.appendChild(btn);
  });

  if (el('q-explanation')) { el('q-explanation').classList.add('hidden'); el('q-explanation').textContent = ''; }
  const pct = Math.round(current / questions.length * 100);
  if (el('quiz-progress-bar'))  el('quiz-progress-bar').style.width  = pct + '%';
  if (el('quiz-score-live'))    el('quiz-score-live').textContent     = `正解: ${quizState.score}`;
}

function selectAnswer(idx) {
  const q            = quizState.questions[quizState.current];
  const shuffledAns  = quizState._shuffledAns;
  const origMap      = quizState._origMap;
  const correct      = idx === shuffledAns;
  if (correct) quizState.score++;
  // Store original option index for review
  quizState.answers.push({ qid: q.id, selected: origMap[idx], correct });

  qsa('.opt-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === shuffledAns)          btn.classList.add('correct');
    else if (i === idx && !correct) btn.classList.add('wrong');
  });

  if (el('q-explanation')) {
    el('q-explanation').innerHTML = `<strong>${correct ? '✅ 正解！' : '❌ 不正解'}</strong> ${q.exp}`;
    el('q-explanation').className = `q-exp ${correct ? 'correct' : 'wrong'}`;
  }

  // Save progress to sessionStorage
  saveQuizToSession();

  const nextBtn = el('next-btn');
  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    nextBtn.textContent = quizState.current + 1 < quizState.questions.length ? '次の問題 →' : '結果を見る';
    nextBtn.onclick = () => {
      quizState.current++;
      saveQuizToSession();
      if (quizState.current < quizState.questions.length) {
        renderQuestion();
        nextBtn.classList.add('hidden');
      } else {
        clearQuizSession();
        showQuizResult();
      }
    };
  }
}

// ── Spaced Repetition helpers ─────────────────────────────
function updateReviewItems(answers, state) {
  const now = Date.now();
  const DAY = 86400000;
  let items = [...(state.reviewItems || [])];

  answers.forEach(a => {
    const idx = items.findIndex(r => r.qid === a.qid);
    if (!a.correct) {
      // Wrong: add or reset to 1-day interval
      if (idx >= 0) {
        items[idx].nextReview = now + DAY;
        items[idx].interval = 1;
        items[idx].ease = Math.max(1.3, (items[idx].ease || 2.5) - 0.2);
      } else {
        items.push({ qid: a.qid, nextReview: now + DAY, interval: 1, ease: 2.5 });
      }
    } else if (idx >= 0) {
      // Correct: extend interval (SM-2 style)
      const item = items[idx];
      const newInterval = Math.round((item.interval || 1) * (item.ease || 2.5));
      if (newInterval > 90) {
        items.splice(idx, 1); // Graduated
      } else {
        item.interval = newInterval;
        item.nextReview = now + newInterval * DAY;
        item.ease = Math.min(3.0, (item.ease || 2.5) + 0.1);
      }
    }
  });
  state.reviewItems = items;
  return state;
}

function getDueReviewCount(state) {
  const now = Date.now();
  return (state.reviewItems || []).filter(r => r.nextReview <= now).length;
}

function getDueReviewQuestions(state) {
  const now = Date.now();
  const dueIds = (state.reviewItems || []).filter(r => r.nextReview <= now).map(r => r.qid);
  return QUESTIONS.filter(q => dueIds.includes(q.id));
}

// ── Badge Check ──────────────────────────────────────────
function checkBadges(state) {
  const earned = [...(state.badges || [])];
  const newBadges = [];
  const sessions = state.quizSessions || [];

  function tryEarn(id) {
    if (!earned.includes(id)) { earned.push(id); newBadges.push(id); }
  }

  if (sessions.length >= 1) tryEarn('first-quiz');
  if (sessions.some(s => s.pct >= 85)) tryEarn('first-pass');
  if (sessions.some(s => s.pct === 100)) tryEarn('perfect');
  if ((state.perfectCount || 0) >= 3) tryEarn('perfect-3');
  if ((state.streak || 0) >= 7) tryEarn('streak-7');
  if ((state.streak || 0) >= 30) tryEarn('streak-30');
  if ((state.totalCorrect || 0) >= 100) tryEarn('centurion');

  // Check all cats have 85%+
  const cats = Object.keys(CAT_LABELS);
  if (cats.length > 0 && cats.every(c => (state.catBest || {})[c] >= 85)) tryEarn('exam-ready');

  state.badges = earned;
  return { state, newBadges };
}

async function showQuizResult() {
  clearQuizSession();
  el('quiz-area').classList.add('hidden');
  el('quiz-result').classList.remove('hidden');

  // Stop timer if running
  if (typeof quizTimer !== 'undefined' && quizTimer) {
    clearInterval(quizTimer);
    quizTimer = null;
  }

  const { score, questions, answers, cat } = quizState;
  const pct  = Math.round(score / questions.length * 100);
  const pass = pct >= 85;

  if (el('result-score')) el('result-score').textContent = `${score} / ${questions.length}`;
  if (el('result-pct'))   { el('result-pct').textContent = pct + '%'; el('result-pct').className = `result-pct ${pass ? 'pass' : pct >= 70 ? 'near' : 'fail'}`; }
  if (el('result-msg'))   el('result-msg').textContent   = pass ? '🎉 合格ライン(85%)突破！本番もこの調子で！' : pct >= 70 ? '💪 もう少し！85%を目指して弱点を復習しよう' : '📚 まだ伸び代あり！Beginners Guideを読み直そう';

  let s = await getState();
  s = saveQuizSession(score, questions.length, cat, s);

  // XP calculation
  const xpCorrect = score * 5;
  const xpBonus = pass ? 50 : 0;
  const isNewDay = s.lastActiveDate !== todayStr();
  const xpStreak = isNewDay ? 10 : 0;
  const xpGained = xpCorrect + xpBonus + xpStreak;
  const oldLevel = calcLevel(s.xp);
  s.xp = (s.xp || 0) + xpGained;
  const newLevel = calcLevel(s.xp);
  s.totalCorrect = (s.totalCorrect || 0) + score;
  if (pct === 100) s.perfectCount = (s.perfectCount || 0) + 1;

  // Category best tracking
  if (!s.catBest) s.catBest = {};
  if (cat !== 'all') {
    s.catBest[cat] = Math.max(s.catBest[cat] || 0, pct);
  }

  // Spaced repetition
  s = updateReviewItems(answers, s);

  // Badge check
  const { state: badgedState, newBadges } = checkBadges(s);
  s = badgedState;

  await saveState(s);

  // Show XP toast
  showToast(`+${xpGained} XP (正解${xpCorrect}${xpBonus ? ' + 合格50' : ''}${xpStreak ? ' + 連続10' : ''})`, '⭐');
  if (newLevel > oldLevel) {
    setTimeout(() => showToast(`レベル ${newLevel} に上がりました！`, '🎉', 4000), 1500);
  }
  newBadges.forEach((bid, i) => {
    const b = BADGE_DEFS[bid];
    if (b) setTimeout(() => showToast(`バッジ獲得: ${b.title} — ${b.desc}`, b.icon, 5000), 2500 + i * 1500);
  });

  // Show XP summary in result area
  const xpEl = el('result-xp');
  if (xpEl) {
    xpEl.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:12px">
        <span style="font-size:14px;color:var(--gold)">⭐ +${xpGained} XP</span>
        <span style="font-size:14px;color:var(--purple)">Lv.${newLevel}</span>
        <span style="font-size:14px;color:var(--text2)">累計 ${s.xp} XP</span>
      </div>
      ${newBadges.length ? `<div style="margin-top:8px;font-size:14px;color:var(--green)">${newBadges.map(bid => {const b=BADGE_DEFS[bid];return b?`${b.icon} ${b.title}`:'';}).join(' ')}</div>` : ''}
    `;
  }

  const wrongList = el('wrong-list');
  if (wrongList) {
    wrongList.innerHTML = '';
    const wrongs = answers.filter(a => !a.correct);
    if (!wrongs.length) {
      wrongList.innerHTML = '<p style="color:#10b981">全問正解！完璧です！</p>';
    } else {
      wrongs.forEach(a => {
        const q = QUESTIONS.find(q => q.id === a.qid);
        if (!q) return;
        const div = document.createElement('div');
        div.className = 'wrong-item';
        const lbl = ['A','B','C','D'];
        div.innerHTML = `
          <p class="wrong-q">${q.q}</p>
          <p class="wrong-yours">あなたの解答: <span class="wrong-ans">${lbl[a.selected]} ${q.opts[a.selected]}</span></p>
          <p class="wrong-correct">正解: <span class="correct-ans">${lbl[q.ans]} ${q.opts[q.ans]}</span></p>
          <p class="wrong-exp">${q.exp}</p>
        `;
        wrongList.appendChild(div);
      });
    }
  }
}

// ── Progress ──────────────────────────────────────────────
async function initProgress() {
  const state = await getState();

  const overall = getOverallProgress(state);
  const avg     = getAvgQuizScore(state);
  const sessions = state.quizSessions || [];

  if (el('prog-overall'))    el('prog-overall').textContent    = overall.pct + '%';
  if (el('prog-quiz-avg'))   el('prog-quiz-avg').textContent   = avg !== null ? avg + '%' : '未受験';
  if (el('prog-streak'))     el('prog-streak').textContent     = (state.streak || 0) + '日';
  if (el('prog-sessions'))   el('prog-sessions').textContent   = sessions.length + '回';

  renderProgressGrid(state);
  renderQuizHistory(state);
}

function renderProgressGrid(state) {
  const grid = el('progress-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const currentDay = getDayIndex();

  WEEKS.forEach(week => {
    const prog    = getWeekProgress(week.w, state);
    const section = document.createElement('div');
    section.className = 'pg-week';
    section.innerHTML = `
      <div class="pg-week-header" style="border-left:3px solid ${week.color}">
        <span>${week.icon} Week ${week.w}：${week.title}</span>
        <span class="pg-week-pct">${prog.pct}%</span>
      </div>
    `;

    const daysRow = document.createElement('div');
    daysRow.className = 'pg-days';

    DAYS.filter(d => d.w === week.w).forEach(day => {
      const doneTasks = day.tasks.filter(t => state.completed.includes(t.id));
      const allDone   = doneTasks.length === day.tasks.length;
      const partDone  = doneTasks.length > 0 && !allDone;
      const dayIdx    = day.d - 1;
      const isCurrent = dayIdx === currentDay;
      const isPast    = dayIdx < currentDay;

      const dayEl = document.createElement('div');
      dayEl.className = `pg-day ${allDone ? 'done' : partDone ? 'partial' : ''} ${isCurrent ? 'current' : ''} ${isPast && !allDone ? 'missed' : ''}`;
      dayEl.title     = `Day ${day.d}: ${day.title} (${doneTasks.length}/${day.tasks.length})`;
      dayEl.style.cursor = 'pointer';
      dayEl.innerHTML = `<span>${day.d}</span>`;
      dayEl.addEventListener('click', () => showDayModal(day, state));
      daysRow.appendChild(dayEl);
    });

    section.appendChild(daysRow);
    grid.appendChild(section);
  });
}

function showDayModal(day, state) {
  // Remove existing modal
  const existing = document.querySelector('.day-modal-overlay');
  if (existing) existing.remove();

  const startDate = new Date(START_DATE);
  const dayDate = new Date(startDate.getTime() + (day.d - 1) * 86400000);
  const dateStr = `${dayDate.getFullYear()}/${dayDate.getMonth()+1}/${dayDate.getDate()}`;
  const weekData = WEEKS[day.w - 1];

  const overlay = document.createElement('div');
  overlay.className = 'day-modal-overlay';
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  const doneTasks = day.tasks.filter(t => state.completed.includes(t.id));

  overlay.innerHTML = `
    <div class="day-modal">
      <button class="day-modal-close" onclick="this.closest('.day-modal-overlay').remove()">&times;</button>
      <div class="day-modal-title">Day ${day.d} — ${day.title}</div>
      <div style="font-size:13px;color:var(--text2);margin-bottom:16px">
        ${dateStr} / ${weekData.icon} Week ${day.w}: ${weekData.title}
        <span style="margin-left:8px;color:${doneTasks.length === day.tasks.length ? 'var(--green)' : 'var(--text3)'}">
          (${doneTasks.length}/${day.tasks.length} 完了)
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${day.tasks.map(t => {
          const meta = TASK_META[t.t] || TASK_META.p;
          const done = state.completed.includes(t.id);
          return `<div style="display:flex;align-items:flex-start;gap:10px;padding:12px;border-radius:8px;background:var(--bg3);border:1px solid var(--border);${done ? 'opacity:.6' : ''}">
            <span style="font-size:16px">${done ? '✅' : '⬜'}</span>
            <div style="flex:1">
              <span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;background:${meta.color}20;color:${meta.color};margin-bottom:4px">${meta.icon} ${meta.label}</span>
              <div style="font-size:13px;${done ? 'text-decoration:line-through' : ''}">${t.text}</div>
            </div>
            <span style="font-size:12px;color:var(--text3);white-space:nowrap">${formatMin(t.min)}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function renderQuizHistory(state) {
  const list     = el('quiz-history');
  if (!list) return;
  const sessions = [...(state.quizSessions || [])].reverse().slice(0, 10);

  if (!sessions.length) { list.innerHTML = '<p class="no-data">まだクイズを受けていません</p>'; return; }

  list.innerHTML = '';
  sessions.forEach(s => {
    const div  = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <span class="h-date">${s.date}</span>
      <span class="h-cat">${CAT_LABELS[s.cats] || s.cats}</span>
      <span class="h-score ${s.pct >= 85 ? 'pass' : 'fail'}">${s.score}/${s.total} (${s.pct}%)</span>
    `;
    list.appendChild(div);
  });
}
