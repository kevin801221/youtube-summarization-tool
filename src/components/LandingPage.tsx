import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Youtube,
  Quote,
  Network,
  Languages
} from 'lucide-react';
import { PricingSection } from './PricingSection';

interface LandingPageProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: () => void;
  languagePref: string;
  setLanguagePref: (lang: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  url, 
  setUrl, 
  onAnalyze, 
  languagePref, 
  setLanguagePref 
}) => {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 flex flex-col items-center text-center space-y-12 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yt-red/10 blur-[120px] rounded-full -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <Sparkles size={12} /> Powered by Gemini 2.0 Flash
          </div>
          <h1 className="text-6xl md:text-8xl font-serif italic font-bold tracking-tight text-white leading-[0.9]">
            Knowledge extracted <br /> 
            <span className="text-transparent bg-clip-text bg-accent-grad">at the speed of light.</span>
          </h1>
          <p className="text-muted-gray text-xl md:text-2xl max-w-2xl mx-auto font-light">
            VideoMind transforms any YouTube video into deeply organized insights, mind maps, and viral shorts in seconds.
          </p>
        </motion.div>

        {/* URL Input Area */}
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
              placeholder="Paste your video URL (TED talk, Tutorial, or Short)..." 
              className="w-full bg-surface border border-border-subtle hover:border-white/20 focus:border-yt-red/50 focus:ring-0 rounded-full py-6 pl-16 pr-36 text-lg transition-all outline-none backdrop-blur-xl"
              onKeyDown={(e) => e.key === 'Enter' && onAnalyze()}
            />
            <button 
              onClick={onAnalyze} 
              className="absolute right-2 inset-y-2 px-8 rounded-full bg-accent-grad text-white font-bold text-sm shadow-xl shadow-yt-red/20 hover:shadow-yt-red/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 group/btn"
            >
              Analyze <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[11px] text-muted-gray uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2">
              <Languages size={14} className="text-amber" />
              <span>Language:</span>
              <select 
                value={languagePref} 
                onChange={(e) => setLanguagePref(e.target.value)}
                className="bg-transparent border-none p-0 focus:ring-0 cursor-pointer hover:text-white transition-colors"
              >
                <option value="auto">Auto-Detect</option>
                <option value="English">English</option>
                <option value="繁體中文">繁體中文</option>
                <option value="日本語">日本語</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-green-500" /> No Registration Required
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Showcase */}
      <section className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard 
          icon={Network} 
          title="Conceptual Mind Mapping" 
          description="Visualize the core architecture of ideas with interactive force-directed graphs built instantly from video content." 
        />
        <FeatureCard 
          icon={Quote} 
          title="Editorial Quote Cards" 
          description="Capture golden nuggets as beautiful, shareable cards for Instagram or Threads with automatic source attribution." 
        />
        <FeatureCard 
          icon={Zap} 
          title="Sub-second Intelligence" 
          description="Native YouTube understanding means no more waiting for transcripts. Gemini watches the video just like you do." 
        />
      </section>

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* Trust Quote */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="text-4xl md:text-5xl font-serif italic text-off-white/40 leading-relaxed">
          "The fastest way to learn is to skip the fluff. <span className="text-off-white">VideoMind</span> helps you go straight to the DNA of any video."
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-gray">A New Era of Learning</span>
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
