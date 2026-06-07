import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden border-t border-black/10">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
        
        {/* Simple Clean Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest block font-sans">
            Client Stories
          </span>
          <h2 id="testimonials-title" className="font-display text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Patient Experiences
          </h2>
          <p className="font-sans text-black/60 font-light text-sm leading-relaxed">
            Read letters from those who have trusted our Stanford and Harvard-trained clinicians with their aesthetic dental wellness.
          </p>
        </div>

        {/* Roomy Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((rev, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="bg-white p-8 rounded-2xl border border-black/10 flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-4 font-sans">
                {/* Clean rating stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-brand-green fill-brand-green" />
                  ))}
                </div>

                {/* Patient quote */}
                <p className="text-black/80 font-light italic text-sm leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Patient Profile Footer */}
              <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-black/10">
                <img
                  src={rev.image}
                  alt={rev.name}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover border border-black/10"
                />
                <div>
                  <h4 className="font-display font-bold text-black text-xs">{rev.name}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-black/40 font-medium mt-0.5">
                    <span>{rev.role}</span>
                    <span className="h-1 w-1 rounded-full bg-black/10" />
                    <span className="text-brand-green font-semibold">{rev.serviceUsed}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
