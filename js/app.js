// DaVinci Resolve 認定トレーナー 学習システム - アプリロジック
'use strict';

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

  renderTasks(dayData.tasks, state);
  renderWeekBars(state);
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
      let s = await getState();
      s = e.target.checked ? markTask(e.target.dataset.id, s) : unmarkTask(e.target.dataset.id, s);
      await saveState(s);

      const tp = getTodayProgress(s);
      if (el('today-pct')) el('today-pct').textContent = tp.pct + '%';
      updateRing('today-ring', tp.pct);
      const ov = getOverallProgress(s);
      if (el('overall-pct')) el('overall-pct').textContent = ov.pct + '%';
      updateRing('overall-ring', ov.pct);
      if (el('streak-count')) el('streak-count').textContent = s.streak || 0;
      e.target.closest('.task-item').classList.toggle('done', e.target.checked);
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

function initQuiz() {
  const catSelect   = el('cat-select');
  const countSelect = el('count-select');
  const startBtn    = el('start-btn');
  if (!catSelect) return;

  catSelect.innerHTML = '<option value="all">すべて（全カテゴリ混合）</option>';
  Object.entries(CAT_LABELS).forEach(([k, v]) => {
    const opt = document.createElement('option');
    opt.value = k; opt.textContent = v;
    catSelect.appendChild(opt);
  });

  startBtn.addEventListener('click', () => {
    startQuiz(catSelect.value, parseInt(countSelect.value) || 10);
  });
}

function startQuiz(cat, count) {
  quizState = { questions: getQuestions(cat, count), current: 0, score: 0, answers: [], cat };
  el('quiz-setup').classList.add('hidden');
  el('quiz-area').classList.remove('hidden');
  el('quiz-result').classList.add('hidden');
  renderQuestion();
}

function renderQuestion() {
  if (!quizState) return;
  const { questions, current } = quizState;
  const q = questions[current];

  if (el('q-num'))  el('q-num').textContent  = `問 ${current + 1} / ${questions.length}`;
  if (el('q-cat'))  el('q-cat').textContent  = CAT_LABELS[q.cat] || q.cat;
  if (el('q-text')) el('q-text').textContent = q.q;

  const optsEl = el('q-options');
  if (!optsEl) return;
  optsEl.innerHTML = '';

  ['A','B','C','D'].forEach((lbl, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="opt-label">${lbl}</span> ${q.opts[i]}`;
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
  const q       = quizState.questions[quizState.current];
  const correct = idx === q.ans;
  if (correct) quizState.score++;
  quizState.answers.push({ qid: q.id, selected: idx, correct });

  qsa('.opt-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans)          btn.classList.add('correct');
    else if (i === idx && !correct) btn.classList.add('wrong');
  });

  if (el('q-explanation')) {
    el('q-explanation').innerHTML = `<strong>${correct ? '✅ 正解！' : '❌ 不正解'}</strong> ${q.exp}`;
    el('q-explanation').className = `q-exp ${correct ? 'correct' : 'wrong'}`;
  }

  const nextBtn = el('next-btn');
  if (nextBtn) {
    nextBtn.classList.remove('hidden');
    nextBtn.textContent = quizState.current + 1 < quizState.questions.length ? '次の問題 →' : '結果を見る';
    nextBtn.onclick = () => {
      quizState.current++;
      if (quizState.current < quizState.questions.length) {
        renderQuestion();
        nextBtn.classList.add('hidden');
      } else {
        showQuizResult();
      }
    };
  }
}

async function showQuizResult() {
  el('quiz-area').classList.add('hidden');
  el('quiz-result').classList.remove('hidden');

  const { score, questions, answers, cat } = quizState;
  const pct  = Math.round(score / questions.length * 100);
  const pass = pct >= 85;

  if (el('result-score')) el('result-score').textContent = `${score} / ${questions.length}`;
  if (el('result-pct'))   { el('result-pct').textContent = pct + '%'; el('result-pct').className = `result-pct ${pass ? 'pass' : pct >= 70 ? 'near' : 'fail'}`; }
  if (el('result-msg'))   el('result-msg').textContent   = pass ? '🎉 合格ライン(85%)突破！本番もこの調子で！' : pct >= 70 ? '💪 もう少し！85%を目指して弱点を復習しよう' : '📚 まだ伸び代あり！Beginners Guideを読み直そう';

  let s = await getState();
  s = saveQuizSession(score, questions.length, cat, s);
  await saveState(s);

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
      dayEl.innerHTML = `<span>${day.d}</span>`;
      daysRow.appendChild(dayEl);
    });

    section.appendChild(daysRow);
    grid.appendChild(section);
  });
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
