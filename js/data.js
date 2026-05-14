// DaVinci Resolve 認定トレーナー 学習システム - データ
// 学習期間: 2026年5月1日 ～ 6月26日（8週間・57日間）

const START_DATE = '2026-05-01';
const EXAM_TARGET_DATE = '2026-06-25';

// ── 週テーマ ─────────────────────────────────────────
const WEEKS = [
  { w:1, title:"インターフェース＆プロジェクト管理", sub:"全体像を掴む", color:"#3b82f6", icon:"🖥️", guide:"Ch.1-3 / p.1-80" },
  { w:2, title:"Edit Page 基礎", sub:"編集の基本操作をマスター", color:"#10b981", icon:"✂️", guide:"Ch.4-5 / p.81-200" },
  { w:3, title:"Edit Page 応用", sub:"上級編集技術を習得", color:"#059669", icon:"🎬", guide:"Ch.5-6 / p.200-280" },
  { w:4, title:"Color Page 基礎", sub:"カラーグレーディング入門", color:"#f59e0b", icon:"🎨", guide:"Ch.7-8 / p.281-380" },
  { w:5, title:"Color Page 応用 + Fusion入門", sub:"二次補正とFusionを習得", color:"#ef4444", guide:"Ch.9-11 / p.381-480", icon:"🎭" },
  { w:6, title:"Fusion + Fairlight + Delivery", sub:"残り全ページを制覇", color:"#8b5cf6", icon:"🎵", guide:"Ch.11-13 / p.481-600" },
  { w:7, title:"総合復習＆模擬試験", sub:"全範囲を確認・弱点克服", color:"#f97316", icon:"📝", guide:"全章" },
  { w:8, title:"最終仕上げ＆受験", sub:"自信を持って本番へ", color:"#ec4899", icon:"🏆", guide:"全章" },
];

// ── 56日間カリキュラム ──────────────────────────────
// type: r=読む, v=動画, p=実践, q=クイズ, e=模擬試験
const DAYS = [
  // ══════════ WEEK 1: インターフェース＆プロジェクト管理 ══════════
  {d:1,  w:1, title:"DaVinci Resolveの世界へようこそ", tasks:[
    {id:"01a", t:"r", text:"Beginners Guide Ch.1「入門」を読む（p.1-25）", min:40},
    {id:"01b", t:"v", text:"BlackmagicのYouTube「DaVinci Resolve概要」動画を視聴", min:15},
    {id:"01c", t:"p", text:"DaVinci Resolveを起動し、7ページ（Media/Cut/Edit/Fusion/Color/Fairlight/Deliver）を順番に開いて確認", min:15},
    {id:"01d", t:"q", text:"「インターフェース」クイズ5問に挑戦", min:10},
  ]},
  {d:2,  w:1, title:"プロジェクトマネージャーとデータベース", tasks:[
    {id:"02a", t:"r", text:"Beginners Guide Ch.2「プロジェクトマネージャー」を読む（p.26-50）", min:40},
    {id:"02b", t:"p", text:"新規プロジェクトを3種類の設定（4K/FHD/1080p）で作成し、削除してみる", min:20},
    {id:"02c", t:"p", text:"データベースのバックアップを実際に行う", min:15},
    {id:"02d", t:"q", text:"「プロジェクト管理」クイズ5問に挑戦", min:10},
  ]},
  {d:3,  w:1, title:"Media Pageとメディアの読み込み", tasks:[
    {id:"03a", t:"r", text:"Beginners Guide Ch.3「メディアページ」前半を読む（p.51-65）", min:35},
    {id:"03b", t:"p", text:"サンプル動画・写真をMedia Pageからインポートし、Binsを作成して整理する", min:25},
    {id:"03c", t:"p", text:"Scene Detectionを使って長い動画を自動分割してみる", min:10},
    {id:"03d", t:"q", text:"「メディア管理」クイズ5問に挑戦", min:10},
  ]},
  {d:4,  w:1, title:"Smart Bins・Power Bins・メタデータ", tasks:[
    {id:"04a", t:"r", text:"Beginners Guide Ch.3「メディアページ」後半を読む（p.66-80）", min:30},
    {id:"04b", t:"p", text:"Smart Binsをメタデータ条件（クリップタイプ・フレームレート）で2種類作成する", min:20},
    {id:"04c", t:"p", text:"クリップのメタデータを編集し、Flagとマーカーを付けてみる", min:15},
    {id:"04d", t:"q", text:"「Media Page総合」クイズ5問に挑戦", min:10},
  ]},
  {d:5,  w:1, title:"Cut Page概要", tasks:[
    {id:"05a", t:"r", text:"Beginners Guide Ch.4「Cut Page」を読む（p.81-110）", min:45},
    {id:"05b", t:"v", text:"Cut Page公式チュートリアル動画を視聴", min:20},
    {id:"05c", t:"p", text:"Cut PageでSource Tape表示を使い、クリップを3本タイムラインに追加してみる", min:20},
    {id:"05d", t:"q", text:"「Cut Page」クイズ5問に挑戦", min:10},
  ]},
  {d:6,  w:1, title:"Week 1 総復習", tasks:[
    {id:"06a", t:"r", text:"Week 1の要点ノートを見直す（自分でノートを書く）", min:30},
    {id:"06b", t:"q", text:"「Week 1 まとめクイズ」15問に挑戦", min:20},
    {id:"06c", t:"p", text:"間違えた問題の内容をBeginners Guideで再確認する", min:20},
  ]},
  {d:7,  w:1, title:"【休息日】軽いレビュー", tasks:[
    {id:"07a", t:"r", text:"Beginners Guideのイラスト・図表を見返すだけでOK（15分）", min:15},
    {id:"07b", t:"q", text:"気が向いたら復習クイズ5問（任意）", min:10},
  ]},

  // ══════════ WEEK 2: Edit Page 基礎 ══════════
  {d:8,  w:2, title:"Edit Pageインターフェース詳細", tasks:[
    {id:"08a", t:"r", text:"Beginners Guide Ch.5「Edit Page」前半を読む（p.111-145）", min:45},
    {id:"08b", t:"p", text:"Edit Pageの各ツールバーのボタン名・ショートカットを確認する", min:20},
    {id:"08c", t:"q", text:"「Edit Page UI」クイズ5問に挑戦", min:10},
  ]},
  {d:9,  w:2, title:"基本編集操作（Insert / Overwrite / Append）", tasks:[
    {id:"09a", t:"r", text:"Insert/Overwrite/Appendの違いを熟読する（p.146-165）", min:35},
    {id:"09b", t:"v", text:"基本編集操作の公式動画を視聴", min:15},
    {id:"09c", t:"p", text:"F9（Insert）F10（Overwrite）F11（Replace）を使い分けて3本の編集を行う", min:25},
    {id:"09d", t:"q", text:"「Edit基本操作」クイズ5問に挑戦", min:10},
  ]},
  {d:10, w:2, title:"クリップの選択と移動・削除", tasks:[
    {id:"10a", t:"r", text:"クリップ操作（選択・移動・削除・ギャップ）を読む（p.166-185）", min:35},
    {id:"10b", t:"p", text:"Ripple Delete vs Delete（ギャップあり削除）の違いを実際に確認する", min:20},
    {id:"10c", t:"p", text:"Linked SelectionのON/OFFの挙動を確認する", min:15},
    {id:"10d", t:"q", text:"「クリップ操作」クイズ5問に挑戦", min:10},
  ]},
  {d:11, w:2, title:"トリムツール（Ripple/Roll/Slip/Slide）", tasks:[
    {id:"11a", t:"r", text:"4つのトリムツールを熟読する（p.186-210）", min:40},
    {id:"11b", t:"v", text:"トリムツール解説動画を視聴（特にRippleとRollの違い）", min:15},
    {id:"11c", t:"p", text:"4つのトリムを実際の編集で全部使ってみる", min:30},
    {id:"11d", t:"q", text:"「トリムツール」クイズ5問に挑戦", min:10},
  ]},
  {d:12, w:2, title:"トランジションとスピード変更", tasks:[
    {id:"12a", t:"r", text:"トランジション・速度変更・Retime Controlsを読む（p.211-235）", min:40},
    {id:"12b", t:"p", text:"クロスディゾルブを追加し、デュレーションを変更する。フリーズフレームを作る", min:25},
    {id:"12c", t:"p", text:"スロー・早送り・リバース再生をRetimeで実現する", min:15},
    {id:"12d", t:"q", text:"「トランジション・速度」クイズ5問に挑戦", min:10},
  ]},
  {d:13, w:2, title:"Week 2 総復習", tasks:[
    {id:"13a", t:"r", text:"Edit Page基礎のノートを見直す", min:30},
    {id:"13b", t:"q", text:"「Edit Page Week 2まとめクイズ」15問に挑戦", min:20},
    {id:"13c", t:"p", text:"短い動画（30秒）を実際に編集してみる", min:30},
  ]},
  {d:14, w:2, title:"【休息日】", tasks:[
    {id:"14a", t:"r", text:"ショートカットキー一覧を眺める（15分）", min:15},
  ]},

  // ══════════ WEEK 3: Edit Page 応用 ══════════
  {d:15, w:3, title:"テキスト・タイトル・ジェネレーター", tasks:[
    {id:"15a", t:"r", text:"Titles/Generators/Effects Libraryを読む（p.236-255）", min:35},
    {id:"15b", t:"p", text:"Lower Thirds、カウントダウン、カラーバーを作成する", min:20},
    {id:"15c", t:"p", text:"Fusion Titlesの中から1つ実際にタイムラインに追加してカスタマイズする", min:20},
    {id:"15d", t:"q", text:"「タイトル・テキスト」クイズ5問に挑戦", min:10},
  ]},
  {d:16, w:3, title:"Edit Pageでのオーディオ編集", tasks:[
    {id:"16a", t:"r", text:"Audio on Edit Page を読む（p.256-280）", min:35},
    {id:"16b", t:"p", text:"オーディオレベルをキーフレームで調整し、フェードイン・アウトを設定する", min:25},
    {id:"16c", t:"p", text:"オーディオトラックのタイプ（Mono/Stereo/5.1）の違いを確認する", min:15},
    {id:"16d", t:"q", text:"「オーディオ基礎」クイズ5問に挑戦", min:10},
  ]},
  {d:17, w:3, title:"Inspectorとクリップ属性", tasks:[
    {id:"17a", t:"r", text:"Inspector / クリップ属性 / Dynamic Zoomを読む（p.281-295）", min:30},
    {id:"17b", t:"p", text:"InspectorでTransform（位置・スケール・回転）を調整してピクチャーインピクチャーを作る", min:25},
    {id:"17c", t:"p", text:"Dynamic Zoomを1クリップに適用してKen Burns効果を作る", min:15},
    {id:"17d", t:"q", text:"「Inspector」クイズ5問に挑戦", min:10},
  ]},
  {d:18, w:3, title:"マルチカム編集", tasks:[
    {id:"18a", t:"r", text:"Multicam Clip / マルチカム編集を読む（p.296-315）", min:40},
    {id:"18b", t:"p", text:"2つの動画からMulticam Clipを作成し、Multicam Viewerで切り替え編集してみる", min:30},
    {id:"18c", t:"q", text:"「マルチカム」クイズ5問に挑戦", min:10},
  ]},
  {d:19, w:3, title:"Compound ClipとFlagなど便利機能", tasks:[
    {id:"19a", t:"r", text:"Compound Clips / Markers / Flags / Timeline Indexを読む（p.316-335）", min:35},
    {id:"19b", t:"p", text:"複数クリップからCompound Clipを作成し、展開（Decompose）してみる", min:20},
    {id:"19c", t:"p", text:"Markersを使ってタイムライン上にToDoコメントを付ける", min:15},
    {id:"19d", t:"q", text:"「Compound Clip・Marker」クイズ5問に挑戦", min:10},
  ]},
  {d:20, w:3, title:"Week 3 総復習", tasks:[
    {id:"20a", t:"r", text:"Edit Page応用のノートを見直す", min:30},
    {id:"20b", t:"q", text:"「Edit Page総合まとめクイズ」20問に挑戦", min:25},
    {id:"20c", t:"p", text:"1分間の完成した動画を作ってみる（タイトル・BGM・テロップ付き）", min:40},
  ]},
  {d:21, w:3, title:"【休息日】", tasks:[
    {id:"21a", t:"r", text:"Edit Pageで気になった機能を1つ深掘りする（15分）", min:15},
  ]},

  // ══════════ WEEK 4: Color Page 基礎 ══════════
  {d:22, w:4, title:"Color Pageインターフェース全体像", tasks:[
    {id:"22a", t:"r", text:"Beginners Guide Ch.7「Color Page入門」を読む（p.336-360）", min:40},
    {id:"22b", t:"v", text:"Color Page概要の公式動画を視聴", min:15},
    {id:"22c", t:"p", text:"Color Pageを開き、Gallery/Nodes/Scopes/Viewer/Timelineの各パネルを確認する", min:15},
    {id:"22d", t:"q", text:"「Color Page UI」クイズ5問に挑戦", min:10},
  ]},
  {d:23, w:4, title:"Primary Wheels（Lift/Gamma/Gain/Offset）", tasks:[
    {id:"23a", t:"r", text:"Primary Color Wheels / Bars / Log Wheelsを読む（p.361-380）", min:40},
    {id:"23b", t:"p", text:"映像をLift（シャドウ）Gamma（ミッドトーン）Gain（ハイライト）で調整してみる", min:25},
    {id:"23c", t:"p", text:"Primary Bars と Primary Wheels の操作感の違いを確認する", min:15},
    {id:"23d", t:"q", text:"「Primary Wheels」クイズ5問に挑戦", min:10},
  ]},
  {d:24, w:4, title:"Curves（カーブ）", tasks:[
    {id:"24a", t:"r", text:"Custom Curves / Hue vs. Curvesを読む（p.381-400）", min:40},
    {id:"24b", t:"p", text:"S字カーブでコントラストを上げ、Hue vs. SaturationでSkinトーンだけを調整する", min:25},
    {id:"24c", t:"p", text:"Lum vs. Satカーブでハイライトの彩度を下げる", min:15},
    {id:"24d", t:"q", text:"「Curves」クイズ5問に挑戦", min:10},
  ]},
  {d:25, w:4, title:"スコープ（Waveform/Parade/Vectorscope/Histogram）", tasks:[
    {id:"25a", t:"r", text:"Scopes（4種類）の読み方を熟読する（p.401-420）", min:40},
    {id:"25b", t:"v", text:"Vectorscope・Parade解説動画を視聴", min:15},
    {id:"25c", t:"p", text:"4つのスコープを全部表示し、各スコープで何が読み取れるかを確認する", min:20},
    {id:"25d", t:"q", text:"「スコープ」クイズ5問に挑戦", min:10},
  ]},
  {d:26, w:4, title:"Nodes（ノード）基礎", tasks:[
    {id:"26a", t:"r", text:"Nodes - Serial Node構造を読む（p.421-440）", min:40},
    {id:"26b", t:"p", text:"Corrector Node（Ctrl+Y）を3つ作り、それぞれ別の調整を行う", min:25},
    {id:"26c", t:"p", text:"ノードのラベル名を変更し、色を付けて管理しやすくする", min:10},
    {id:"26d", t:"q", text:"「Nodes基礎」クイズ5問に挑戦", min:10},
  ]},
  {d:27, w:4, title:"Week 4 総復習", tasks:[
    {id:"27a", t:"r", text:"Color Page基礎のノートを見直す", min:30},
    {id:"27b", t:"q", text:"「Color Page基礎まとめクイズ」20問に挑戦", min:25},
    {id:"27c", t:"p", text:"1本の映像にプライマリー補正を行い、シネマティックな雰囲気に仕上げる", min:30},
  ]},
  {d:28, w:4, title:"【休息日】", tasks:[
    {id:"28a", t:"r", text:"カラーグレーディングのYouTube作品を15分鑑賞し、使われている技法を考える", min:15},
  ]},

  // ══════════ WEEK 5: Color Page 応用 + Fusion入門 ══════════
  {d:29, w:5, title:"二次補正・Qualifier（特定色の選択）", tasks:[
    {id:"29a", t:"r", text:"Secondary Corrections / Qualifier を読む（p.441-460）", min:40},
    {id:"29b", t:"v", text:"Qualifierを使ったスキン補正動画を視聴", min:15},
    {id:"29c", t:"p", text:"QualifierでHSL・RGBを使って空の色だけを選択し、青みを強める", min:25},
    {id:"29d", t:"q", text:"「Qualifier・二次補正」クイズ5問に挑戦", min:10},
  ]},
  {d:30, w:5, title:"Power WindowとMotion Tracking", tasks:[
    {id:"30a", t:"r", text:"Power Windows / Trackerを読む（p.461-480）", min:40},
    {id:"30b", t:"p", text:"Power Windowで人物を囲み、背景だけ露出を下げる", min:25},
    {id:"30c", t:"p", text:"Trackerで人物の動きを追跡させ、マスクが追従することを確認する", min:20},
    {id:"30d", t:"q", text:"「Power Window・Tracker」クイズ5問に挑戦", min:10},
  ]},
  {d:31, w:5, title:"Nodeタイプ（Parallel/Layer/Outside）", tasks:[
    {id:"31a", t:"r", text:"Parallel Node / Layer Node / Outside Node を読む（p.481-500）", min:40},
    {id:"31b", t:"p", text:"Parallel Node構造を作り、2種類のカラーグレードをブレンドする", min:25},
    {id:"31c", t:"p", text:"Outside Nodeを使ってマスク外の領域に別の調整を加える", min:20},
    {id:"31d", t:"q", text:"「Nodeタイプ」クイズ5問に挑戦", min:10},
  ]},
  {d:32, w:5, title:"LUT・Stills・Gallery", tasks:[
    {id:"32a", t:"r", text:"LUTs / Stills / Gallery を読む（p.501-515）", min:35},
    {id:"32b", t:"p", text:"LUTをColor Pageに読み込み、Intensityを調整してナチュラルに仕上げる", min:20},
    {id:"32c", t:"p", text:"GalleryにStillを保存し、別のクリップにGrab Stillでグレードをコピーする", min:20},
    {id:"32d", t:"q", text:"「LUT・Gallery」クイズ5問に挑戦", min:10},
  ]},
  {d:33, w:5, title:"Fusion Page入門（ノード基礎・MediaIn/Out）", tasks:[
    {id:"33a", t:"r", text:"Beginners Guide Ch.11「Fusion Page」前半を読む（p.516-540）", min:40},
    {id:"33b", t:"v", text:"Fusion概要チュートリアル動画を視聴", min:15},
    {id:"33c", t:"p", text:"Fusion Pageを開き、MediaIn→MediaOutのデフォルトノードフローを確認する", min:20},
    {id:"33d", t:"q", text:"「Fusion基礎」クイズ5問に挑戦", min:10},
  ]},
  {d:34, w:5, title:"Week 5 総復習", tasks:[
    {id:"34a", t:"r", text:"Color Page応用 + Fusion入門のノートを見直す", min:30},
    {id:"34b", t:"q", text:"「Color Page応用まとめクイズ」20問に挑戦", min:25},
    {id:"34c", t:"p", text:"1本の映像に二次補正（qualifier + power window）を組み合わせてグレーディングする", min:35},
  ]},
  {d:35, w:5, title:"【休息日】", tasks:[
    {id:"35a", t:"r", text:"好きな映画のカラーグレードを分析する（15分）", min:15},
  ]},

  // ══════════ WEEK 6: Fusion + Fairlight + Delivery ══════════
  {d:36, w:6, title:"Fusion：コンポジット基礎（Merge・Background）", tasks:[
    {id:"36a", t:"r", text:"Fusion Mergeノード / コンポジット基礎を読む（p.541-560）", min:40},
    {id:"36b", t:"p", text:"MergeノードでForeground+Backgroundを合成し、Blendモードを変えてみる", min:25},
    {id:"36c", t:"p", text:"FusionでアルファチャンネルのあるPNGと動画を合成する", min:20},
    {id:"36d", t:"q", text:"「Fusionコンポジット」クイズ5問に挑戦", min:10},
  ]},
  {d:37, w:6, title:"Fusion：Text+とキーフレームアニメーション", tasks:[
    {id:"37a", t:"r", text:"Text+ ノード / Keyframes / Trackerを読む（p.561-580）", min:40},
    {id:"37b", t:"p", text:"Text+でアニメーションするタイトルを作成する（フェードイン+スライド）", min:30},
    {id:"37c", t:"p", text:"TrackerノードでTrackingして、オブジェクトにテキストを追従させる", min:20},
    {id:"37d", t:"q", text:"「Fusion Text・アニメーション」クイズ5問に挑戦", min:10},
  ]},
  {d:38, w:6, title:"Fairlight Pageインターフェース＆基礎ミキシング", tasks:[
    {id:"38a", t:"r", text:"Beginners Guide Ch.12「Fairlight」前半を読む（p.581-600）", min:40},
    {id:"38b", t:"v", text:"Fairlight概要チュートリアル動画を視聴", min:15},
    {id:"38c", t:"p", text:"Fairlightを開き、Mixer/Timeline/Editors/Metersの各パネルを確認する", min:15},
    {id:"38d", t:"q", text:"「Fairlight基礎」クイズ5問に挑戦", min:10},
  ]},
  {d:39, w:6, title:"FairlightのEQ・コンプレッサー・ノイズリダクション", tasks:[
    {id:"39a", t:"r", text:"EQ / Compressor / Noise Reduction / Normalizationを読む（p.601-620）", min:40},
    {id:"39b", t:"p", text:"音声トラックにEQを適用して「こもり」を除去する（中低域を削る）", min:20},
    {id:"39c", t:"p", text:"Noise Reductionで背景ノイズを除去し、Normalizationで音量を統一する", min:20},
    {id:"39d", t:"q", text:"「Fairlight EQ・コンプ」クイズ5問に挑戦", min:10},
  ]},
  {d:40, w:6, title:"Deliver Page（書き出し・レンダリング）", tasks:[
    {id:"40a", t:"r", text:"Beginners Guide Ch.13「Deliver Page」を読む（p.621-645）", min:40},
    {id:"40b", t:"p", text:"H.264/MP4、ProRes、DNxHR の3種類のプリセットで書き出しを行う", min:25},
    {id:"40c", t:"p", text:"Render in PlaceとRender All（Full Render）の違いを確認する", min:15},
    {id:"40d", t:"q", text:"「Deliver Page」クイズ5問に挑戦", min:10},
  ]},
  {d:41, w:6, title:"Week 6 総復習", tasks:[
    {id:"41a", t:"r", text:"Fusion/Fairlight/Deliverのノートを見直す", min:30},
    {id:"41b", t:"q", text:"「Week 6まとめクイズ」20問に挑戦", min:25},
    {id:"41c", t:"p", text:"完成した1分間の動画をH.264/MP4でYouTube用に書き出す", min:20},
  ]},
  {d:42, w:6, title:"【休息日】", tasks:[
    {id:"42a", t:"r", text:"Beginners Guideを最初からパラパラめくり、全体を振り返る（20分）", min:20},
  ]},

  // ══════════ WEEK 7: 総合復習＆模擬試験 ══════════
  {d:43, w:7, title:"模擬試験 #1（全問チャレンジ）", tasks:[
    {id:"43a", t:"p", text:"全カテゴリのBeginners Guideを30分ざっと確認", min:30},
    {id:"43b", t:"e", text:"模擬試験 #1（全100問・制限時間60分）", min:65},
    {id:"43c", t:"r", text:"採点し、正解率を記録する", min:5},
  ]},
  {d:44, w:7, title:"模擬試験 #1 の復習（弱点特定）", tasks:[
    {id:"44a", t:"r", text:"間違えた問題をリストアップし、該当章をBeginners Guideで読み直す", min:45},
    {id:"44b", t:"p", text:"弱点カテゴリのみ再度クイズを行う", min:20},
    {id:"44c", t:"r", text:"特に注意が必要なポイントをノートにまとめる", min:15},
  ]},
  {d:45, w:7, title:"模擬試験 #2（シャッフル）", tasks:[
    {id:"45a", t:"p", text:"弱点分野を30分集中復習", min:30},
    {id:"45b", t:"e", text:"模擬試験 #2（全100問・制限時間60分）", min:65},
    {id:"45c", t:"r", text:"採点し、#1との比較・改善点を確認", min:10},
  ]},
  {d:46, w:7, title:"模擬試験 #2 の復習（徹底分析）", tasks:[
    {id:"46a", t:"r", text:"まだ間違えた問題を重点的に復習する", min:45},
    {id:"46b", t:"p", text:"実際にDaVinci Resolveで手を動かして確認する（操作系の問題）", min:30},
    {id:"46c", t:"q", text:"弱点カテゴリのみ集中クイズ（10問）", min:15},
  ]},
  {d:47, w:7, title:"弱点集中強化日", tasks:[
    {id:"47a", t:"r", text:"最も苦手な章（2章分）をBeginners Guideで精読する", min:60},
    {id:"47b", t:"p", text:"その章の操作を実際に行い、体で覚える", min:30},
    {id:"47c", t:"q", text:"その章のクイズを繰り返す（間違いがなくなるまで）", min:20},
  ]},
  {d:48, w:7, title:"本番形式・最終模擬試験", tasks:[
    {id:"48a", t:"r", text:"受験前の最終確認ノートを見直す（30分）", min:30},
    {id:"48b", t:"e", text:"本番形式模擬試験（50問・制限時間60分・タイマーあり）", min:65},
    {id:"48c", t:"r", text:"目標85点以上達成を確認する", min:5},
  ]},
  {d:49, w:7, title:"【休息日・精神的なリセット】", tasks:[
    {id:"49a", t:"r", text:"ショートカットカード（自作メモ）を見返す（15分）", min:15},
    {id:"49b", t:"p", text:"DaVinci Resolveで楽しい動画を気軽に作る（義務なし・20分）", min:20},
  ]},

  // ══════════ WEEK 8: 最終仕上げ＆受験 ══════════
  {d:50, w:8, title:"スピードレビュー：Interface・Edit・Cut", tasks:[
    {id:"50a", t:"r", text:"Ch.1-6のキーポイントのみ30分でざっと見直す", min:30},
    {id:"50b", t:"q", text:"Interface/Cut/Editカテゴリ集中クイズ15問", min:20},
    {id:"50c", t:"p", text:"Edit Pageで間違えやすい操作を確認（Trim、Speed等）", min:20},
  ]},
  {d:51, w:8, title:"スピードレビュー：Color Page全体", tasks:[
    {id:"51a", t:"r", text:"Ch.7-10のキーポイントのみ30分でざっと見直す", min:30},
    {id:"51b", t:"q", text:"Color Pageカテゴリ集中クイズ15問", min:20},
    {id:"51c", t:"p", text:"ノードタイプ（Serial/Parallel/Layer）の違いを実際に確認", min:20},
  ]},
  {d:52, w:8, title:"スピードレビュー：Fusion・Fairlight・Deliver", tasks:[
    {id:"52a", t:"r", text:"Ch.11-13のキーポイントのみ30分でざっと見直す", min:30},
    {id:"52b", t:"q", text:"Fusion/Fairlight/Deliverカテゴリ集中クイズ15問", min:20},
    {id:"52c", t:"p", text:"Deliverで異なる形式（H.264とProRes）で書き出し、違いを確認", min:20},
  ]},
  {d:53, w:8, title:"最終自信クイズ＆弱点最終チェック", tasks:[
    {id:"53a", t:"e", text:"全カテゴリランダム50問（85点以上を目標）", min:60},
    {id:"53b", t:"r", text:"まだ自信がない用語・概念をノートに書き出す（最終メモ）", min:20},
    {id:"53c", t:"p", text:"最終メモの内容をBeginners Guideで確認する", min:20},
  ]},
  {d:54, w:8, title:"前日：心の準備＆軽い総復習", tasks:[
    {id:"54a", t:"r", text:"自作の最終メモを20分で見直す（新しく覚えようとしない）", min:20},
    {id:"54b", t:"q", text:"気が向いたら軽いクイズ10問（プレッシャーなし）", min:15},
    {id:"54c", t:"p", text:"受験の流れを確認：Blackmagic公式サイトからログイン→試験開始の手順", min:10},
  ]},
  {d:55, w:8, title:"【本番受験日】", tasks:[
    {id:"55a", t:"p", text:"体調を整えてから受験。50問・60分。落ち着いて一問一問丁寧に", min:65},
    {id:"55b", t:"r", text:"受験完了！結果を記録する", min:5},
  ]},
  {d:56, w:8, title:"【合格祝い・次のステップへ】", tasks:[
    {id:"56a", t:"r", text:"認定トレーナーとして最初の1人に教える計画を立てる", min:30},
    {id:"56b", t:"p", text:"Blackmagic公式サイトの認定トレーナーページに情報を登録する準備をする", min:20},
  ]},
];

// ── クイズ問題（60問） ───────────────────────────
// cat: interface, media, cut, edit, color, fusion, fairlight, deliver
// ans: 0-indexed 正解番号
const QUESTIONS = [
  // ── Interface & Project (8問) ──
  { id:"q01", cat:"interface", q:"Where is the Project Manager accessed in DaVinci Resolve?", q_ja:"DaVinci Resolveでプロジェクトマネージャーにアクセスするにはどこを操作しますか？", opts:["File menu > Project Manager","By clicking the house icon at the bottom right","Edit menu > Open Project Manager","Workspace menu > Project Manager"], ans:1, exp:"プロジェクトマネージャーは画面右下の家のアイコンをクリックするか、起動時に表示されます。" },
  { id:"q02", cat:"interface", q:"What does 'Smart Bins' do in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Smart Bins」は何をする機能ですか？", opts:["Automatically backs up your project","Creates bins based on metadata criteria","Compresses media files automatically","Bins that sync across multiple workstations"], ans:1, exp:"Smart BinsはメタデータのルールをベースにクリップをBinsに自動分類します。" },
  { id:"q03", cat:"interface", q:"What file extension does a DaVinci Resolve project archive use?", q_ja:"DaVinci Resolveのプロジェクトアーカイブはどのファイル拡張子を使いますか？", opts:[".prproj",".drp",".dra",".fcpx"], ans:2, exp:"エクスポートされたDaVinci Resolveプロジェクトアーカイブは .dra 拡張子を使います。" },
  { id:"q04", cat:"interface", q:"What is the keyboard shortcut to switch to the Color page?", q_ja:"Colorページに切り替えるキーボードショートカットは何ですか？", opts:["F5","F6","F7","F8"], ans:1, exp:"各ページのショートカット：Media=F1, Cut=F2, Edit=F3, Fusion=F4, Color=F6, Fairlight=F7, Deliver=F8（環境により異なります）。DaVinci Resolveでは画面下部のアイコンをクリックするか Shift+2等でアクセスします。" },
  { id:"q05", cat:"interface", q:"Which panel in DaVinci Resolve shows all media clips regardless of which bin they are in?", q_ja:"DaVinci Resolveで、どのBinに入っているかに関わらず全メディアクリップを表示するパネルはどれですか？", opts:["Master Bin","Smart Bin","Power Bin","Media Pool (All)"], ans:3, exp:"Media Poolの「Master」またはルートビューですべてのクリップを確認できます。" },
  { id:"q06", cat:"interface", q:"What is a 'Power Bin' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Power Bin」とは何ですか？", opts:["A bin that uses GPU acceleration","A bin shared across all projects in the database","A bin for storing rendered cache files","A bin for high-resolution media only"], ans:1, exp:"Power Binはデータベース内の全プロジェクトで共有されるBinです。汎用素材（ロゴ、SE等）の管理に便利です。" },
  { id:"q07", cat:"interface", q:"What does 'Flag' do to a clip in DaVinci Resolve?", q_ja:"DaVinci Resolveで「Flag」はクリップに対して何をしますか？", opts:["Applies a color grade","Marks the clip for deletion","Adds a colored label for visual organization","Locks the clip from editing"], ans:2, exp:"Flagはクリップやタイムラインクリップにカラーラベルをつけて視覚的に分類するための機能です。" },
  { id:"q08", cat:"interface", q:"Which option allows multiple users to work on the same DaVinci Resolve project simultaneously?", q_ja:"複数ユーザーが同じDaVinci Resolveプロジェクトで同時に作業できるオプションはどれですか？", opts:["Remote Grades","Multi-User Collaboration","Shared Timeline","Network Rendering"], ans:1, exp:"Multi-User Collaboration（コラボレーションモード）を有効にすると、複数ユーザーが同一プロジェクトを同時編集できます。PostgreSQLデータベースが必要です。" },

  // ── Media Import (5問) ──
  { id:"q09", cat:"media", q:"What does 'Scene Detection' do in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Scene Detection」は何をしますか？", opts:["Detects motion blur in footage","Automatically splits a long clip at detected cut points","Analyzes color scenes","Detects audio clipping"], ans:1, exp:"Scene Detectionは映像のカット点を自動検出し、クリップを分割します。" },
  { id:"q10", cat:"media", q:"What is the purpose of the 'Clone' tool in the Media page?", q_ja:"MediaページのCloneツールの目的は何ですか？", opts:["Duplicates clips in the timeline","Creates an exact bit-for-bit copy of media drives for backup","Copies color grades between clips","Duplicates timelines"], ans:1, exp:"CloneツールはCard Cloning（撮影カード丸ごとバックアップ）のためのツールです。撮影現場でのメディア管理に重要です。" },
  { id:"q11", cat:"media", q:"What is 'Proxy Media' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Proxy Media」とは何ですか？", opts:["Media stored on a server","Lower resolution copies for smoother playback","Placeholder media for missing files","Backup copies in a different format"], ans:1, exp:"Proxy Mediaはスムーズな再生のために作成される低解像度コピーです。書き出し時は元の高解像度に戻ります。" },
  { id:"q12", cat:"media", q:"How does 'Optimized Media' differ from 'Proxy Media'?", q_ja:"「Optimized Media」は「Proxy Media」とどう異なりますか？", opts:["They are identical","Optimized media is higher quality and maintains project resolution","Optimized media is lower quality","Optimized media is cloud-based"], ans:1, exp:"Optimized Mediaはプロジェクト解像度を維持した高品質なキャッシュ。Proxyより品質が高い分ファイルサイズも大きい。" },
  { id:"q13", cat:"media", q:"Where can you view and edit metadata for clips in DaVinci Resolve?", q_ja:"DaVinci Resolveでクリップのメタデータを確認・編集できる場所はどこですか？", opts:["Color page Inspector","Media page Metadata panel","Edit page Info tab","Deliver page Properties"], ans:1, exp:"Media PageのMetadata Panel（またはEdit Page Inspector）でクリップのメタデータを確認・編集できます。" },

  // ── Cut Page (4問) ──
  { id:"q14", cat:"cut", q:"What is the main advantage of the Cut page over the Edit page?", q_ja:"Cut PageがEdit Pageより優れている主な利点は何ですか？", opts:["More color grading options","Faster streamlined editing with fewer steps","Higher resolution playback","Better audio mixing"], ans:1, exp:"Cut PageはYouTuber等の迅速な編集向けに設計されており、少ない手順で高速に編集できます。" },
  { id:"q15", cat:"cut", q:"What is 'Source Tape' in the Cut page?", q_ja:"Cut Pageの「Source Tape」とは何ですか？", opts:["A legacy tape playback mode","All Media Pool clips displayed as a continuous tape","Shows only the selected clip","Records directly to tape"], ans:1, exp:"Source TapeはMedia Pool内の全クリップを1本の連続したテープのように表示します。昔のリニア編集のような感覚で素材を探せます。" },
  { id:"q16", cat:"cut", q:"What does 'Smart Reframe' do in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Smart Reframe」は何をしますか？", opts:["Reframes all clips in the sequence","Automatically repositions content for different aspect ratios","Adds smart zoom to footage","Reframes transitions"], ans:1, exp:"Smart Reframeは16:9から9:16等、アスペクト比変更時にAIが自動的に被写体を中心に再構成します。" },
  { id:"q17", cat:"cut", q:"In the Cut page, what does the 'Fast Review' feature do?", q_ja:"Cut Pageの「Fast Review」機能は何をしますか？", opts:["Plays the timeline at double speed","Plays a selected portion of each clip in condensed form","Skips transitions during playback","Reviews only flagged clips"], ans:1, exp:"Fast ReviewはMedia Poolの各クリップを短時間（例：各10秒）で自動的に確認するモードです。" },

  // ── Edit Page (14問) ──
  { id:"q18", cat:"edit", q:"What is the keyboard shortcut for 'Insert Edit' in DaVinci Resolve?", q_ja:"DaVinci Resolveで「Insert Edit」のキーボードショートカットは何ですか？", opts:["F8","F9","F10","F11"], ans:1, exp:"F9=Insert Edit, F10=Overwrite Edit, F11=Replace Edit, F12=Place on Top" },
  { id:"q19", cat:"edit", q:"What does 'Ripple Delete' do?", q_ja:"「Ripple Delete」は何をしますか？", opts:["Deletes only the selected clip leaving a gap","Deletes the clip and closes the gap automatically","Deletes all clips on the timeline","Deletes the clip and adjacent clips"], ans:1, exp:"Ripple DeleteはクリップをタイムラインからBkspキーで削除し、後ろのクリップが前に詰まります。Deleteキーはギャップを残します。" },
  { id:"q20", cat:"edit", q:"What does 'Linked Selection' do when enabled?", q_ja:"「Linked Selection」を有効にすると何が起こりますか？", opts:["Links audio and video tracks permanently","Ensures video and linked audio move together","Links the timeline to the Media Pool","Links multiple timelines"], ans:1, exp:"Linked Selectionを有効にすると、映像クリップを移動・削除した際、リンクしているオーディオクリップも同時に操作されます。" },
  { id:"q21", cat:"edit", q:"What is a 'Compound Clip' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Compound Clip」とは何ですか？", opts:["A clip with multiple audio tracks","Multiple clips nested into a single clip","A clip with multiple color grades","A clip exported in multiple formats"], ans:1, exp:"Compound ClipはPremiereの「ネスト」に相当します。複数のクリップを1つのクリップにまとめ、グループとして扱えます。" },
  { id:"q22", cat:"edit", q:"Which keyboard shortcut marks the 'In' point in DaVinci Resolve?", q_ja:"DaVinci Resolveで「In」ポイントを打つキーボードショートカットはどれですか？", opts:["O","I","M","S"], ans:1, exp:"I=Mark In, O=Mark Out。これはNLEの標準的なショートカットです。" },
  { id:"q23", cat:"edit", q:"What does the 'Blade Edit Mode' (B key) do?", q_ja:"「Blade Edit Mode」（Bキー）は何をしますか？", opts:["Deletes clips","Splits a clip at the cursor position","Trims clip start","Adds transitions"], ans:1, exp:"Blade Edit Mode（Bキー）はハサミツールで、クリップをクリックした位置でカットします。" },
  { id:"q24", cat:"edit", q:"What does 'Roll Trim' do?", q_ja:"「Roll Trim」は何をしますか？", opts:["Changes one clip's duration affecting downstream clips","Moves the edit point between two clips while keeping total duration","Changes clip content without changing duration","Moves a clip along the timeline"], ans:1, exp:"Roll TrimはPremiere/FCPXで「ローリングトリム」と呼ばれます。カット点を前後に動かしますが、タイムライン全体の長さは変わりません。" },
  { id:"q25", cat:"edit", q:"What does 'Dynamic Zoom' create in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Dynamic Zoom」は何を作りますか？", opts:["Changes timeline zoom automatically","An animated Ken Burns effect between two zoom positions","Zooms without affecting export resolution","Changes viewer zoom dynamically"], ans:1, exp:"Dynamic ZoomはInspectorで開始フレームと終了フレームのズーム位置を設定し、自動的にKen Burns（パン＆スキャン）アニメーションを生成します。" },
  { id:"q26", cat:"edit", q:"What is 'Source Tape' mode in the Edit page?", q_ja:"Edit Pageの「Source Tape」モードとは何ですか？", opts:["A recording mode","Shows all clips in Media Pool played sequentially","A legacy tape compatibility mode","Displays a single selected clip"], ans:1, exp:"Edit PageのViewer左側に表示されるSource Tapeは、Media Poolの全クリップを1本のリールとして連続再生するモードです。" },
  { id:"q27", cat:"edit", q:"How do you create a freeze frame from a clip in DaVinci Resolve?", q_ja:"DaVinci Resolveでクリップからフリーズフレームを作成するにはどうしますか？", opts:["Effects > Freeze Frame","Ctrl+F on the clip","Right-click > Retime Controls, then add freeze frame","You cannot create freeze frames"], ans:2, exp:"クリップを右クリック→Retime Controls（またはR→Add Freeze Frame）でフリーズフレームが作れます。" },
  { id:"q28", cat:"edit", q:"What does the 'Inspector' panel show in the Edit page?", q_ja:"Edit Pageの「Inspector」パネルは何を表示しますか？", opts:["Timeline settings","Clip settings including Transform, Cropping, and effects","Media metadata only","Project settings"], ans:1, exp:"InspectorはPremiere ProのEffect Controlsに相当し、選択中のクリップのTransform・Composite Mode・Retime・Video/Audioエフェクト設定を行います。" },
  { id:"q29", cat:"edit", q:"What is the purpose of 'Markers' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Markers」の目的は何ですか？", opts:["Lock clips in place","Add colored notes and comments to specific frames","Mark export in/out points","Flag clips for deletion"], ans:1, exp:"MarkerはタイムラインやクリップのHEADに貼れる付箋です。色分け・テキストメモ・チャプター設定などに利用できます。" },
  { id:"q30", cat:"edit", q:"What does enabling 'Audio Auto-Levels' do when importing clips?", q_ja:"クリップインポート時に「Audio Auto-Levels」を有効にすると何が起こりますか？", opts:["Sets all audio to 0 dB","Automatically adjusts audio gain to a target level","Synchronizes audio to video","Creates stereo from mono"], ans:1, exp:"Audio Auto-LevelsはAudio Normalizationとも呼ばれ、クリップインポート時に音量を目標値に自動調整します。" },
  { id:"q31", cat:"edit", q:"In DaVinci Resolve, what does 'Multicam Clip' allow you to do?", q_ja:"DaVinci Resolveの「Multicam Clip」は何ができますか？", opts:["Edit multiple timelines simultaneously","Switch between multiple camera angles in real time during playback","Play the timeline on multiple monitors","Render multiple formats at once"], ans:1, exp:"Multicam Clipは複数カメラの映像を同期させ、Multicam Viewer上でリアルタイムにカット切り替え編集できる機能です。" },

  // ── Color Page (15問) ──
  { id:"q32", cat:"color", q:"In the Color page, what does 'Lift' primarily affect?", q_ja:"Colorページで「Lift」は主に何に影響しますか？", opts:["Highlights","Midtones","Shadows","Saturation"], ans:2, exp:"Lift=シャドウ（暗部）, Gamma=ミッドトーン（中間域）, Gain=ハイライト（明部）, Offset=全体的なシフト" },
  { id:"q33", cat:"color", q:"What is a 'Node' in the DaVinci Resolve Color page?", q_ja:"DaVinci Resolve Colorページの「Node」とは何ですか？", opts:["A connection point on the timeline","A processing layer where color corrections are applied","A type of color preset","A Fusion composition element"], ans:1, exp:"ノードはAfter Effectsのレイヤー、Fusionのノードに相当する色補正の処理単位です。直列（Serial）でつなぐのが基本です。" },
  { id:"q34", cat:"color", q:"What does the 'Qualifier' tool do?", q_ja:"「Qualifier」ツールは何をしますか？", opts:["Measures broadcast compliance","Selects a specific color range for secondary correction","Adds a color LUT","Converts to black and white"], ans:1, exp:"QualifierはHSL・RGB・3D選択など複数の方法で特定の色範囲を選択し、その部分だけに補正を加える二次補正ツールです。" },
  { id:"q35", cat:"color", q:"Which scope shows hue vs. saturation distribution?", q_ja:"色相と彩度の分布を表示するスコープはどれですか？", opts:["Waveform","Parade","Histogram","Vectorscope"], ans:3, exp:"VectorscopeはHue（色相）とSaturation（彩度）の分布を極座標で表示します。スキントーンラインへの乗せ具合も確認できます。" },
  { id:"q36", cat:"color", q:"What is a 'LUT' in color grading?", q_ja:"カラーグレーディングにおける「LUT」とは何ですか？", opts:["Live Update Technology","A Look Up Table that maps input to output color values","Level/Unity Transform","Layer Under Timeline"], ans:1, exp:"LUT（Look Up Table）は入力の色値を出力の色値にマッピングする変換テーブルです。技術的な色変換やフィルムルックの付与に使います。" },
  { id:"q37", cat:"color", q:"What does the 'Parallel Node' structure allow?", q_ja:"「Parallel Node」構造は何ができますか？", opts:["Processes nodes in sequence","Applies multiple corrections simultaneously then blends them","Shares nodes between clips","Links timelines together"], ans:1, exp:"Parallel NodeはAlt+P（Mac）で作成し、複数の補正を並列処理してブレンドします。肌補正と背景補正を同時に行う場合などに有効です。" },
  { id:"q38", cat:"color", q:"What is the purpose of 'Stills' in the Color page?", q_ja:"Colorページの「Stills」の目的は何ですか？", opts:["Export current frame as JPEG","Save and recall color grades as reference snapshots","Freeze frame function","Still life photography settings"], ans:1, exp:"StillはカレントフレームのグレードをGalleryに保存する機能です。他のクリップへのGrab Still（グレードコピー）としても使えます。" },
  { id:"q39", cat:"color", q:"What is a 'Power Window' used for?", q_ja:"「Power Window」は何に使われますか？", opts:["Managing multiple project windows","Creating a shape-based mask for targeted corrections","A keyboard shortcut manager","Splitting the viewer into multiple windows"], ans:1, exp:"Power WindowはVignette等の形状マスクを使って特定領域に二次補正を適用するためのツールです。Trackerと組み合わせて被写体追跡もできます。" },
  { id:"q40", cat:"color", q:"What does 'Remote Grades' refer to in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Remote Grades」とは何を指しますか？", opts:["Color grades applied via network","A grade linked to all clips sharing the same source media","Grades stored on a remote server","Color grades from other timelines"], ans:1, exp:"Remote GradesはPremiereの「マスタークリップエフェクト」に相当し、同一ソースメディアを使う全クリップにリンクして適用されます。" },
  { id:"q41", cat:"color", q:"What is 'Noise Reduction' primarily used for in the Color page?", q_ja:"Colorページの「Noise Reduction」は主に何に使われますか？", opts:["Reducing audio noise","Reducing video grain/noise in footage","Smoothing transitions between nodes","Reducing compression artifacts only"], ans:1, exp:"Color PageのNoise ReductionはTemporalとSpatialの2種類があり、映像のノイズ・グレインを除去します。Fairlightで行うのはオーディオノイズ除去です。" },
  { id:"q42", cat:"color", q:"What does 'Gallery' store in the Color page?", q_ja:"Colorページの「Gallery」は何を保存しますか？", opts:["Exported still images","Saved grades, stills, and LUTs for reuse","A library of stock footage","All clips in the timeline as thumbnails"], ans:1, exp:"Galleryは保存したStills（グレードのスナップショット）、PowerGradeを管理する場所です。プロジェクト間でのグレード共有にも使います。" },
  { id:"q43", cat:"color", q:"What is 'Resolve Color Management (RCM)'?", q_ja:"「Resolve Color Management（RCM）」とは何ですか？", opts:["A paid add-on for advanced color","A system where Resolve automatically handles input/output color transforms","A manual color management workflow","A cloud service by Blackmagic"], ans:1, exp:"RCM（Resolve Color Management）はDaVinci Resolveの自動カラーマネジメントシステムで、入力・タイムライン・出力の色空間変換を自動処理します。" },
  { id:"q44", cat:"color", q:"What does 'Color Warper' allow you to adjust?", q_ja:"「Color Warper」は何を調整できますか？", opts:["Geometric image distortion","Hue-vs-hue, hue-vs-sat, and other complex remappings","Automatic color space conversion","Timeline clip colors"], ans:1, exp:"Color WarperはHue/Sat/Lumの対応関係を直感的なメッシュUIで調整できる高度なカラーツールです。" },
  { id:"q45", cat:"color", q:"What is the purpose of 'HDR Grading' mode in DaVinci Resolve?", q_ja:"DaVinci Resolveの「HDR Grading」モードの目的は何ですか？", opts:["A special export format for HDR TVs","Color wheels designed specifically for grading HDR content","Automatic SDR to HDR tone mapping","A preview mode simulating HDR displays"], ans:1, exp:"HDRグレーディングモードはHDR映像用に最適化された複数のゾーン（Shadow/Dark/Light/Highlight/Specular等）のカラーホイールを提供します。" },
  { id:"q46", cat:"color", q:"What does pressing 'Alt+S' (or the equivalent) do in the Color page Node Editor?", q_ja:"Colorページのノードエディターで「Alt+S」を押すと何が起こりますか？", opts:["Saves the current grade","Creates a new Serial node","Opens node settings","Toggles scopes"], ans:1, exp:"Alt+S（Macはoption+S）でSerial Node（直列ノード）を追加できます。Option+P=Parallel、Option+L=Layer、Option+Y=Outside Nodeです（環境により異なります）。" },

  // ── Fusion (8問) ──
  { id:"q47", cat:"fusion", q:"In Fusion, what does the 'MediaIn' node represent?", q_ja:"Fusionの「MediaIn」ノードは何を表しますか？", opts:["The output of the composition","The input footage from the timeline clip","An imported still image","A media file browser"], ans:1, exp:"MediaInはFusion Pageに入力されるタイムラインのクリップ映像を表すノードです。通常はMediaIn→（処理）→MediaOutの流れになります。" },
  { id:"q48", cat:"fusion", q:"What is the fundamental building block of Fusion compositions?", q_ja:"Fusionコンポジションの基本的な構成要素は何ですか？", opts:["Layers","Tracks","Nodes","Objects"], ans:2, exp:"FusionはノードベースのVFXシステムです。After Effectsのようなレイヤーベースではなくノードをつないでエフェクトを構築します。" },
  { id:"q49", cat:"fusion", q:"What does the 'Merge' node do in Fusion?", q_ja:"Fusionの「Merge」ノードは何をしますか？", opts:["Combines multiple audio tracks","Blends two images using composite modes","Merges multiple timelines","Combines multiple compositions"], ans:1, exp:"MergeノードはForeground（前景）とBackground（背景）の2つの入力を受け取り、Blendモードで合成します。Fusionで最もよく使うノードの1つです。" },
  { id:"q50", cat:"fusion", q:"What is the 'Inspector' panel used for in Fusion?", q_ja:"Fusionの「Inspector」パネルは何に使われますか？", opts:["Debugging and error checking","Adjusting parameters for the selected node","Inspecting file metadata","Monitoring render progress"], ans:1, exp:"InspectorはFusionで選択中のノードのパラメーター（属性値）を表示・編集するパネルです。" },
  { id:"q51", cat:"fusion", q:"What does the 'Text+' node create in Fusion?", q_ja:"Fusionの「Text+」ノードは何を作成しますか？", opts:["Plain text notes in the project","Advanced animated text and titles","Text-to-speech conversion","Subtitle file import"], ans:1, exp:"Text+はFusionの高機能テキストノードです。フォント・アニメーション・3D変形など多数の設定が可能です。" },
  { id:"q52", cat:"fusion", q:"What is the purpose of the 'Tracker' node in Fusion?", q_ja:"Fusionの「Tracker」ノードの目的は何ですか？", opts:["Tracks project file history","Follows object motion to attach effects or stabilize","Tracks audio sync points","Monitors render queue"], ans:1, exp:"TrackerノードはAfter EffectsのMotion Trackingに相当し、映像内の物体を追跡してエフェクトをアタッチしたり手ぶれ補正に使います。" },
  { id:"q53", cat:"fusion", q:"What is a 'Macro' in Fusion?", q_ja:"Fusionの「Macro」とは何ですか？", opts:["A large processing-heavy node","A group of nodes saved as a reusable single node","A keyboard shortcut for operations","A high-resolution rendering mode"], ans:1, exp:"MacroはFusion内で複数のノードをまとめて1つの再利用可能なノードとして保存したものです。After Effectsのエクスプレッション・プリセットに近い概念です。" },
  { id:"q54", cat:"fusion", q:"What does 'Keyframes' in Fusion allow?", q_ja:"Fusionの「Keyframes」は何ができますか？", opts:["Import keyboard shortcut presets","Animate parameter values over time","Create still frames from video","Lock timeline segments"], ans:1, exp:"KeyframesはFusion上で時間軸にそってパラメーターを変化させるアニメーションを作成するための機能です。" },

  // ── Fairlight (6問) ──
  { id:"q55", cat:"fairlight", q:"What is the primary purpose of the Fairlight page?", q_ja:"Fairlightページの主な目的は何ですか？", opts:["Color grading for film","Professional audio post-production and mixing","Visual effects compositing","Motion graphics"], ans:1, exp:"Fairlight PageはBlackmagic Designが買収したFairlight社の技術を基にした本格的なDAW（デジタルオーディオワークステーション）です。" },
  { id:"q56", cat:"fairlight", q:"What does 'EQ' do in Fairlight?", q_ja:"Fairlightの「EQ」は何をしますか？", opts:["Equalizes video brightness","Adjusts the frequency balance of audio","Creates equal volumes","Exports audio in equal quality"], ans:1, exp:"EQ（イコライザー）は音声の周波数帯域（低音・中音・高音）のバランスを調整するエフェクトです。" },
  { id:"q57", cat:"fairlight", q:"What does audio 'Normalization' do in Fairlight?", q_ja:"Fairlightのオーディオ「Normalization」は何をしますか？", opts:["Converts to standard format","Adjusts volume to a specified target level","Removes noise","Synchronizes audio with video"], ans:1, exp:"NormalizationはクリップのピークまたはLUFS値を指定した目標レベルに自動調整します。複数クリップの音量を統一する際に便利です。" },
  { id:"q58", cat:"fairlight", q:"What does a 'Compressor' effect do in Fairlight?", q_ja:"Fairlightの「Compressor」エフェクトは何をしますか？", opts:["Compresses audio file size","Reduces dynamic range by attenuating loud sounds","Speeds up audio playback","Combines audio files"], ans:1, exp:"コンプレッサーはダイナミクス（音量の差）を圧縮します。大きな音を小さくして、全体的に均一な音量にします。" },
  { id:"q59", cat:"fairlight", q:"What is 'ADR' in the context of Fairlight?", q_ja:"Fairlightにおける「ADR」とは何ですか？", opts:["Audio Dynamic Range compression","Automatic Dialogue Replacement - re-recording dialogue in studio","Audio Data Reference format","Advanced Digital Recording"], ans:1, exp:"ADR（Automatic Dialogue Replacement / ループ録音）は映画・ドラマの音声制作で、俳優が映像に合わせてスタジオで台詞を再録音する手法です。" },
  { id:"q60", cat:"fairlight", q:"What is 'Noise Reduction' in Fairlight used for?", q_ja:"Fairlightの「Noise Reduction」は何に使われますか？", opts:["Reducing visual noise","Removing background audio noise from recordings","Normalizing audio levels","Compressing audio files"], ans:1, exp:"FairlightのNoise Reductionは、収録時に混入した背景ノイズ（エアコン・環境音等）を除去するためのツールです。" },

  // ── Deliver Page (4問) ──
  { id:"q61", cat:"deliver", q:"What is the 'Deliver' page primarily used for?", q_ja:"「Deliver」ページは主に何に使われますか？", opts:["Delivering project files to clients","Exporting and rendering the final output","Sending projects to other editors","Delivering proxy media"], ans:1, exp:"Deliver Pageはプロジェクトの最終書き出し（レンダリング＆エクスポート）を行う場所です。" },
  { id:"q62", cat:"deliver", q:"What does 'Render in Place' do differently from a full render?", q_ja:"「Render in Place」はフルレンダリングと何が違いますか？", opts:["Renders faster due to GPU","Renders each selected clip to a new file individually","Creates proxy files","There is no difference"], ans:1, exp:"Render in PlaceはFusion Compositeなど処理の重いクリップを事前に個別レンダリングしてリアルタイム再生できるようにする機能です。タイムライン全体を書き出すわけではありません。" },
  { id:"q63", cat:"deliver", q:"What does 'Data Burn-In' do on the Deliver page?", q_ja:"Deliverページの「Data Burn-In」は何をしますか？", opts:["Burns the project data to a disc","Overlays timecode and metadata text onto the video","Creates a data backup","Generates chapter markers"], ans:1, exp:"Data Burn-InはタイムコードやReel名、クリップ名等のテキストを映像に焼き付けて出力する機能です。QC用のリファレンス動画に使います。" },
  { id:"q64", cat:"deliver", q:"Which format supports alpha channels and is commonly used for professional delivery?", q_ja:"アルファチャンネルをサポートし、プロフェッショナル納品に一般的に使われるフォーマットはどれですか？", opts:["MP4 H.264","QuickTime ProRes","MP3","GIF"], ans:1, exp:"QuickTime ProRes（特にProRes 4444）はアルファチャンネルをサポートし、劣化の少ない高品質なプロフェッショナル映像フォーマットです。" },

  // ══════════ 追加問題: AI / DaVinci Neural Engine ══════════
  { id:"q65", cat:"color", q:"What is 'Magic Mask' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Magic Mask」とは何ですか？", opts:["A mask applied to the entire timeline","An AI-powered tool that automatically isolates people or objects","A preset mask shape in Power Windows","A mask exported from Fusion"], ans:1, exp:"Magic MaskはDaVinci Neural Engineを使用し、人物やオブジェクトをAIが自動でマスクする機能です。手動でPower Windowを描く必要がありません。" },
  { id:"q66", cat:"color", q:"What AI feature does 'Face Refinement' use in the Color page?", q_ja:"Colorページの「Face Refinement」はどのAI機能を使いますか？", opts:["Manual face detection markers","DaVinci Neural Engine for automatic face detection","GPU-based edge detection","External plugin processing"], ans:1, exp:"Face RefinementはDaVinci Neural Engineで顔を自動検出し、目・唇・頬・額など部位別に補正できる機能です。" },
  { id:"q67", cat:"edit", q:"What does 'DaVinci Neural Engine' power in DaVinci Resolve?", q_ja:"「DaVinci Neural Engine」はDaVinci Resolveでどのような機能を提供しますか？", opts:["Only color correction","AI features like Speed Warp, Magic Mask, Face Refinement, and Super Scale","Hardware acceleration for playback","Network rendering"], ans:1, exp:"DaVinci Neural EngineはSpeed Warp（AIリタイム）、Magic Mask、Face Refinement、Super Scale（AI超解像）など多数のAI機能を動かすエンジンです。" },
  { id:"q68", cat:"edit", q:"What does 'Speed Warp' do in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Speed Warp」は何をしますか？", opts:["Warps the timeline speed globally","Uses AI to generate intermediate frames for smooth slow motion","Adjusts audio speed independently","Creates timelapse from video"], ans:1, exp:"Speed WarpはDaVinci Neural Engineを使用してフレーム間を補間し、スムーズなスローモーションを生成するAIリタイム機能です。" },
  { id:"q69", cat:"deliver", q:"What does 'Super Scale' do in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Super Scale」は何をしますか？", opts:["Scales the timeline viewer","Uses AI to upscale footage to higher resolutions","Compresses output files","Scales audio volume"], ans:1, exp:"Super ScaleはDaVinci Neural Engineを使い、低解像度の映像をAIで高解像度にアップスケールする機能です。2x、3x、4xの倍率が選べます。" },
  { id:"q70", cat:"edit", q:"What does 'IntelliTrack' refer to in DaVinci Resolve?", q_ja:"DaVinci Resolveの「IntelliTrack」とは何ですか？", opts:["An intelligent timeline navigation tool","AI-powered object tracking in the Color page","An audio tracking tool in Fairlight","A project management feature"], ans:1, exp:"IntelliTrackはDaVinci Neural Engineによるオブジェクト追跡機能で、Color PageのTrackerやMagic Maskで使用されます。" },
  { id:"q71", cat:"edit", q:"What is 'Auto Color' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Auto Color」とは何ですか？", opts:["A preset LUT applied to all clips","AI-based automatic color balance and correction","A manual white balance tool","A Color page export setting"], ans:1, exp:"Auto ColorはDaVinci Neural Engineを使用してクリップの色を自動的にバランス調整する機能です。" },
  { id:"q72", cat:"fairlight", q:"What does 'Voice Isolation' do in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Voice Isolation」は何をしますか？", opts:["Records voiceover in the timeline","Uses AI to separate dialogue from background noise","Adjusts voice EQ preset","Isolates specific audio tracks"], ans:1, exp:"Voice IsolationはDaVinci Neural EngineのAIを使い、背景ノイズから人の声だけを分離・抽出する機能です。" },
  { id:"q73", cat:"edit", q:"What does 'Smart Reframe' use to track subjects?", q_ja:"「Smart Reframe」は被写体の追跡に何を使いますか？", opts:["Manual keyframes","DaVinci Neural Engine AI analysis","GPU hardware acceleration","External tracking data"], ans:1, exp:"Smart ReframeはDaVinci Neural Engineで映像内の被写体を分析し、異なるアスペクト比に自動で再構成します。" },
  { id:"q74", cat:"edit", q:"What is 'Object Removal' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Object Removal」とは何ですか？", opts:["Deletes clips from the timeline","Uses AI to remove unwanted objects from footage","Removes audio noise","Removes transitions"], ans:1, exp:"Object RemovalはDaVinci Neural Engineを使って映像から不要なオブジェクトをAIで除去する機能です。Fusionページで利用可能です。" },

  // ══════════ 追加問題: 各ページ深掘り ══════════
  // ── Interface 追加 ──
  { id:"q75", cat:"interface", q:"What are the seven main pages in DaVinci Resolve?", q_ja:"DaVinci Resolveの7つのメインページは何ですか？", opts:["Media, Cut, Edit, Fusion, Color, Fairlight, Deliver","Import, Trim, Edit, Effects, Grade, Mix, Export","Media, Timeline, Edit, VFX, Color, Audio, Render","Input, Assembly, Edit, Composite, Grade, Sound, Output"], ans:0, exp:"DaVinci Resolveの7ページは Media, Cut, Edit, Fusion, Color, Fairlight, Deliver です。画面下部のアイコンで切り替えます。" },
  { id:"q76", cat:"interface", q:"What database system is required for DaVinci Resolve multi-user collaboration?", q_ja:"DaVinci Resolveのマルチユーザーコラボレーションに必要なデータベースシステムは何ですか？", opts:["SQLite","MySQL","PostgreSQL","MongoDB"], ans:2, exp:"マルチユーザーコラボレーションにはPostgreSQLデータベースが必要です。無料版のDaVinci Resolveでは使えません（Studio版のみ）。" },
  { id:"q77", cat:"interface", q:"What is the difference between a 'Project' and a 'Timeline' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「プロジェクト」と「タイムライン」の違いは何ですか？", opts:["They are the same thing","A project contains one or more timelines","A timeline contains multiple projects","Projects are for color and timelines for editing"], ans:1, exp:"プロジェクトは作業全体の器で、その中に1つ以上のタイムラインを作成できます。1プロジェクト=1本の作品とは限りません。" },

  // ── Media 追加 ──
  { id:"q78", cat:"media", q:"What is the purpose of 'Render Cache' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Render Cache」の目的は何ですか？", opts:["Final export of the project","Pre-renders complex sections for smooth playback","Stores project settings","Backs up media files"], ans:1, exp:"Render Cacheはタイムライン上の重い処理（エフェクト・Fusion等）を事前にレンダリングし、スムーズに再生するためのキャッシュ機能です。" },
  { id:"q79", cat:"media", q:"What does 'Conform Lock' do when relinking media?", q_ja:"メディアの再リンク時に「Conform Lock」は何をしますか？", opts:["Locks the timeline from changes","Prevents accidental relinking to wrong media","Locks media to a specific drive","Permanently links media to the project"], ans:1, exp:"Conform Lockはメディアを再リンクする際に、誤ったファイルへのリンクを防止する機能です。" },

  // ── Cut 追加 ──
  { id:"q80", cat:"cut", q:"What is the 'Sync Bin' feature in the Cut page?", q_ja:"Cut Pageの「Sync Bin」機能とは何ですか？", opts:["A bin for synchronized audio files","Shows all camera angles at the same timecode","A shared bin between projects","A bin for synced subtitles"], ans:1, exp:"Sync BinはCut Pageで同じタイムコードを持つ複数カメラのアングルを自動的に表示し、マルチカム編集を簡単にする機能です。" },
  { id:"q81", cat:"cut", q:"What is the 'Boring Detector' in DaVinci Resolve's Cut page?", q_ja:"DaVinci Resolve Cut Pageの「Boring Detector」とは何ですか？", opts:["Detects silent audio sections","Highlights long clips without cuts that may need trimming","Detects duplicate clips","Finds clips with low visual interest"], ans:1, exp:"Boring Detectorはタイムライン上でカットされていない長いクリップ（視聴者が退屈する可能性のある箇所）をハイライトする機能です。" },

  // ── Edit 追加 ──
  { id:"q82", cat:"edit", q:"What does 'Slip Trim' do in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Slip Trim」は何をしますか？", opts:["Moves the clip position on the timeline","Changes which portion of source media is shown without changing duration","Extends the clip beyond its boundaries","Splits the clip into two parts"], ans:1, exp:"Slip Trimはクリップの位置とデュレーションを維持したまま、ソースメディアの使用範囲（In/Out点）をスライドさせる機能です。" },
  { id:"q83", cat:"edit", q:"What does 'Slide Trim' do in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Slide Trim」は何をしますか？", opts:["Changes the source content shown","Moves a clip along the timeline while adjusting neighboring clips","Adjusts audio independently","Adds a sliding transition"], ans:1, exp:"Slide Trimはクリップの内容を変えずにタイムライン上の位置を移動させ、隣接クリップのIn/Out点が自動調整される機能です。" },
  { id:"q84", cat:"edit", q:"What is 'Adjustment Clip' used for in the Edit page?", q_ja:"Edit Pageの「Adjustment Clip」は何に使われますか？", opts:["Adjusting audio levels","Applying effects to all clips below it on the timeline","Adjusting project settings","Calibrating color scopes"], ans:1, exp:"Adjustment ClipはPremiere ProのAdjustment Layerに相当し、タイムライン上でその下にあるすべてのクリップにエフェクトを一括適用できます。" },
  { id:"q85", cat:"edit", q:"What does 'Place on Top' (F12) do in the Edit page?", q_ja:"Edit Pageの「Place on Top」（F12）は何をしますか？", opts:["Places the clip at the top of the media pool","Adds the clip to the next available video track above","Replaces the clip under the playhead","Places the clip at the beginning of the timeline"], ans:1, exp:"Place on Top（F12）はクリップを現在の再生位置で、既存クリップの上の空いているビデオトラックに配置します。PiP等に便利です。" },
  { id:"q86", cat:"edit", q:"What is 'Retime Controls' used for?", q_ja:"「Retime Controls」は何に使われますか？", opts:["Controlling project frame rate","Adjusting clip playback speed with detailed control","Syncing timecode between clips","Setting timeline duration"], ans:1, exp:"Retime Controlsはクリップの再生速度を詳細に制御する機能です。速度変更点の追加、フリーズフレーム、逆再生などが可能です。" },

  // ── Color 追加 ──
  { id:"q87", cat:"color", q:"What is a 'Layer Node' used for in Color page?", q_ja:"Colorページの「Layer Node」は何に使われますか？", opts:["Creating timeline layers","Compositing corrections using alpha channels like Photoshop layers","Adjusting audio layers","Adding text layers"], ans:1, exp:"Layer Nodeはフォトショップのレイヤーのようにアルファチャンネルを使って補正を合成するノードです。特定領域の補正をPower Windowと組み合わせて使います。" },
  { id:"q88", cat:"color", q:"What does the 'Outside Node' do?", q_ja:"「Outside Node」は何をしますか？", opts:["Applies corrections to areas outside the current window/qualifier selection","Adds corrections from external sources","Applies effects outside the Color page","Processes nodes from other timelines"], ans:0, exp:"Outside NodeはPower WindowやQualifierで選択された領域の「外側」に補正を適用するノードです。Alt/Option+Yで作成できます。" },
  { id:"q89", cat:"color", q:"What is 'Color Space Transform (CST)' used for?", q_ja:"「Color Space Transform（CST）」は何に使われますか？", opts:["Changing the workspace background color","Converting footage between different color spaces and gamma curves","Transforming the shape of Power Windows","Adjusting monitor calibration"], ans:1, exp:"CST（Color Space Transform）はLog/Linear、Rec.709/Rec.2020等の異なるカラースペースやガンマカーブ間の変換を行うOFXプラグインです。" },
  { id:"q90", cat:"color", q:"What does the 'Waveform' scope primarily show?", q_ja:"「Waveform」スコープは主に何を表示しますか？", opts:["Audio waveforms","Luminance levels across the image from left to right","Color temperature distribution","Frame rate analysis"], ans:1, exp:"Waveformは映像の左から右にかけての輝度レベルを表示します。露出の確認、黒つぶれ・白飛びのチェックに使います。" },
  { id:"q91", cat:"color", q:"What does the 'Parade' scope show?", q_ja:"「Parade」スコープは何を表示しますか？", opts:["A parade of all clips in the timeline","Separate waveforms for Red, Green, and Blue channels","Audio frequency spectrum","Timeline marker positions"], ans:1, exp:"ParadeはRGB各チャンネルを分けてWaveform表示するスコープです。ホワイトバランスの確認・調整に特に有効です。" },

  // ── Fusion 追加 ──
  { id:"q92", cat:"fusion", q:"What does 'MediaOut' node do in Fusion?", q_ja:"Fusionの「MediaOut」ノードは何をしますか？", opts:["Exports media to disk","Sends the processed result back to the Edit/Color timeline","Creates a new media file","Outputs to an external monitor"], ans:1, exp:"MediaOutはFusionでの処理結果をEdit/Colorタイムラインに戻すための出力ノードです。MediaIn→処理→MediaOutが基本フローです。" },
  { id:"q93", cat:"fusion", q:"What is a 'Background' node in Fusion?", q_ja:"Fusionの「Background」ノードとは何ですか？", opts:["The background image of the project","A node that generates a solid color or gradient","A reference to the wallpaper","The lowest layer in the composition"], ans:1, exp:"Backgroundノードは単色やグラデーションを生成するノードです。テキストの背景やMergeノードのBackground入力に使います。" },
  { id:"q94", cat:"fusion", q:"What are 'Spline' editors used for in Fusion?", q_ja:"Fusionの「Spline」エディターは何に使われますか？", opts:["Drawing bezier shapes","Editing keyframe animation curves","Adjusting audio curves","Creating node connections"], ans:1, exp:"SplineエディターはFusionでキーフレームアニメーションのカーブ（イージング）を編集するためのパネルです。After EffectsのGraph Editorに相当します。" },

  // ── Fairlight 追加 ──
  { id:"q95", cat:"fairlight", q:"What is the 'Mixer' panel in Fairlight?", q_ja:"Fairlightの「Mixer」パネルとは何ですか？", opts:["A video transition mixer","A multi-channel audio mixing console with faders and controls","A media format converter","A color mixing tool"], ans:1, exp:"MixerパネルはFairlightのオーディオミキシングコンソールで、各トラックのフェーダー・パン・ミュート・ソロ・EQ・エフェクトを制御します。" },
  { id:"q96", cat:"fairlight", q:"What does 'Bus' mean in Fairlight audio mixing?", q_ja:"Fairlightのオーディオミキシングにおける「Bus」とは何ですか？", opts:["A type of audio plugin","A routing destination where multiple audio tracks are combined","A timeline navigation shortcut","An audio file format"], ans:1, exp:"Busは複数のオーディオトラックをまとめて1つのルーティング先に送る機能です。サブミックス（ダイアログBus、音楽Bus等）の作成に使います。" },
  { id:"q97", cat:"fairlight", q:"What does 'Limiter' do in audio processing?", q_ja:"オーディオ処理における「Limiter」は何をしますか？", opts:["Limits the number of audio tracks","Prevents audio from exceeding a set maximum level","Limits the timeline length","Reduces audio file size"], ans:1, exp:"Limiterは音声信号が設定した最大レベルを超えないように制限するエフェクトです。マスタリング時のクリッピング防止に使います。" },

  // ── Deliver 追加 ──
  { id:"q98", cat:"deliver", q:"What is 'Quick Export' in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Quick Export」とは何ですか？", opts:["A faster rendering engine","A one-click export option accessible from any page","An export preset for social media only","A batch rendering feature"], ans:1, exp:"Quick Exportは任意のページからFile→Quick Exportでアクセスでき、プリセット（H.264, YouTube, Vimeo等）でワンクリック書き出しができる機能です。" },
  { id:"q99", cat:"deliver", q:"What is the difference between 'Individual Clips' and 'Single Clip' render options?", q_ja:"「Individual Clips」と「Single Clip」のレンダリングオプションの違いは何ですか？", opts:["Individual exports each timeline clip separately; Single exports one file","Individual renders faster; Single renders slower","They produce the same output","Individual is for audio; Single is for video"], ans:0, exp:"Individual Clipsはタイムライン上の各クリップを別々のファイルとして書き出し、Single Clipはタイムライン全体を1つのファイルにまとめて書き出します。" },
  { id:"q100", cat:"deliver", q:"What does 'Render Queue' do in DaVinci Resolve?", q_ja:"DaVinci Resolveの「Render Queue」は何をしますか？", opts:["Queues projects for collaborative editing","Lists multiple render jobs to be processed sequentially","Prioritizes GPU resources","Manages cloud rendering tasks"], ans:1, exp:"Render Queue（レンダーキュー）は複数のレンダリングジョブをリストに追加し、順番に処理する機能です。異なる設定で複数回書き出す際に便利です。" },
];

// カテゴリ表示名
const CAT_LABELS = {
  interface: "🖥️ Interface & Project",
  media:     "📁 Media Import",
  cut:       "⚡ Cut Page",
  edit:      "✂️ Edit Page",
  color:     "🎨 Color Page",
  fusion:    "✨ Fusion",
  fairlight: "🎵 Fairlight",
  deliver:   "📤 Deliver",
};
