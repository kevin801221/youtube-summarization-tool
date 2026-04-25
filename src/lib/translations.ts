export type UILang = 'en' | 'zh-tw' | 'zh-cn';

export const UI_TRANSLATIONS = {
  en: {
    pricing: "Pricing",
    history: "History",
    export: "Export",
    placeholder: "Paste your video URL (TED talk, Tutorial, or Short)...",
    analyze: "Analyze",
    language: "Language",
    popular: "Popular to Analyze",
    popularSub: "Don't have a link? Try one of these high-value sessions trending in our community.",
    recent: "Continue Discovery",
    footer: "© 2026 VideoMind AI Studio. Built with passion for knowledge extraction.",
    hero_title: "Knowledge extracted at the speed of light.",
    hero_sub: "VideoMind transforms any YouTube video into deeply organized insights, mind maps, and viral shorts in seconds.",
    auto: "Auto-Detect",
    en: "English",
    zhtw: "繁體中文",
    zhcn: "简体中文",
    chapters: "Chapters",
    insights: "Insights",
    quotes: "Quotes",
    mindmap: "Mind Map",
    shorts: "Shorts Script",
    takeaways: "Takeaways",
    tldr: "The core message",
    duration: "Duration",
    lang: "Language",
    dual_mode: "Dual Mode",
    analysis_complete: "Analysis Complete",
    recommended: "Recommended Next Steps",
    analysis_failed: "Analysis failed. Please check your internet or try another video.",
    invalid_url: "Please enter a valid YouTube URL.",
    quota_exceeded: "Quota exceeded. Please try again in 1 minute.",
    malformed_data: "AI returned malformed data. Let's try once more.",
    features: {
      mindmap: { title: "Conceptual Mind Mapping", desc: "Visualize the core architecture of ideas with interactive force-directed graphs built instantly." },
      quotes: { title: "Editorial Quote Cards", desc: "Capture golden nuggets as beautiful, shareable cards for Instagram or Threads automatically." },
      speed: { title: "Sub-second Intelligence", desc: "Native YouTube understanding means no more waiting for transcripts. Gemini watches just like you." }
    },
    pricing_plans: {
      title: "Simple, transparent pricing",
      sub: "Choose the plan that fits your learning velocity. No subscriptions, just value.",
      starter: { 
        name: "Starter", 
        cta: "Start Analyzing",
        features: ["Gemini 2.5 Flash Engine", "Interactive Mind Map", "Bilingual Support", "Export to Markdown"]
      },
      pro: { 
        name: "Pro", 
        cta: "Go Pro",
        features: ["Everything in Starter", "High-Priority Processing", "Dual-Mode Translation", "Unlimited History", "Advanced Quote Cards"]
      },
      elite: { 
        name: "Elite", 
        cta: "Get Elite",
        features: ["Everything in Pro", "Batch Processing", "Custom Export Formats", "Early Access to Features", "Commercial Usage"]
      },
      limit: "Analysis",
      popular: "Most Popular"
    },
    history_empty: "History is empty",
    loading_messages: [
      "Watching video so you don't have to...",
      "Extracting golden nuggets...",
      "Analyzing key moments...",
      "Building your mind map...",
      "Consulting the knowledge graphs...",
      "Decoding the speaker's intent...",
      "Identifying the core mental models...",
      "Drafting your shorts script...",
      "Polishing the final report..."
    ],
    trending_all: "View All Trending",
    no_reg: "No Registration Required",
    learning_dna: "The fastest way to learn is to skip the fluff. VideoMind helps you go straight to the DNA of any video.",
    new_era: "A New Era of Learning"
  },
  'zh-tw': {
    pricing: "定價",
    history: "歷史紀錄",
    export: "匯出",
    placeholder: "貼上 YouTube 影片網址 (TED, 教學或 Shorts)...",
    analyze: "開始分析",
    language: "介面語言",
    popular: "熱門探索",
    popularSub: "沒有靈感？試試社群中熱門的高價值影片。",
    recent: "繼續探索",
    footer: "© 2026 VideoMind AI Studio. 用熱情打造的知識庫神助攻。",
    hero_title: "光速提取影片知識。",
    hero_sub: "VideoMind 將任何 YouTube 影片在幾秒鐘內轉化為精心組織的洞察、心智圖和短影音腳本。",
    auto: "自動偵測",
    en: "英文",
    zhtw: "繁體中文",
    zhcn: "簡體中文",
    chapters: "章節亮點",
    insights: "深度洞察",
    quotes: "金句精選",
    mindmap: "思維導圖",
    shorts: "短片腳本",
    takeaways: "行動建議",
    tldr: "核心摘要",
    duration: "影片時長",
    lang: "原始語言",
    dual_mode: "雙語模式",
    analysis_complete: "分析完成",
    recommended: "建議後續步驟",
    analysis_failed: "分析失敗。請檢查您的網路或換一段影片試試。",
    invalid_url: "請輸入有效的 YouTube 網址。",
    quota_exceeded: "額度已達上限。請在一分鐘後重試。",
    malformed_data: "AI 返回格式錯誤。讓我們再試一次。",
    features: {
      mindmap: { title: "概念心智圖", desc: "即時構建交互式力導向圖，視覺化呈現影片思想的核心架構。" },
      quotes: { title: "編輯級金句卡", desc: "自動將精華語錄轉化為精美的社交媒體分享卡片，支援一鍵分享。" },
      speed: { title: "亞秒級智能", desc: "原生 YouTube 理解能力意味著無需等待逐字稿。Gemini 像您一樣觀看影片。" }
    },
    pricing_plans: {
      title: "簡單透明的定價方案",
      sub: "選擇最適合您學習步調的方案。無需訂閱，即刻展開知識之旅。",
      starter: { 
        name: "入門版", 
        cta: "開始分析",
        features: ["Gemini 2.5 Flash 引擎", "交互式思維導圖", "雙語支援", "匯出 Markdown"]
      },
      pro: { 
        name: "專業版", 
        cta: "升級專業版",
        features: ["包含所有入門版功能", "高優先級處理", "雙語對照模式", "無限歷史紀錄", "進階金句卡片"]
      },
      elite: { 
        name: "旗艦版", 
        cta: "獲取旗艦版",
        features: ["包含所有專業版功能", "批次處理能力", "自定義匯出格式", "優先體驗新功能", "商業授權使用"]
      },
      limit: "次分析",
      popular: "最受歡迎"
    },
    history_empty: "尚無歷史紀錄",
    loading_messages: [
      "正在幫您觀看影片...",
      "正在提取精華金句...",
      "正在分析關鍵時刻...",
      "正在構建心智圖...",
      "正在諮詢知識圖譜...",
      "正在解讀講者意圖...",
      "正在識別核心概念模型...",
      "正在起草短片腳本...",
      "正在打磨最終報告..."
    ],
    trending_all: "查看所有熱門",
    no_reg: "無需註冊即可使用",
    learning_dna: "學習最快的方法就是跳過廢話。VideoMind 助您直擊任何影片的核心精髓。",
    new_era: "學習的新紀元"
  },
  'zh-cn': {
    pricing: "定价",
    history: "历史记录",
    export: "导出",
    placeholder: "粘贴 YouTube 视频链接 (TED, 教程或 Shorts)...",
    analyze: "開始分析",
    language: "界面语言",
    popular: "热门探索",
    popularSub: "没有灵感？試試社区中热门的高价值视频。",
    recent: "继续探索",
    footer: "© 2026 VideoMind AI Studio. 用热情打造的知识挖掘神助攻。",
    hero_title: "光速提取视频知识。",
    hero_sub: "VideoMind 將任何 YouTube 视频在几秒钟内转化为精心组织的洞察、心智图和短视频脚本。",
    auto: "自动偵測",
    en: "英文",
    zhtw: "繁体中文",
    zhcn: "简体中文",
    chapters: "章节亮点",
    insights: "深度洞察",
    quotes: "金句精选",
    mindmap: "思维导图",
    shorts: "短视频脚本",
    takeaways: "行动建议",
    tldr: "核心摘要",
    duration: "视频时长",
    lang: "原始语言",
    dual_mode: "双语模式",
    analysis_complete: "完成分析",
    recommended: "建议后续步骤",
    analysis_failed: "分析失败。请检查您的网络或换一段视频试试。",
    invalid_url: "请输入有效的 YouTube 链接。",
    quota_exceeded: "额度已达上限。请在一分钟后重试。",
    malformed_data: "AI 返回格式错误。让我们再试一次。",
    features: {
      mindmap: { title: "概念心智图", desc: "即时构建交互式力导向图，可视化呈现视频思想的核心架构。" },
      quotes: { title: "编辑级金句卡", desc: "自动將精华语录转化为精美的社交媒体分享卡片，支持一键分享。" },
      speed: { title: "亚秒级智能", desc: "原生 YouTube 理解能力意味着无需等待逐字稿。Gemini 像您一样观看视频。" }
    },
    pricing_plans: {
      title: "简单透明的定价方案",
      sub: "选择最适合您学习步调的方案。无需订阅，即刻展开知识之旅。",
      starter: { 
        name: "入门版", 
        cta: "开始分析",
        features: ["Gemini 2.5 Flash 引擎", "交互式思维导图", "双语支持", "导出 Markdown"]
      },
      pro: { 
        name: "专业版", 
        cta: "升级专业版",
        features: ["包含所有入门版功能", "高优先级处理", "双语对照模式", "无限历史记录", "高级金句卡片"]
      },
      elite: { 
        name: "旗舰版", 
        cta: "获取旗舰版",
        features: ["包含所有专业版功能", "批量处理能力", "自定义导出格式", "优先体验新功能", "商业授权使用"]
      },
      limit: "次分析",
      popular: "最受欢迎"
    },
    history_empty: "尚无历史记录",
    loading_messages: [
      "正在幫您观看视频...",
      "正在提取精华金句...",
      "正在分析关键时刻...",
      "正在构建心智图...",
      "正在咨询知识图谱...",
      "正在解读讲者意图...",
      "正在识别核心概念模型...",
      "正在起草短视频脚本...",
      "正在打磨最终报告..."
    ],
    trending_all: "查看所有热门",
    no_reg: "无需注册即可使用",
    learning_dna: "学习最快的方法就是跳过废话。VideoMind 助您直擊任何视频的核心精髓。",
    new_era: "学习的新纪元"
  }
};
