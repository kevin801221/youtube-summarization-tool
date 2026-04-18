import React, { useRef } from 'react';
import { Quote } from '../types';
import { Share2, Copy, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface QuoteCardProps {
  quote: Quote;
  onJump: (ts: string) => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onJump }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.quote}" - ${quote.speaker} (at ${quote.timestamp})`);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: '#0F0F10',
      scale: 2,
    });
    const link = document.createElement('a');
    link.download = `videomind-quote-${quote.timestamp}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="group relative flex flex-col h-full">
      <div 
        ref={cardRef}
        className="flex-1 glass-card rounded-2xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
      >
        <div className="absolute top-4 left-6 text-6xl font-serif text-white/10 select-none">“</div>
        <blockquote className="relative z-10 text-xl md:text-2xl font-serif italic text-white leading-relaxed mb-4">
          {quote.quote}
        </blockquote>
        {quote.translation && (
          <div className="relative z-10 text-sm md:text-base text-muted-gray mb-6 max-w-md">
            {quote.translation.quote}
          </div>
        )}
        <div className="absolute bottom-4 right-6 text-6xl font-serif text-white/10 select-none">”</div>
        
        <div className="flex flex-col items-center gap-1">
          <span className="text-amber font-medium uppercase tracking-wider text-xs">
            {quote.speaker}
          </span>
          <button 
            onClick={() => onJump(quote.timestamp)}
            className="timestamp-pill hover:bg-yt-red/40"
          >
            {quote.timestamp}
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleCopy}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-muted-gray hover:text-white"
          title="Copy to clipboard"
        >
          <Copy size={16} />
        </button>
        <button 
          onClick={handleDownload}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-muted-gray hover:text-white"
          title="Download as image"
        >
          <Download size={16} />
        </button>
      </div>
    </div>
  );
};
