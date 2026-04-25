import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Youtube,
  Quote,
  Network,
  Languages,
  History
} from 'lucide-react';
import { PricingSection } from './PricingSection';
import { HistoryItem } from '../types';

interface LandingPageProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: () => void;
  languagePref: string;
  setLanguagePref: (lang: string) => void;
  history?: HistoryItem[];
  t: any;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  url, 
  setUrl, 
  onAnalyze, 
  languagePref, 
  setLanguagePref,
  history = [],
  t
}) => {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 flex flex-col items-center text-center space-y-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yt-red/10 blur-[120px] rounded-full -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <Sparkles size={12} /> Powered by Gemini 2.5 Flash
          </div>
          <h1 className="text-6xl md:text-8xl font-serif italic font-bold tracking-tight text-white leading-[0.9]">
            {t.hero_title}
          </h1>
          <p className="text-muted-gray text-xl md:text-2xl max-w-2xl mx-auto font-light">
            {t.hero_sub}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-3xl px-6 space-y-6"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-muted-gray group-focus-within:text-yt-red transition-colors">
              <Youtube size={24} />
            </div>
            <input 
              type="text" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder={t.placeholder} 
              className="w-full bg-surface border border-border-subtle hover:border-white/20 focus:border-yt-red/50 focus:ring-0 rounded-full py-6 pl-16 pr-36 text-lg transition-all outline-none backdrop-blur-xl"
              onKeyDown={(e) => e.key === 'Enter' && onAnalyze()}
            />
            <button 
              onClick={onAnalyze} 
              className="absolute right-2 inset-y-2 px-8 rounded-full bg-accent-grad text-white font-bold text-sm shadow-xl shadow-yt-red/20 hover:shadow-yt-red/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 group/btn"
            >
              {t.analyze} <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[11px] text-muted-gray uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2">
              <Languages size={14} className="text-amber" />
              <span>{t.lang}:</span>
              <select 
                value={languagePref} 
                onChange={(e) => setLanguagePref(e.target.value)}
                className="bg-transparent border-none p-0 focus:ring-0 cursor-pointer hover:text-white transition-colors"
              >
                <option value="auto">{t.auto}</option>
                <option value="English">{t.en}</option>
                <option value="繁體中文">{t.zhtw}</option>
                <option value="日本語">日本語</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-500" /> {t.no_reg}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Recent Activity (Personalized Recommendations) */}
      {history.length > 0 && (
        <section className="px-6 space-y-8 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <History size={16} className="text-muted-gray" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted-gray font-bold">{t.recent}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.slice(0, 3).map((item) => (
              <button 
                key={item.id} 
                onClick={() => {
                  setUrl(item.url);
                  // We could trigger analysis directly but better to let user review
                }}
                className="glass-card p-6 rounded-2xl flex gap-4 items-center text-left group hover:border-yt-red/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-yt-red/10 transition-colors">
                  <Youtube className="text-muted-gray group-hover:text-yt-red" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium line-clamp-1 group-hover:text-yt-red transition-colors">{item.data.metadata.title}</h4>
                  <p className="text-[10px] text-muted-gray uppercase tracking-widest mt-1">{new Date(item.timestamp).toLocaleDateString()}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Core Features */}
      <section className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard 
          icon={Network} 
          title={t.features.mindmap.title} 
          description={t.features.mindmap.desc} 
        />
        <FeatureCard 
          icon={Quote} 
          title={t.features.quotes.title} 
          description={t.features.quotes.desc} 
        />
        <FeatureCard 
          icon={Zap} 
          title={t.features.speed.title} 
          description={t.features.speed.desc} 
        />
      </section>

      {/* Discovery / Recommendation Section */}
      <section className="px-6 space-y-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">{t.popular}</h2>
            <p className="text-muted-gray max-w-lg">{t.popularSub}</p>
          </div>
          <button className="text-amber text-xs uppercase tracking-widest font-bold border-b border-amber/30 pb-1 hover:border-amber transition-all">
            {t.trending_all}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RecommendationCard 
            title="The Future of Intelligence" 
            channel="TED" 
            thumbnail="https://picsum.photos/seed/ai-tech/400/225"
            url="https://www.youtube.com/watch?v=kYI2_mS-5z8"
            onSelect={setUrl}
          />
          <RecommendationCard 
            title="Dopamine Detox Guide" 
            channel="Better Than Yesterday" 
            thumbnail="https://picsum.photos/seed/health/400/225"
            url="https://www.youtube.com/watch?v=9QiE-M1LrZ4"
            onSelect={setUrl}
          />
          <RecommendationCard 
            title="How to Speak" 
            channel="MIT OpenCourseWare" 
            thumbnail="https://picsum.photos/seed/lecture/400/225"
            url="https://www.youtube.com/watch?v=Vj8id8-X6Xk"
            onSelect={setUrl}
          />
          <RecommendationCard 
            title="Gemini 2.5 Demo" 
            channel="Google DeepMind" 
            thumbnail="https://picsum.photos/seed/gemini/400/225"
            url="https://www.youtube.com/watch?v=XshRE_bE_xM"
            onSelect={setUrl}
          />
        </div>
      </section>

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection t={t} />
      </div>

      <section className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="text-4xl md:text-5xl font-serif italic text-off-white/40 leading-relaxed">
          {t.learning_dna.split('VideoMind').map((part: string, i: number) => (
            <React.Fragment key={i}>
              {part}
              {i === 0 && <span className="text-off-white">VideoMind</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-gray">{t.new_era}</span>
          <div className="w-12 h-px bg-white/10" />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="glass-card p-10 rounded-[32px] space-y-6 hover:translate-y-[-8px] transition-all group">
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-amber group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-serif italic text-white">{title}</h3>
      <p className="text-muted-gray text-base leading-relaxed font-light">{description}</p>
    </div>
  </div>
);

const RecommendationCard = ({ title, channel, thumbnail, url, onSelect }: { title: string, channel: string, thumbnail: string, url: string, onSelect: (url: string) => void }) => (
  <button 
    onClick={() => onSelect(url)}
    className="flex flex-col text-left group space-y-3"
  >
    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 group-hover:border-yt-red/50 transition-all">
      <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-yt-red flex items-center justify-center shadow-lg shadow-yt-red/20">
          <Zap size={16} className="text-white fill-white" />
        </div>
      </div>
    </div>
    <div className="space-y-1">
      <h4 className="text-white font-serif italic text-sm line-clamp-2 group-hover:text-yt-red transition-colors">{title}</h4>
      <p className="text-[10px] text-muted-gray uppercase tracking-widest">{channel}</p>
    </div>
  </button>
);
