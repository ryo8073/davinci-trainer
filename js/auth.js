'use strict';
// Firebase Auth ゲート — 高速版（認証キャッシュ付き）

let _currentUser = null;

function initAuth() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  const gate        = document.getElementById('auth-gate');
  const spinnerWrap = document.getElementById('auth-spinner-wrap');
  const authBox     = document.getElementById('auth-box');

  // 高速化: sessionStorageに認証済みフラグがあればスピナーを即スキップ
  // （Firebase onAuthStateChanged が発火するまでの体感待ち時間をゼロにする）
  const cachedUid = sessionStorage.getItem('dv_auth_uid');
  if (cachedUid && gate) {
    gate.style.display = 'none';
  }

  // Timeout: 5秒以内にauth stateが来なければログインフォーム表示
  const authTimeout = setTimeout(() => {
    if (gate && gate.style.display !== 'none') {
      if (spinnerWrap) spinnerWrap.style.display = 'none';
      if (authBox) authBox.style.display = '';
    }
  }, 5000);

  firebase.auth().onAuthStateChanged(async user => {
    clearTimeout(authTimeout);
    _currentUser = user;
    if (user) {
      // 認証キャッシュを更新
      sessionStorage.setItem('dv_auth_uid', user.uid);

      // 認証済み → ゲートを即非表示
      if (gate) gate.style.display = 'none';
      initDB(user);

      const page = document.body.dataset.page;
      try {
        if      (page === 'dashboard') await initDashboard();
        else if (page === 'quiz')      await initQuiz();
        else if (page === 'progress')  await initProgress();
        else if (page === 'reader')    initReader();
        else if (page === 'video')     { /* video list already built */ }
      } catch (e) {
        console.error('Page init error:', e);
      }
    } else {
      // 未ログイン → キャッシュ消去＋フォーム表示
      sessionStorage.removeItem('dv_auth_uid');
      if (gate) gate.style.display = '';
      if (spinnerWrap) spinnerWrap.style.display = 'none';
      if (authBox) authBox.style.display = '';
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
  sessionStorage.removeItem('dv_auth_uid');
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
