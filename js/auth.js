'use strict';
// Firebase Auth ゲート

let _currentUser = null;

function initAuth() {
  firebase.initializeApp(FIREBASE_CONFIG);

  const gate        = document.getElementById('auth-gate');
  const spinnerWrap = document.getElementById('auth-spinner-wrap');
  const authBox     = document.getElementById('auth-box');

  firebase.auth().onAuthStateChanged(async user => {
    _currentUser = user;
    if (user) {
      // 認証済み → ゲートを即非表示
      if (gate) gate.style.display = 'none';
      initDB(user);
      const page = document.body.dataset.page;
      if      (page === 'dashboard') await initDashboard();
      else if (page === 'quiz')      initQuiz();
      else if (page === 'progress')  await initProgress();
      else if (page === 'reader')    initReader();
      else if (page === 'video')     { /* video list already built */ }
    } else {
      // 未ログイン確定 → スピナーを消してフォームを表示
      if (spinnerWrap) spinnerWrap.style.display = 'none';
      if (authBox)     authBox.style.display     = '';
    }
  });

  // ログインフォーム
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errEl    = document.getElementById('login-error');
    const btn      = form.querySelector('button[type=submit]');

    btn.disabled = true;
    btn.textContent = 'ログイン中...';
    if (errEl) errEl.textContent = '';

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      if (errEl) errEl.textContent = _authErrMsg(err.code);
      btn.disabled = false;
      btn.textContent = 'ログイン';
    }
  });
}

function logout() {
  firebase.auth().signOut().then(() => { location.href = 'index.html'; });
}

function getCurrentUser() { return _currentUser; }

function _authErrMsg(code) {
  const map = {
    'auth/user-not-found':     'メールアドレスが登録されていません',
    'auth/wrong-password':     'パスワードが正しくありません',
    'auth/invalid-email':      'メールアドレスの形式が正しくありません',
    'auth/too-many-requests':  'ログイン試行が多すぎます。しばらく待ってから再試行してください',
    'auth/invalid-credential': 'メールアドレスまたはパスワードが正しくありません',
  };
  return map[code] || `エラー (${code})`;
}
