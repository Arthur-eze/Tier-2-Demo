import React from "react";
import { Award, Sparkles, MapPin, Phone, Mail } from "lucide-react";

export default function AboutUs() {
  const contactDetails = [
    {
      icon: <MapPin className="h-5 w-5 text-brand-green" />,
      title: "Clinic Location",
      desc: "450 Luxury Plaza, Suite 10C, Beverly Hills, CA 90210",
      actionLabel: "Get Directions",
      actionHref: "https://maps.google.com"
    },
    {
      icon: <Phone className="h-5 w-5 text-brand-green" />,
      title: "Direct Concierge",
      desc: "+1 (555) 794-6330",
      actionLabel: "Call Desk",
      actionHref: "tel:+15557946330"
    },
    {
      icon: <Mail className="h-5 w-5 text-brand-green" />,
      title: "Concierge Email",
      desc: "concierge@premiumdemodentist.com",
      actionLabel: "Send Inquiry",
      actionHref: "mailto:concierge@premiumdemodentist.com"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white border-t border-black/10 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Core Double Column - Philosophy & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Side: About Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest block font-sans">
              Our Clinical Philosophy
            </span>
            <h2 id="about-headline" className="font-display text-3xl sm:text-4xl font-extrabold text-black tracking-tight leading-tight">
              Signature Dental Wellness Crafted Around Your Experience
            </h2>
            
            <div className="space-y-4 font-sans text-sm text-black/70 leading-relaxed font-light">
              <p>
                Founded on the principle that dental treatments should be stress-free, 
                <span className="font-semibold text-black"> Premium DemoDentist</span> is an upscale boutique sanctuary designed for total client comfort.
              </p>
              <p>
                We have eliminated cold traditional needles and loud, high-friction drills, opting instead for advanced cold laser systems, gentle micro-instrumentation, and biocompatible porcelain restorative materials.
              </p>
              <p>
                Our objective is to restore teeth to their natural strength while achieving elegant, symmetric perfection in an atmosphere that feels entirely tranquil.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-brand-green/10 p-2 rounded-full text-brand-green shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-black">Ivy League Practice</span>
                  <span className="block text-[11px] text-black/55">Stanford and Harvard Trained</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-brand-green/10 p-2 rounded-full text-brand-green shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-black">Advanced Cold Lasers</span>
                  <span className="block text-[11px] text-black/55">Maximum comfort, zero vibration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Simple Clean Bio & Hours */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Doctor Headshot Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=260"
                  alt="Dr. Christopher Sterling"
                  referrerPolicy="no-referrer"
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover shadow-sm border border-black/10"
                />
                <div className="text-center sm:text-left space-y-1">
                  <span className="inline-block px-2.5 py-0.5 bg-brand-green/10 border border-brand-green/20 text-brand-green text-[10px] font-bold uppercase tracking-wider rounded-md">
                    Chief Dental Surgeon
                  </span>
                  <h3 className="font-display font-extrabold text-black text-lg">Dr. Christopher Sterling</h3>
                  <p className="text-xs text-black/60 font-medium leading-relaxed">
                    B.S. Stanford University | D.M.D. Harvard School of Dental Medicine
                  </p>
                </div>
              </div>

              {/* Quote Block */}
              <div className="border-l-2 border-brand-green pl-4 py-1 text-left">
                <p className="font-sans text-xs italic text-black/70 leading-relaxed font-light">
                  &ldquo;A healthy smile isn&apos;t just about visual proportions. It is about how you carry yourself with absolute confidence. Our mission is to restore dental physical strength using micro-precise dentistry within a calm environment.&rdquo;
                </p>
              </div>

              {/* Clinic hours details */}
              <div className="space-y-2 pt-4 border-t border-black/10 text-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wide text-black/40 font-mono">
                  Weekly Schedule
                </span>
                <div className="grid grid-cols-2 gap-y-1.5 text-black/70">
                  <div className="font-medium">Monday – Friday:</div>
                  <div className="text-black text-right font-semibold">08:00 AM – 06:00 PM</div>
                  <div className="font-medium">Saturday:</div>
                  <div className="text-black text-right font-semibold">09:00 AM – 02:00 PM</div>
                  <div className="font-medium">Sunday:</div>
                  <div className="text-brand-green text-right font-bold">Emergency On Call</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Coordinates Block (Map cards) */}
        <div id="contact" className="border-t border-black/10 pt-20">
          <div className="max-w-2xl text-left space-y-3 mb-10">
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest block font-sans">
              Connect & Visit
            </span>
            <h3 id="contact-title" className="font-display text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Location details & direct lines to our desk
            </h3>
            <p className="font-sans text-black/60 text-xs sm:text-sm font-light">
              Our Beverly Hills concierge is available to facilitate premium reservations, transfers, and immediate emergency clinical coordination.
            </p>
          </div>

          {/* Location details card list */}
          <div id="contact-details-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {contactDetails.map((det, index) => (
              <div
                key={index}
                className="p-6 bg-white hover:bg-brand-green/5 rounded-2xl transition-all duration-200 border border-black/10 hover:border-brand-green flex flex-col justify-between items-start text-left group"
              >
                <div className="space-y-3">
                  <div className="h-9 w-9 bg-white rounded-lg flex items-center justify-center border border-black/10 text-brand-green">
                    {det.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-black text-sm">{det.title}</h4>
                    <p className="font-sans text-xs text-black/60 font-light mt-1">{det.desc}</p>
                  </div>
                </div>

                <a
                  href={det.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 text-brand-green hover:text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>{det.actionLabel}</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
