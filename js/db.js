'use strict';
// Firestore データ層 — 複数ユーザー対応・競合安全版

let _db  = null;
let _uid = null;
let _stateCache = null; // メモリキャッシュ（同一ページ内の高速読み込み）

function initDB(user) {
  _db  = firebase.firestore();
  _uid = user.uid;
  _stateCache = null;

  // Firestoreオフラインキャッシュを有効化（2回目以降は自動スキップ）
  try {
    _db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
  } catch (e) { /* already enabled */ }
}

function _progressRef() {
  return _db.collection('users').doc(_uid).collection('data').doc('progress');
}

async function loadState() {
  // メモリキャッシュがあればそれを返す（同一ページ内の重複読み込み防止）
  if (_stateCache) return _stateCache;

  try {
    const doc = await _progressRef().get();
    _stateCache = doc.exists ? doc.data() : {};
    return _stateCache;
  } catch (e) {
    console.error('loadState:', e);
    return {};
  }
}

async function saveState(state) {
  try {
    // データ肥大化防止: quizSessionsは直近50件に刈り込み
    if (state.quizSessions && state.quizSessions.length > 50) {
      state.quizSessions = state.quizSessions.slice(-50);
    }
    // reviewItemsの卒業済み（interval>90）を掃除
    if (state.reviewItems) {
      state.reviewItems = state.reviewItems.filter(r => r.interval <= 90);
    }

    // XP整合性チェック: 負数や異常値を防止
    if (typeof state.xp === 'number') {
      state.xp = Math.max(0, Math.min(state.xp, 999999));
    }
    if (typeof state.totalCorrect === 'number') {
      state.totalCorrect = Math.max(0, state.totalCorrect);
    }

    // Firestore は undefined を保存できないため null に変換
    const clean = JSON.parse(JSON.stringify(state, (_, v) => v === undefined ? null : v));

    // merge: true で部分更新（他タブとの競合を緩和）
    await _progressRef().set(clean, { merge: true });

    // キャッシュ更新
    _stateCache = clean;
  } catch (e) {
    console.error('saveState:', e);
  }
}

// 完了タスクの追加/削除をアトミックに行う（競合対策の主要改善）
async function addCompleted(taskId) {
  try {
    await _progressRef().set({
      completed: firebase.firestore.FieldValue.arrayUnion(taskId),
      lastActiveDate: new Date().toISOString().slice(0, 10),
    }, { merge: true });
    _stateCache = null; // キャッシュ無効化
  } catch (e) {
    console.error('addCompleted:', e);
  }
}

async function removeCompleted(taskId) {
  try {
    await _progressRef().set({
      completed: firebase.firestore.FieldValue.arrayRemove(taskId),
    }, { merge: true });
    _stateCache = null;
  } catch (e) {
    console.error('removeCompleted:', e);
  }
}

async function resetState() {
  try {
    await _progressRef().delete();
    _stateCache = null;
  } catch (e) {
    console.error('resetState:', e);
  }
}
