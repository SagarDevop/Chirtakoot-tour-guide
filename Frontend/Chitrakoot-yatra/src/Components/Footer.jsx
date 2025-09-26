import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#ad7e47] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-950">Chitrakoot Yatra</h2>
          <p className="mt-2 text-sm">
            Helping you to Exploring Chitrakoot and it's Beauty.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2  text-yellow-950">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-yellow-200">Home</a></li>
            <li><a href="/tourist-spots" className="hover:text-yellow-200">Tourist Spot</a></li>
            <li><a href="/rickshaw-tour" className="hover:text-yellow-200">ReckshawTour</a></li>
            <li><a href="/hotels" className="hover:text-yellow-200">Hotels</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-2  text-yellow-950">Contact</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><MapPin size={16} /> Chitrakoot, India</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={16} /> support@freshgrocer.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-2  text-yellow-950">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a  target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><Facebook className="hover:text-yellow-300" /></a>
            <a target="_blank" rel="noopener noreferrer" href="#"><Instagram className="hover:text-yellow-300" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 text-center py-4 text-sm text-white">
        © {new Date().getFullYear()} Chitrakoot Yatra. All rights reserved.
      </div>
    </footer>
  );
}

