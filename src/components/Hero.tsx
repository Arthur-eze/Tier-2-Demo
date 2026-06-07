import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { HERO_IMAGE_URL } from "../data";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section 
      id="hero-section" 
      className="relative min-h-[calc(100vh-80px)] flex items-center py-16 md:py-24 overflow-hidden text-left"
    >
      {/* Real Full Screen Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      />
      
      {/* Elegant light overlays to blend text beautifully with the bright picture */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent z-10 hidden md:block" />
      <div className="absolute inset-0 bg-white/90 z-10 md:hidden" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20 w-full animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Premium Minimal Text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest block mb-4">
                Welcome to Premium DemoDentist
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                id="hero-headline"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-[1.12]"
              >
                Bespoke Dentistry,{" "}
                <span className="text-brand-green block">
                  Painless Excellence.
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              id="hero-description"
              className="font-sans text-base text-black/80 max-w-lg leading-relaxed font-normal"
            >
              Experience a sanctuary of wellness where advanced clinical skill meets ultra-modern comfort. We provide quiet, stress-free care designed to give you a natural, radiant smile.
            </motion.p>

            {/* Simple Elegant CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <button
                id="hero-book-cta"
                onClick={() => onNavigate("booking")}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-green hover:bg-black text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-200 cursor-pointer text-center"
              >
                <span>Book Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                id="hero-services-cta"
                onClick={() => onNavigate("services")}
                className="flex items-center justify-center px-7 py-3.5 border border-black bg-white text-black hover:bg-brand-green hover:text-white hover:border-brand-green rounded-full font-bold text-xs uppercase tracking-wider transition-all text-center cursor-pointer"
              >
                <span>View Treatments</span>
              </button>
            </motion.div>
          </div>

          {/* Right helper spacer for wide view aesthetics */}
          <div className="hidden lg:block lg:col-span-5" />

        </div>
      </div>
    </section>
  );
}
