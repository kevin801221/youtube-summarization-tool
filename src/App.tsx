import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Clock, 
  ChevronRight, 
  History, 
  Download, 
  Languages, 
  Zap, 
  FileText, 
  ListOrdered, 
  Lightbulb, 
  Quote as QuoteIcon, 
  Network, 
  Clapperboard, 
  CheckCircle2,
  ArrowRight,
  Play
} from 'lucide-react';
import { YouTubePlayer, parseYouTubeUrl, parseTimestamp } from './components/YouTubePlayer';
import { QuoteCard } from './components/QuoteCard';
import { MindMap } from './components/MindMap';
import { analyzeVideo } from './services/geminiService';
import { VideoMindAnalysis, HistoryItem } from './types';
import Markdown from 'react-markdown';
import { cn } from './lib/utils';

import { LandingPage } from './components/LandingPage';
import { PricingSection } from './components/PricingSection';

// --- Utils ---
const LOADING_MESSAGES = [
  "Watching video so you don't have to...",
  "Extracting golden nuggets...",
  "Analyzing key moments...",
  "Building your mind map...",
  "Consulting the knowledge graphs...",
  "Decoding the speaker's intent...",
  "Identifying the core mental models...",
  "Drafting your shorts script...",
  "Polishing the final report..."
];

export default function App() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [analysis, setAnalysis] = useState<VideoMindAnalysis | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('chapters');
  const [dualMode, setDualMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [jumpToTime, setJumpToTime] = useState<number | undefined>(undefined);
  const [languagePref, setLanguagePref] = useState('auto');

  // --- Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem('videomind_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (id: string, url: string, data: VideoMindAnalysis) => {
    const newItem: HistoryItem = { id, url, timestamp: Date.now(), data };
    const newHistory = [newItem, ...history.filter(h => h.id !== id)].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem('videomind_history', JSON.stringify(newHistory));
  };

  // --- Effects ---
  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // --- Handlers ---
  const handleAnalyze = async () => {
    const videoId = parseYouTubeUrl(url);
    if (!videoId) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    setIsAnalyzing(true);
    setCurrentVideoId(videoId);
    
    try {
      const result = await analyzeVideo(url, languagePref);
      setAnalysis(result);
      saveToHistory(videoId, url, result);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please check the console and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleHistoryItemClick = (item: HistoryItem) => {
    setAnalysis(item.data);
    setCurrentVideoId(item.id);
    setUrl(item.url);
    setShowHistory(false);
    setActiveTab('chapters');
  };

  const jumpTo = (timestamp: string) => {
    const seconds = parseTimestamp(timestamp);
    setJumpToTime(seconds);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExport = (type: string) => {
    if (!analysis) return;
    let content = `# ${analysis.metadata.title}\n\n## TL;DR\n${analysis.tldr}\n\n## Chapters\n`;
    analysis.chapters.forEach(c => { content += `- **${c.timestamp}**: ${c.title} - ${c.summary}\n`; });
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `VideoMind-Analysis.md`;
    link.click();
  };

  const resetApp = () => {
    setAnalysis(null);
    setCurrentVideoId(null);
    setUrl('');
    setActiveTab('chapters');
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "tab-item-editorial",
        activeTab === id && "active"
      )}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen pb-20 selection:bg-yt-red/30">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass-card border-none bg-charcoal/80">
        <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yt-red to-yt-red-dark flex items-center justify-center shadow-lg shadow-yt-red/20">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white hidden sm:block font-serif italic">
            Video<span className="text-transparent bg-clip-text bg-accent-grad">Mind</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {!analysis && !isAnalyzing && (
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs text-muted-gray uppercase tracking-widest font-bold hover:text-white transition-colors px-4 py-2"
            >
              Pricing
            </button>
          )}
          {analysis && (
            <button 
              onClick={() => setDualMode(!dualMode)} 
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium",
                dualMode ? "bg-amber/20 text-amber border border-amber/30" : "bg-white/5 text-muted-gray hover:text-white"
              )}
            >
              <Languages size={16} />
              {dualMode ? "Dual Mode On" : "Dual Mode"}
            </button>
          )}
          <button onClick={() => setShowHistory(!showHistory)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-gray hover:text-white transition-colors">
            <History size={20} />
          </button>
          {analysis && (
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all">
                <Download size={16} /> Export
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 py-2 glass-card rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button onClick={() => handleExport('markdown')} className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm">Markdown (.md)</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHistory(false)} className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 bottom-0 w-80 bg-charcoal-lighter z-[70] shadow-2xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><History size={18} /> History</h2>
                <button onClick={() => setShowHistory(false)} className="text-muted-gray hover:text-white"><ChevronRight size={20} /></button>
              </div>
              {history.length === 0 ? <p className="text-center py-12 text-muted-gray">History is empty</p> : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <button key={item.id} onClick={() => handleHistoryItemClick(item)} className="w-full text-left p-3 rounded-xl border border-white/5 hover:border-yt-red/30 transition-all group">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-yt-red transition-colors">{item.data.metadata.title}</h3>
                      <div className="flex items-center justify-between text-[10px] text-muted-gray"><span>{new Date(item.timestamp).toLocaleDateString()}</span><span>{item.data.metadata.contentType}</span></div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-6">
        {!analysis && !isAnalyzing && (
          <LandingPage 
            url={url} 
            setUrl={setUrl} 
            onAnalyze={handleAnalyze} 
            languagePref={languagePref} 
            setLanguagePref={setLanguagePref} 
            history={history}
          />
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-48 space-y-12">
            <div className="relative"><div className="w-32 h-32 rounded-full border-4 border-white/5 border-t-yt-red animate-spin" /><div className="absolute inset-0 flex items-center justify-center"><Youtube size={32} className="text-white fill-yt-red" /></div></div>
            <div className="space-y-4 text-center">
              <motion.p key={loadingMsgIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-2xl font-serif italic text-white">{LOADING_MESSAGES[loadingMsgIdx]}</motion.p>
              <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden mx-auto"><motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 15, ease: "linear" }} className="h-full bg-yt-red" /></div>
            </div>
          </div>
        )}

        {analysis && !isAnalyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 pt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-8">
                {currentVideoId && <YouTubePlayer videoId={currentVideoId} currentTime={jumpToTime} />}
                <div className="relative group">
                  <div className="tldr-card-editorial group-hover:border-yt-red/10 transition-all">
                    <h3 className="text-amber uppercase tracking-[0.2em] text-[10px] font-bold mb-4">The core message</h3>
                    <div className="prose prose-invert prose-sm max-w-none font-serif text-lg italic leading-relaxed text-off-white">
                      <Markdown>{analysis.tldr}</Markdown>
                    </div>
                    {dualMode && analysis.tldrTranslation && (
                      <div className="prose prose-invert prose-sm max-w-none font-serif text-base italic leading-relaxed text-muted-gray mt-4 border-t border-white/5 pt-4">
                        <Markdown>{analysis.tldrTranslation}</Markdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-card rounded-3xl p-8 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-yt-red/10 text-yt-red text-[10px] font-bold uppercase tracking-wider mb-2">{analysis.metadata.contentType}</span>
                    <h1 className="text-3xl font-bold leading-tight font-serif">{analysis.metadata.title}</h1>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5"><span className="text-muted-gray text-[10px] uppercase font-bold block mb-1">Duration</span><span className="font-mono text-sm">{analysis.metadata.estimatedDuration}</span></div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5"><span className="text-muted-gray text-[10px] uppercase font-bold block mb-1">Language</span><span className="text-sm">{analysis.metadata.primaryLanguage}</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky top-[72px] z-40 py-4 -mx-6 px-6 bg-charcoal/80 backdrop-blur-xl border-b border-white/5 mb-8">
              <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
                <TabButton id="chapters" label="Chapters" icon={ListOrdered} />
                <TabButton id="insights" label="Insights" icon={Lightbulb} />
                <TabButton id="quotes" label="Quotes" icon={QuoteIcon} />
                <TabButton id="mindmap" label="Mind Map" icon={Network} />
                <TabButton id="shorts" label="Shorts Script" icon={Clapperboard} />
                <TabButton id="action" label="Takeaways" icon={CheckCircle2} />
              </div>
            </div>

            <div className="min-h-[600px]">
              <AnimatePresence mode="wait">
                {activeTab === 'chapters' && (
                  <motion.div key="chapters" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-4xl mx-auto">
                    {analysis.chapters.map((chapter, i) => (
                      <div key={i} className={cn("glass-card rounded-2xl p-6 flex flex-col md:flex-row gap-6 group relative overflow-hidden", chapter.importance === 'high' && "border-l-4 border-yt-red/50")}>
                        <div className="md:w-24 shrink-0 flex items-center justify-between md:flex-col md:justify-start gap-4">
                          <button onClick={() => jumpTo(chapter.timestamp)} className="timestamp-pill py-1.5 px-3">{chapter.timestamp}</button>
                        </div>

                        <div className="flex-1 space-y-2 pl-4 border-l border-border-subtle">
                          <h4 className="text-xl font-bold group-hover:text-yt-red transition-colors font-serif">{chapter.title}</h4>
                          <p className="text-muted-gray text-sm">{chapter.summary}</p>
                          {dualMode && chapter.translation && (
                            <div className="mt-2 text-xs text-muted-gray/80 border-t border-white/5 pt-2">
                              <p className="font-bold mb-1">{chapter.translation.title}</p>
                              <p>{chapter.translation.summary}</p>
                            </div>
                          )}
                        </div>

                        <button onClick={() => jumpTo(chapter.timestamp)} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><Play size={20} className="fill-white" /></button>
                      </div>
                    ))}
                  </motion.div>
                )}
                {activeTab === 'insights' && (
                  <motion.div key="insights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {analysis.keyInsights.map((insight, i) => (
                      <div key={i} className="glass-card rounded-2xl p-6 flex flex-col hover:translate-y-[-4px] transition-transform">
                        <div className="flex items-center justify-between mb-4"><span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-white/10">{insight.category}</span><button onClick={() => jumpTo(insight.timestamp)} className="timestamp-pill">{insight.timestamp}</button></div>
                        <p className="text-off-white font-medium italic">"{insight.insight}"</p>
                        {dualMode && insight.translation && (
                          <div className="mt-4 pt-4 border-t border-white/5 text-sm text-muted-gray italic">
                            {insight.translation.insight}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
                {activeTab === 'quotes' && (
                  <motion.div key="quotes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {analysis.goldenQuotes.map((quote, i) => <QuoteCard key={i} quote={quote} onJump={jumpTo} />)}
                  </motion.div>
                )}
                {activeTab === 'mindmap' && (
                  <motion.div key="mindmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><MindMap nodes={analysis.mindMapNodes} /></motion.div>
                )}
                {activeTab === 'shorts' && (
                  <motion.div key="shorts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-4">
                    <div className="p-6 rounded-3xl bg-yt-red/10 border border-yt-red/20"><span className="text-yt-red text-[10px] uppercase font-bold block mb-3">The Hook</span><p className="text-2xl font-serif italic text-white">{analysis.shortsScript.hook}</p></div>
                    <div className="p-6 rounded-3xl bg-amber/10 border border-amber/20"><span className="text-amber text-[10px] uppercase font-bold block mb-3">The Body</span><p className="text-xl text-off-white/90">{analysis.shortsScript.body}</p></div>
                    <div className="p-6 rounded-3xl bg-green-500/10 border border-green-500/20"><span className="text-green-400 text-[10px] uppercase font-bold block mb-3">CTA</span><p className="text-lg text-white/90">{analysis.shortsScript.cta}</p></div>
                  </motion.div>
                )}
                {activeTab === 'action' && (
                  <motion.div key="action" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-12">
                    <div className="space-y-4">
                      <h3 className="text-amber uppercase tracking-[0.2em] text-[10px] font-bold mb-4 ml-2">Direct Action Items</h3>
                      {analysis.actionItems.map((item, i) => (
                        <div key={i} className="glass-card p-5 rounded-2xl flex gap-4 items-center group hover:border-yt-red/30 transition-all"><CheckCircle2 size={24} className="text-yt-red" /><p className="text-off-white font-medium">{item}</p></div>
                      ))}
                    </div>

                    {analysis.recommendations && analysis.recommendations.length > 0 && (
                      <div className="space-y-6 pt-12 border-t border-white/5">
                        <div className="flex items-center gap-3 ml-2">
                          <Zap size={20} className="text-amber fill-amber" />
                          <h3 className="text-white text-xl font-serif italic">Recommended Next Steps</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {analysis.recommendations.map((rec, i) => (
                            <a 
                              key={i} 
                              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(rec.searchQuery)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="glass-card p-6 rounded-2xl group hover:border-yt-red/50 transition-all relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 p-3 text-muted-gray group-hover:text-yt-red transition-colors">
                                <ArrowRight size={18} />
                              </div>
                              <h4 className="text-white font-bold mb-2 group-hover:text-yt-red transition-colors">{rec.title}</h4>
                              <p className="text-xs text-muted-gray leading-relaxed">{rec.reason}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="mt-32 border-t border-white/5 py-12 text-center text-[10px] text-muted-gray italic">
        © 2026 VideoMind AI Studio. Built with passion for knowledge extraction.
      </footer>
    </div>
  );
}
