import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, Clock, Menu, X, Trash2, CalendarCheck } from "lucide-react";
import { Appointment } from "../types";

interface NavbarProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ appointments, onCancelAppointment, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);

  const navItems = [
    { label: "Home", href: "home" },
    { label: "Services", href: "services" },
    { label: "Testimonials", href: "testimonials" },
    { label: "Book Appointment", href: "booking" },
    { label: "About Us", href: "about" },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header id="app-header" className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-brand-green/10 transition-all duration-300">
        <div id="navbar-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            id="brand-logo" 
            className="flex items-center gap-2 cursor-pointer group animate-fade-in"
            onClick={() => handleLinkClick("home")}
          >
            <div id="logo-icon-container" className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center text-white shadow-md shadow-brand-green/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span id="brand-main-text" className="font-display text-xl font-bold text-black tracking-tight block">
                Premium
              </span>
              <span id="brand-sub-text" className="font-sans text-xs font-semibold text-brand-green tracking-wider uppercase block -mt-1">
                DemoDentist
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-navigation" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                id={`nav-link-${item.href}`}
                onClick={() => handleLinkClick(item.href)}
                className="font-sans text-sm font-semibold text-black/70 hover:text-brand-green transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div id="navbar-actions" className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="navbar-book-cta"
              onClick={() => handleLinkClick("booking")}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-brand-green hover:bg-black transition-colors shadow-lg shadow-brand-green/10 cursor-pointer"
            >
              Book Now
            </motion.button>
          </div>

          {/* Mobile Menu Trigger */}
          <div id="mobile-menu-actions" className="flex md:hidden items-center gap-3">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              id="mobile-nav-panel"
              className="md:hidden border-t border-brand-green/10 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    id={`mobile-nav-link-${item.href}`}
                    onClick={() => handleLinkClick(item.href)}
                    className="block w-full text-left px-4 py-2.5 rounded-xl text-black hover:bg-brand-green/5 hover:text-brand-green text-sm font-medium transition-all"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-brand-green/15 flex flex-col gap-2">
                  <button
                    id="mobile-book-cta"
                    onClick={() => handleLinkClick("booking")}
                    className="w-full py-2.5 text-center text-sm font-semibold text-white bg-brand-green hover:bg-black rounded-full"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Appointment Tracker Modal */}
      <AnimatePresence>
        {showAppointmentsModal && (
          <div id="appointments-tracker-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAppointmentsModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              id="appointments-tracker-modal"
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-brand-green/10 overflow-hidden z-10"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-white border-b border-brand-green/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-brand-green" />
                  <h3 id="modal-title" className="font-display font-bold text-black text-lg">
                    My Active Bookings
                  </h3>
                </div>
                <button
                  id="close-tracker-modal"
                  onClick={() => setShowAppointmentsModal(false)}
                  className="p-1 rounded-lg text-black/40 hover:text-black hover:bg-black/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 max-h-[350px] overflow-y-auto font-sans">
                {appointments.length === 0 ? (
                  <div id="no-bookings-placeholder" className="text-center py-8 text-black/50">
                    <Calendar className="h-12 w-12 text-black/20 mx-auto mb-3 stroke-[1.5]" />
                    <p className="text-sm font-medium">No appointments booked yet.</p>
                    <p className="text-xs text-black/40 mt-1">Book your spot below to secure your clinical visit.</p>
                  </div>
                ) : (
                  <div id="bookings-list" className="space-y-4">
                    {appointments.map((apt) => (
                      <div
                        key={apt.id}
                        id={`booked-card-${apt.id}`}
                        className="p-4 rounded-2xl border border-brand-green/10 hover:border-brand-green/30 bg-white hover:shadow-sm transition-all flex justify-between items-start"
                      >
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-green/10 text-brand-green uppercase tracking-wider mb-1 border border-brand-green/20">
                            {apt.serviceName}
                          </span>
                          <h4 className="font-sans font-semibold text-black text-sm text-left">{apt.patientName}</h4>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/60 font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-brand-green" />
                              {apt.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-brand-green" />
                              {apt.timeSlot}
                            </span>
                          </div>
                          {apt.phone && (
                            <p className="text-xs text-black/50 font-medium mt-1 text-left">
                              Phone: <span className="text-black">{apt.phone}</span>
                            </p>
                          )}
                        </div>

                        <button
                          id={`cancel-apt-btn-${apt.id}`}
                          onClick={() => {
                            if (confirm(`Are you sure you want to cancel your ${apt.serviceName} appointment?`)) {
                              onCancelAppointment(apt.id);
                            }
                          }}
                          className="p-2 text-black/60 hover:text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors cursor-pointer"
                          title="Cancel Booking"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-white border-t border-brand-green/10 flex items-center justify-between text-xs text-black/50 font-medium">
                <span>Total Booked: {appointments.length}</span>
                <span className="text-brand-green flex items-center gap-1">
                  ● Real-time sync enabled
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
