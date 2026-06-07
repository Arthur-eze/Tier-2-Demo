import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, User, Mail, Phone, CalendarCheck } from "lucide-react";
import { SERVICES, TIME_SLOTS } from "../data";
import { Service, Appointment } from "../types";

interface BookingStudioProps {
  onAddAppointment: (apt: Appointment) => void;
  selectedService: Service | null;
  onClearSelectedService: () => void;
}

export default function BookingStudio({
  onAddAppointment,
  selectedService,
  onClearSelectedService
}: BookingStudioProps) {
  // Successful state
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [successApt, setSuccessApt] = useState<Appointment | null>(null);

  // Form states in a single clean dataset
  const [formServiceId, setFormServiceId] = useState("");
  const [formDate, setFormDate] = useState("2026-06-08"); // tomorrow
  const [formTime, setFormTime] = useState(TIME_SLOTS[0]);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formNotes, setFormNotes] = useState("");

  // Sync when service selection occurs from catalog
  useEffect(() => {
    if (selectedService) {
      setFormServiceId(selectedService.id);
    }
  }, [selectedService]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formServiceId || !formName || !formPhone) {
      alert("Please fill out your Name, Phone Number, and select a Clinical Specialty.");
      return;
    }

    const matchedService = SERVICES.find((s) => s.id === formServiceId);
    if (!matchedService) return;

    const apt: Appointment = {
      id: "apt-classic-" + Date.now(),
      patientName: formName,
      email: formEmail,
      phone: formPhone,
      serviceId: matchedService.id,
      serviceName: matchedService.name,
      date: formDate,
      timeSlot: formTime,
      bookingMethod: "form",
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      notes: formNotes
    };

    onAddAppointment(apt);
    setSuccessApt(apt);
    setShowSuccessCard(true);

    // Submit to Formspree
    fetch("https://formspree.io/f/xzdqejva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        patientName: formName,
        emailAddress: formEmail,
        phoneNumber: formPhone,
        serviceSelected: matchedService.name,
        appointmentDate: formDate,
        appointmentTime: formTime,
        message: formNotes || "No additional notes provided"
      })
    })
      .then((res) => {
        if (res.ok) {
          console.log("Formspree submission succeeded");
        } else {
          console.warn("Formspree responded with error status");
        }
      })
      .catch((err) => {
        console.error("Formspree submission network error:", err);
      });

    // Reset Form Input State
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormNotes("");
    onClearSelectedService();
  };

  return (
    <section id="booking" className="py-20 bg-white relative border-t border-black/10 text-black">
      {/* Absolute subtle background glowing nodes */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-brand-green/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-brand-green/3 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10 text-left">
        
        {/* Simple Section Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest block font-sans">
            Personal Concierge Scheduling
          </span>
          <h2 id="booking-title" className="font-display text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Schedule Your Visit
          </h2>
          <p className="font-sans text-black/60 font-light text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Please fill out our premium digital registry or connect directly with our Beverly Hills concierge.
          </p>

          {/* Service Selected Pop-up shortcut helper */}
          {selectedService && (
            <div id="service-shortcut-alert" className="inline-flex items-center gap-3 bg-white border border-brand-green/20 p-2 px-4 rounded-full text-xs text-brand-green mt-3 shadow-sm animate-fade-in">
              <span>Selected Specialty: <strong className="text-black">{selectedService.name}</strong></span>
              <button
                id="clear-service-shortcut"
                onClick={onClearSelectedService}
                className="font-bold underline text-black/70 hover:text-brand-green cursor-pointer"
              >
                Change
              </button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {showSuccessCard && successApt ? (
            /* CONVENIENT SUCCESS CARD IN THE LIGHT THEME */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              id="booking-success-container"
              className="bg-white rounded-2xl border border-black/10 p-8 text-center shadow-xl max-w-lg mx-auto"
            >
              <div className="h-14 w-14 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-green/20">
                <CalendarCheck className="h-7 w-7" />
              </div>

              <h3 className="font-display text-xl font-bold text-black tracking-tight">
                Appointment Registered
              </h3>
              <p className="text-xs text-black/50 mt-1 font-light">
                We have registered your session. A priority time block is reserved for your treatment.
              </p>

              {/* Classic card receipt block */}
              <div className="bg-white p-5 rounded-xl border border-black/10 text-left my-6 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/50 font-sans">Patient:</span>
                  <span className="font-bold text-brand-green">{successApt.patientName}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/50 font-sans">Clinical Focus:</span>
                  <span className="font-bold text-black">{successApt.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/50 font-sans">Date:</span>
                  <span className="font-bold text-black/80">{successApt.date}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-black/50 font-sans">Arrival Hour:</span>
                  <span className="font-bold text-black/80">{successApt.timeSlot}</span>
                </div>
              </div>

              <button
                id="success-add-another"
                onClick={() => {
                  setShowSuccessCard(false);
                  setSuccessApt(null);
                }}
                className="px-6 py-3 rounded-full bg-brand-green hover:bg-black text-white text-xs font-semibold tracking-wider transition cursor-pointer"
              >
                Thank You for booking
              </button>
            </motion.div>
          ) : (
            /* EXACT MATCH OF THE IMAGED DUAL PANEL LAYOUT IN LIGHT THEME */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-4xl mx-auto">
              
              {/* LEFT CARD: Quick Connect */}
              <div className="bg-white border border-black/10 rounded-lg p-8 py-14 flex flex-col justify-between items-center text-center shadow-sm">
                
                {/* Glowing green messenger icon top */}
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4 animate-pulse-slow">
                  <div className="absolute inset-0 rounded-full bg-brand-green/5 blur-md pointer-events-none" />
                  <div className="h-3 w-3 bg-brand-green rounded-full absolute top-2 right-2 border-2 border-white" />
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-9 w-9 text-brand-green stroke-[1.75]"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>

                <div className="space-y-3 max-w-xs mt-2">
                  <h3 className="font-serif text-[26px] font-normal text-black tracking-wide">
                    Quick Connect
                  </h3>
                  <p className="font-sans text-xs text-black/60 font-light leading-relaxed">
                    Message us directly on WhatsApp for instant availability and quick questions.
                  </p>
                </div>

                {/* Brand-themed CTA matching the 3-color rule */}
                <a
                  id="whatsapp-chat-button"
                  href="https://wa.me/918977820625?text=I%20need%20to%20book%20an%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-8 bg-brand-green hover:bg-black text-white font-bold text-xs uppercase tracking-widest py-4 text-center select-none font-sans transition-all duration-200"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {/* RIGHT CARD: Appointment Form */}
              <div className="bg-white border border-black/10 rounded-lg p-8 flex flex-col justify-between shadow-sm">
                <form id="booking-form-workbench" onSubmit={handleFormSubmit} className="space-y-5 flex flex-col justify-between h-full">
                  
                  <div className="space-y-4">
                    {/* Full Name field */}
                    <div className="space-y-1.5 text-left">
                      <label className="block text-[10px] font-bold text-black/60 uppercase tracking-widest font-sans">
                        Full Name
                      </label>
                      <input
                        id="form-input-name"
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-white text-black text-xs border border-black/10 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition-all placeholder-black/30 rounded-none"
                      />
                    </div>

                    {/* Service selection dropdown */}
                    <div className="space-y-1.5 text-left">
                      <label className="block text-[10px] font-bold text-black/60 uppercase tracking-widest font-sans">
                        Service
                      </label>
                      <select
                        id="form-select-service"
                        required
                        value={formServiceId}
                        onChange={(e) => setFormServiceId(e.target.value)}
                        className="w-full px-4 py-3 bg-white text-black text-xs border border-black/10 focus:border-brand-green outline-none transition-all rounded-none"
                      >
                        <option value="" className="text-black/35">- Pick a Treatment -</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-white text-black py-2">
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Left/Right Grid for Date & Time (exactly side-by-side) */}
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Date Block */}
                      <div className="space-y-1.5 text-left">
                        <label className="block text-[10px] font-bold text-black/60 uppercase tracking-widest font-sans">
                          Date
                        </label>
                        <input
                          id="form-input-date"
                          type="date"
                          required
                          min="2026-06-08"
                          max="2026-07-08"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full px-4 py-3 bg-white text-black text-xs border border-black/10 focus:border-brand-green outline-none transition-all rounded-none"
                        />
                      </div>

                      {/* Time Block */}
                      <div className="space-y-1.5 text-left">
                        <label className="block text-[10px] font-bold text-black/60 uppercase tracking-widest font-sans">
                          Time
                        </label>
                        <select
                          id="form-select-time"
                          value={formTime}
                          onChange={(e) => setFormTime(e.target.value)}
                          className="w-full px-4 py-3 bg-white text-black text-xs border border-black/10 focus:border-brand-green outline-none transition-all rounded-none"
                        >
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot} className="bg-white text-black">
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5 text-left">
                      <label className="block text-[10px] font-bold text-black/60 uppercase tracking-widest font-sans">
                        Email Address
                      </label>
                      <input
                        id="form-input-email"
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-4 py-3 bg-white text-black text-xs border border-black/10 focus:border-brand-green outline-none transition-all placeholder-black/30 rounded-none mb-1"
                      />
                    </div>

                    {/* Phone Number Field */}
                    <div className="space-y-1.5 text-left">
                      <label className="block text-[10px] font-bold text-black/60 uppercase tracking-widest font-sans">
                        Phone Number
                      </label>
                      <input
                        id="form-input-phone"
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="Your phone number"
                        className="w-full px-4 py-3 bg-white text-black text-xs border border-black/10 focus:border-brand-green outline-none transition-all placeholder-black/30 rounded-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button in classic luxury green */}
                  <button
                    id="form-submit-booking"
                    type="submit"
                    className="w-full bg-brand-green hover:bg-black text-white font-semibold text-xs uppercase tracking-widest py-4 select-none cursor-pointer font-sans transition-all duration-200 mt-6 rounded-none text-center"
                  >
                    Request Appointment
                  </button>

                </form>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
