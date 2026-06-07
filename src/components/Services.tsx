import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Sun, Gem, Activity, Smile, ShieldCheck, Clock, Tag } from "lucide-react";
import { SERVICES } from "../data";
import { Service } from "../types";

interface ServicesProps {
  onSelectService: (service: Service) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "General", "Cosmetic", "Surgical", "Pediatric"];

  const filteredServices = SERVICES.filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );

  // Helper to render responsive lucide-react icons based on string
  const renderIcon = (iconName: string) => {
    const iconClass = "h-6 w-6 text-brand-green group-hover:text-white transition-colors duration-300";
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className={iconClass} />;
      case "Sun":
        return <Sun className={iconClass} />;
      case "Gem":
        return <Gem className={iconClass} />;
      case "Activity":
        return <Activity className={iconClass} />;
      case "Smile":
        return <Smile className={iconClass} />;
      default:
        return <ShieldCheck className={iconClass} />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative vector grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest block font-sans">
            Bespoke Dental Services
          </span>
          <h2 id="services-title" className="font-display text-4xl font-extrabold text-black tracking-tight">
            Specialized Care Designed for Absolute Comfort
          </h2>
          <p className="font-sans text-black/60 font-light text-sm sm:text-base leading-relaxed">
            Discover a custom selection of restorative, cosmetic, and surgical specialties crafted around your personal anatomy using micro-invasive dental tools.
          </p>

          {/* Category Tabs */}
          <div id="category-tabs" className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-tab-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-brand-green text-white shadow-sm"
                    : "bg-white border border-black/20 text-black hover:border-brand-green hover:bg-brand-green/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredServices.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              key={service.id}
              id={`service-card-${service.id}`}
              className="group bg-white rounded-[2rem] border border-black/10 hover:border-brand-green p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4 font-sans">
                
                {/* Icon & Category Tag */}
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green transition-all duration-300">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-black/40 font-mono">
                    {service.category}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-black group-hover:text-brand-green transition-colors">
                    {service.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-black/70 font-light leading-relaxed min-h-[64px]">
                    {service.description}
                  </p>
                </div>

              </div>

              {/* Pricing, Duration & CTA action */}
              <div className="mt-6 pt-5 border-t border-black/10 flex items-center justify-between">
                
                <div className="flex items-center gap-1.5 text-xs text-black/50 font-semibold font-sans">
                  <Clock className="h-3 w-3" />
                  <span>{service.duration}</span>
                </div>

                <button
                  id={`book-service-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className="px-5 py-2.5 rounded-full bg-brand-green text-[11px] font-bold text-white uppercase tracking-wider hover:bg-black shadow-lg shadow-brand-green/10 active:scale-97 cursor-pointer transition-all duration-200"
                >
                  Book Treatment
                </button>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
