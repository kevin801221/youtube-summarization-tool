<div align="center">
<img width="1200" height="475" alt="VideoMind Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# VideoMind

**把任何 YouTube 影片轉成結構化洞察的 AI 工具**

用 Google Gemini 原生的 YouTube URL 理解能力，一鍵產生章節、金句、心智圖、Shorts 腳本，並支援中英雙語對照。

</div>

---

## 功能

- **章節切分（Chapters）**：自動產生時間戳 + 重要性分級
- **重點洞察（Key Insights）**：分類成概念 / 資料 / 故事 / 建議
- **金句卡片（Golden Quotes）**：含講者、時間戳，可匯出圖片分享
- **心智圖（Mind Map）**：D3 視覺化影片架構
- **心智模型（Mental Models）**：萃取影片中的思考框架
- **行動清單（Action Items）** + **追問問題（Follow-up Questions）**
- **Shorts 腳本產生**：Hook / Body / CTA + 建議剪輯時間點
- **中英雙語對照模式**：Dual Mode 顯示原文 + 翻譯
- **歷史紀錄**：自動存 localStorage（最多 20 筆）
- **YouTube 內嵌播放器**：點時間戳可直接跳轉

## 技術棧

| 類別 | 技術 |
|---|---|
| 前端框架 | React 19 + TypeScript |
| 建置工具 | Vite 6 |
| 樣式 | Tailwind CSS v4 |
| 動畫 | Motion (Framer Motion v12) |
| 視覺化 | D3.js v7 |
| AI | Google Gemini (`@google/genai`)，模型 `gemini-2.0-flash` |
| 圖示 | Lucide React |
| 圖片匯出 | html2canvas |

## 本地執行

### 需求

- Node.js 20+
- Gemini API Key（[到 AI Studio 申請](https://aistudio.google.com/apikey)）

### 步驟

```bash
# 1. 安裝套件
npm install

# 2. 建立環境變數
cp .env.example .env.local
# 編輯 .env.local，填入你的 GEMINI_API_KEY

# 3. 啟動開發伺服器
npm run dev
```

預設跑在 http://localhost:3000

### 可用指令

```bash
npm run dev      # 開發模式（port 3000，對外開放）
npm run build    # 產生 production bundle
npm run preview  # 預覽 build 結果
npm run lint     # TypeScript 型別檢查
npm run clean    # 清除 dist/
```

## 環境變數

| 變數 | 必填 | 說明 |
|---|---|---|
| `GEMINI_API_KEY` | ✅ | Google Gemini API 金鑰 |
| `APP_URL` | ⚪ | 部署網址（AI Studio 自動注入） |

## 專案結構

```
src/
├── App.tsx                    # 主要應用邏輯 + 狀態管理
├── main.tsx                   # Entry point
├── index.css                  # Tailwind entry
├── types.ts                   # TypeScript 型別定義
├── components/
│   ├── LandingPage.tsx        # 首頁 Hero 區塊
│   ├── PricingSection.tsx     # 定價區塊
│   ├── YouTubePlayer.tsx      # YouTube 內嵌播放器 + URL parser
│   ├── MindMap.tsx            # D3 心智圖視覺化
│   └── QuoteCard.tsx          # 可匯出的金句卡片
├── services/
│   └── geminiService.ts       # Gemini API 呼叫 + JSON schema
└── lib/
    └── utils.ts               # cn() 工具函式（clsx + twMerge）
```

## 資料流程

```
YouTube URL
    ↓
geminiService.analyzeVideo()
    ↓
Gemini 2.0 Flash（直接讀 YouTube URL）
    ↓
結構化 JSON（VideoMindAnalysis）
    ↓
React 渲染 → 章節 / 洞察 / 金句 / 心智圖 / Shorts
    ↓
localStorage（歷史紀錄）
```

## 部署

這是純前端 SPA，可直接部署到任何靜態託管平台（Vercel、Netlify、Cloudflare Pages、AI Studio）。

記得在部署平台設定 `GEMINI_API_KEY` 環境變數。

> ⚠️ 注意：目前 API key 直接在 client 端使用（`process.env.GEMINI_API_KEY` 會被 Vite 注入 bundle）。若要上 production，建議改成後端 proxy 來保護 key。

## License

Private repo — All rights reserved © kevin801221
