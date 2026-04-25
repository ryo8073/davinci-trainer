// ============================================================
// Firebase 設定
// Firebaseコンソール > プロジェクト設定 > アプリ から取得
// ============================================================
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyADaMGEvE8aIDHpwCzijrZug12WnXABsI0",
  authDomain:        "davinci-trainer.firebaseapp.com",
  projectId:         "davinci-trainer",
  storageBucket:     "davinci-trainer.firebasestorage.app",
  messagingSenderId: "1059130579172",
  appId:             "1:1059130579172:web:348d37af01dbaddb90b4f1"
};

// ============================================================
// PDF 設定
// Firebase Storage にアップロード後、ダウンロードURLを貼り付ける
// （Storage > ファイル右クリック > ダウンロードURLをコピー）
// または任意の公開URLでも可
// ============================================================
// Blackmagic公式 Beginners Guide PDF（直リンク）
// ローカルにPDFがある場合は "assets/DaVinci-Resolve-20_Beginners-Guide-JP.pdf" でも可
const PDF_URL = "https://firebasestorage.googleapis.com/v0/b/davinci-trainer.firebasestorage.app/o/DaVinci-Resolve-20_Beginners-Guide-JP.pdf?alt=media&token=f5e6dc2a-703d-478e-982d-3921371ce7d3";
