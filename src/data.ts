import { Service, Testimonial } from "./types";
// @ts-ignore
import dentistHero from "./assets/images/dentist_hero_1780835368143.png";

export const SERVICES: Service[] = [
  {
    id: "hygiene",
    name: "Regular Hygiene & Cleanings",
    description: "Gentle scaling, polishing, and comprehensive check-ups to keep your gums strong and prevent root decay. Performed by elite hygienists.",
    duration: "45 mins",
    price: "₹9,999",
    category: "General",
    iconName: "Sparkles"
  },
  {
    id: "whitening",
    name: "Cosmetic Laser Whitening",
    description: "Get up to 8 shades lighter in a single comfortable 1-hour appointment using state-of-the-art cold blue laser technology.",
    duration: "60 mins",
    price: "₹24,999",
    category: "Cosmetic",
    iconName: "Sun"
  },
  {
    id: "veneers",
    name: "Porcelain Veneers & Laminates",
    description: "Custom-crafted ultra-thin shells designed to match your face structure perfectly, fixing chips, gaps, and severe discoloration permanent.",
    duration: "90 mins",
    price: "₹99,999 / tooth",
    category: "Cosmetic",
    iconName: "Gem"
  },
  {
    id: "implants",
    name: "Precision Titanium Implants",
    description: "Full restorative implants acting as real roots. Built to mimic natural teeth anatomy and restore full bite force and look.",
    duration: "120 mins",
    price: "₹1,24,999+",
    category: "Surgical",
    iconName: "ShieldCheck"
  },
  {
    id: "invisalign",
    name: "Invisalign® Clear Aligners",
    description: "Virtually invisible, removable active aligners customized to straighten your smile step-by-step without traditional metallic braces.",
    duration: "30 mins checkup",
    price: "₹2,89,999+",
    category: "Cosmetic",
    iconName: "Activity"
  },
  {
    id: "pediatric",
    name: "Pediatric Gentle Dentistry",
    description: "Calm, welcoming, and kid-appropriate environment focusing on early development, fluoride seals, and making dentists fun.",
    duration: "30 mins",
    price: "₹7,999",
    category: "Pediatric",
    iconName: "Smile"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Alexandra Sterling",
    role: "Visual Designer",
    rating: 5,
    text: "Absolutly incredible experience. The laser whitening was entirely painless, and the clinic feels more like a upscale spa than a dentist. Premium DemoDentist is in a league of its own!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    serviceUsed: "Cosmetic Laser Whitening"
  },
  {
    id: "t2",
    name: "Dr. Marcus Vance",
    role: "University Professor",
    rating: 5,
    text: "Finding a dentist who understands patients with dental anxiety is rare. They took their time explaining my implant options. The final crown fits like a glove and feels entirely natural.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    serviceUsed: "Precision Titanium Implants"
  },
  {
    id: "t3",
    name: "Sophia Rodriguez",
    role: "PR Director",
    rating: 5,
    text: "I finished my Invisalign treatment here and my smile has never felt more radiant. The staff is warm, professional, and remembers my name every single visit. Highly recommended!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    serviceUsed: "Invisalign® Clear Aligners"
  }
];

export const TIME_SLOTS: string[] = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM"
];

// Reference the generated image specifically mapped from the filesystem
export const HERO_IMAGE_URL = dentistHero;
export const WHATSAPP_NUMBER = "+91 89778 20625"; // Premium doctor WhatsApp
