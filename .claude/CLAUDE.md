# DaVinci Trainer — Claude Code 設定

## プロジェクト概要
Blackmagic Design DaVinci Resolve 認定トレーナー資格の学習Webアプリ。
Firebase Auth + Firestore + PDF.js + YouTube iframe API 構成。
試験: 四択50問・60分・85%（43問）合格。出題範囲: Beginners Guide 全ページ。

## ファイル構成
```
davinci-trainer/
├── index.html       # ダッシュボード (data-page="dashboard")
├── quiz.html        # クイズ (data-page="quiz")
├── progress.html    # 進捗 (data-page="progress")
├── study.html       # カリキュラム一覧 (data-page="study")
├── video.html       # YouTube動画プレイヤー (data-page="video")
├── reader.html      # PDF複数対応リーダー (data-page="reader")
├── assets/          # 大容量PDFはgit管理外（下記参照）
├── js/
│   ├── firebase-config.js  # PDF_URL・Firebase設定
│   ├── data.js             # WEEKS・DAYS・QUESTIONS定数
│   ├── auth.js             # 認証ゲート・ページ別initディスパッチ
│   ├── db.js               # Firestore進捗保存
│   └── app.js              # ページ別init関数
└── vercel.json      # ルーティング設定
```

## Git管理ルール

### PDFファイルはgitに含めない
`assets/` 配下のPDFは64MB超のため `.gitignore` で除外済み（`assets/*.pdf`）。
Vercel deployでも除外される。**PDFは外部URLで参照する。**

```bash
# NG: PDFをgit addしない
git add assets/DaVinci-Resolve-20_Beginners-Guide-JP.pdf  # 64MB → 禁止

# OK: コードファイルのみcommit
git add -A -- "*.html" "*.json" "js/" "css/" ".claude/"
```

### PDF URLの管理（firebase-config.js）
```js
// 外部URL（デフォルト・Vercel環境で動作）
const PDF_URL = "https://documents.blackmagicdesign.com/jp/UserManuals/DaVinci-Resolve-20-Beginners-Guide.pdf?_v=1757574012000";

// ローカル開発時（assets/にPDFを手動配置した場合のみ有効）
// const PDF_URL = "assets/DaVinci-Resolve-20_Beginners-Guide-JP.pdf";
```

## PDF.js CORS 既知問題
Blackmagic外部URLのPDFをPDF.jsで読む際、CORSエラーが発生する可能性がある。
発生した場合の対処：
1. ローカルにPDFを配置して `localPath` を使う（`python -m http.server 8080` で起動）
2. reader.html の state-error 表示で外部リンクへ誘導

## YouTube プレイリスト動画IDの取得
WebFetch はJSレンダリングが必要なYouTubeページを読めない。
**yt-dlp を使う（macOS: `brew install yt-dlp` でインストール済み）**：

```bash
yt-dlp --flat-playlist --print "%(id)s|%(title)s" "https://www.youtube.com/playlist?list=PLAYLIST_ID"
```

## 公式学習リソース（Blackmagic）
- **Beginners Guide JP**: https://documents.blackmagicdesign.com/jp/UserManuals/DaVinci-Resolve-20-Beginners-Guide.pdf
- **Editor's Guide**: https://documents.blackmagicdesign.com/UserManuals/DaVinci-Resolve-20-Editors-Guide.pdf
- **トレーニングページ**: https://www.blackmagicdesign.com/jp/products/davinciresolve/training
- **問い合わせ**: learning-jp@blackmagicdesign.com

## 認定資格ロードマップ（試験合格後）
1. **認定トレーナー** ← 現在目標（Beginners Guide全範囲・試験85%）
2. 認定エディター → Editor's Guide
3. 認定カラリスト → Colorist Guide
4. 認定サウンドエディター → Fairlight Audio Guide

## video.html の9動画リスト（2026-04-26時点）
| # | 動画ID | タイトル |
|---|--------|---------|
| 1 | ZTbh928Qk3o | 動画編集の基礎（エディットページ） |
| 2 | r7qIZxok6v8 | オーディオ・エフェクト・タイトル |
| 3 | yg6lEJURdTk | プライマリーカラーコレクション |
| 4 | jDHc8-LfCbs | セカンダリーカラーコレクション |
| 5 | sqMdXBGZ5pA | グレードの管理 |
| 6 | ZHrgtYN_PjE | 設定と素材の管理（メディアページ） |
| 7 | 0og6U9u0CPs | 音声編集の基礎（Fairlightページ） |
| 8 | jo-A1bMjWqE | 合成の基礎（Fusionページ） |
| 9 | KjWp-FsYWv0 | ファイルの書き出しとプロジェクト管理 |
