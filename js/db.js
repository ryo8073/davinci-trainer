'use strict';
// Firestore データ層 — localStorage の代替

let _db  = null;
let _uid = null;

function initDB(user) {
  _db  = firebase.firestore();
  _uid = user.uid;
}

function _progressRef() {
  return _db.collection('users').doc(_uid).collection('data').doc('progress');
}

async function loadState() {
  try {
    const doc = await _progressRef().get();
    return doc.exists ? doc.data() : {};
  } catch (e) {
    console.error('loadState:', e);
    return {};
  }
}

async function saveState(state) {
  try {
    // Firestore は undefined を保存できないため null に変換
    const clean = JSON.parse(JSON.stringify(state, (_, v) => v === undefined ? null : v));
    await _progressRef().set(clean);
  } catch (e) {
    console.error('saveState:', e);
  }
}

async function resetState() {
  try {
    await _progressRef().delete();
  } catch (e) {
    console.error('resetState:', e);
  }
}
