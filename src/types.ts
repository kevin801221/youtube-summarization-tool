export interface VideoMetadata {
  title: string;
  estimatedDuration: string;
  contentType: 'tutorial' | 'interview' | 'lecture' | 'vlog' | 'review' | 'news';
  primaryLanguage: string;
}

export interface Chapter {
  timestamp: string;
  title: string;
  summary: string;
  importance: 'high' | 'medium' | 'low';
}

export interface Insight {
  insight: string;
  timestamp: string;
  category: 'concept' | 'data' | 'story' | 'advice';
}

export interface Quote {
  quote: string;
  timestamp: string;
  speaker: string;
}

export interface ShortsScript {
  hook: string;
  body: string;
  cta: string;
  suggestedClipTimestamp: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  children: string[];
}

export interface VideoMindAnalysis {
  metadata: VideoMetadata;
  tldr: string;
  chapters: Chapter[];
  keyInsights: Insight[];
  goldenQuotes: Quote[];
  mentalModels: string[];
  actionItems: string[];
  followUpQuestions: string[];
  shortsScript: ShortsScript;
  mindMapNodes: MindMapNode[];
}

export interface HistoryItem {
  id: string;
  url: string;
  timestamp: number;
  data: VideoMindAnalysis;
}
