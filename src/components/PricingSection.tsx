import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface PricingTier {
  name: string;
  price: string;
  limit: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$3",
    limit: "5 Analysis",
    features: [
      "Gemini 2.0 Flash Engine",
      "Interactive Mind Map",
      "Bilingual Support",
      "Export to Markdown"
    ],
    cta: "Start Analyzing"
  },
  {
    name: "Pro",
    price: "$5",
    limit: "8 Analysis",
    popular: true,
    features: [
      "Everything in Starter",
      "High-Priority Processing",
      "Dual-Mode Translation",
      "Unlimited History",
      "Advanced Quote Cards"
    ],
    cta: "Go Pro"
  },
  {
    name: "Elite",
    price: "$8",
    limit: "12 Analysis",
    features: [
      "Everything in Pro",
      "Batch Processing",
      "Custom Export Formats",
      "Early Access to Features",
      "Commercial Usage"
    ],
    cta: "Get Elite"
  }
];

export const PricingSection: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tight">Simple, transparent pricing</h2>
          <p className="text-muted-gray text-lg max-w-xl mx-auto">Choose the plan that fits your learning velocity. No subscriptions, just value.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "glass-card rounded-3xl p-8 flex flex-col space-y-8 relative group transition-all",
                tier.popular ? "border-yt-red/50 shadow-2xl shadow-yt-red/10" : "hover:border-white/20"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yt-red text-white text-[10px] uppercase font-bold px-4 py-1.5 rounded-full tracking-widest shadow-lg shadow-yt-red/20 z-10">
                  Most Popular
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-muted-gray uppercase text-[10px] font-bold tracking-[0.2em]">{tier.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif text-white">{tier.price}</span>
                  <span className="text-muted-gray text-sm">/ {tier.limit}</span>
                </div>
              </div>

              <ul className="space-y-4 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-off-white/80">
                    <Check size={16} className="text-yt-red shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group/btn",
                tier.popular 
                  ? "bg-accent-grad text-white shadow-xl shadow-yt-red/20 hover:scale-[1.02] active:scale-[0.98]" 
                  : "bg-white/5 text-white hover:bg-white/10"
              )}>
                {tier.cta}
                {tier.popular && <Zap size={16} className="fill-white" />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
