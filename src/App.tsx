import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, Heart, ShieldCheck, Star } from "lucide-react";
import { Appointment, Service } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BookingStudio from "./components/BookingStudio";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import { WHATSAPP_NUMBER } from "./data";

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Load appointments from localStorage on mount safely
  useEffect(() => {
    const saved = localStorage.getItem("demodentist_appointments");
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing saved appointments", err);
      }
    }
  }, []);

  // Sync state to local storage when changes happen
  const handleAddAppointment = (apt: Appointment) => {
    const updated = [apt, ...appointments];
    setAppointments(updated);
    localStorage.setItem("demodentist_appointments", JSON.stringify(updated));
  };

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.filter((apt) => apt.id !== id);
    setAppointments(updated);
    localStorage.setItem("demodentist_appointments", JSON.stringify(updated));
  };

  // Select treatment from service catalog and relay scroll down to schedule form
  const handleSelectServiceAndBook = (service: Service) => {
    setSelectedService(service);
    handleNavigate("booking");
  };

  const handleClearSelectedService = () => {
    setSelectedService(null);
  };

  // Smooth ease on-page navigation jumping
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset if navbar takes up screen
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Custom formatted WhatsApp link for floating action trigger
  const whatsappFloatUrl = "https://wa.me/8977820625?text=I%20need%20to%20book%20an%20appointment";

  return (
    <div id="dentist-app-root" className="min-h-screen bg-white text-black flex flex-col antialiased selection:bg-brand-green selection:text-white">
      
      {/* Floating Header */}
      <Navbar
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* SECTION: HOME */}
        <div id="home">
          <Hero onNavigate={handleNavigate} />
        </div>

        {/* SECTION: SERVICES */}
        <div id="services-section">
          <Services onSelectService={handleSelectServiceAndBook} />
        </div>

        {/* SECTION: TESTIMONIALS */}
        <div id="testimonials-section">
          <Testimonials />
        </div>

        {/* SECTION: APPOINTMENT SCHEDULER STUDIO */}
        <div id="booking-section">
          <BookingStudio
            onAddAppointment={handleAddAppointment}
            selectedService={selectedService}
            onClearSelectedService={handleClearSelectedService}
          />
        </div>

        {/* SECTION: ABOUT & CONTACT US */}
        <div id="about-section">
          <AboutUs />
        </div>

      </main>

      {/* FOOTER BLOCK */}
      <footer id="app-footer" className="bg-black text-white/70 py-16 border-t border-brand-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start text-left">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-brand-green flex items-center justify-center text-white">
                  ★
                </div>
                <div>
                  <span className="font-display font-bold text-white text-base block tracking-wide">
                    Premium DemoDentist
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-brand-green block">
                    Luxury Dental Sanctuary
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Reimagining modern clinical dentistry with advanced comfortable technology, calming environments, and absolute high-precision care.
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div className="space-y-4">
              <h4 className="font-display text-white text-xs font-bold uppercase tracking-wider">Navigations</h4>
              <ul className="space-y-2 text-xs font-light">
                <li>
                  <button onClick={() => handleNavigate("home")} className="hover:text-brand-green transition cursor-pointer">
                    Home Sanctuary
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate("services")} className="hover:text-brand-green transition cursor-pointer">
                    Clinical Catalog
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate("testimonials")} className="hover:text-brand-green transition cursor-pointer">
                    Patient Testimonials
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate("booking")} className="hover:text-brand-green transition cursor-pointer">
                    Secure Slot Booking
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate("about")} className="hover:text-brand-green transition cursor-pointer">
                    Our Doctors & Location
                  </button>
                </li>
              </ul>
            </div>

            {/* Our Accents */}
            <div className="space-y-4">
              <h4 className="font-display text-white text-xs font-bold uppercase tracking-wider">Dentistry Standards</h4>
              <ul className="space-y-2 text-xs font-light">
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> Bio-Compatible Porcelain
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> No-Suture Cold Lasers
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> Fully Needle-Lite Scaling
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> Spa-Noise Minimizing Suites
                </li>
              </ul>
            </div>

            {/* Regulatory Clinical info */}
            <div className="space-y-4">
              <h4 className="font-display text-white text-xs font-bold uppercase tracking-wider">Clinical Status</h4>
              <p className="text-[11px] leading-relaxed font-light text-white/50">
                Premium DemoDentist is fully committed to dental medicine excellence. All patient consultations and procedure scheduling follow standard CA board sanitation rules and confidentiality profiles.
              </p>
            </div>

          </div>

          <hr className="border-brand-green/10 my-10" />

          {/* Sub block */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-white/40">
            <p>© 2026 Premium DemoDentist. Designed for flawless aesthetic clinical operations.</p>
            <div className="flex gap-6">
              <a href="#about" className="hover:text-brand-green transition">Privacy Statement</a>
              <a href="#about" className="hover:text-brand-green transition">Patient Rights</a>
              <a href="#about" className="hover:text-brand-green transition">Terms of Concierge</a>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP CONTACT */}
      <div id="floating-whatsapp-trigger" className="fixed bottom-6 right-6 z-40">
        <a
          id="floating-whatsapp-anchor"
          href={whatsappFloatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-12 w-12 rounded-full bg-[#004d40] hover:bg-black text-white shadow-md transition-transform active:scale-95 duration-200 border border-white/10"
          title="Direct Consultation Desk"
        >
          <MessageSquare className="h-5 w-5" />
        </a>
      </div>

    </div>
  );
}
