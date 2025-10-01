import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#ad7e47] text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-950">Chitrakoot Yatra</h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed">
            Helping you explore the beauty and spirituality of Chitrakoot.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-yellow-950">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li><a href="/" className="hover:text-yellow-200 transition-colors">Home</a></li>
            <li><a href="/tourist-spots" className="hover:text-yellow-200 transition-colors">Tourist Spots</a></li>
            <li><a href="/rickshaw-tour" className="hover:text-yellow-200 transition-colors">Rickshaw Tours</a></li>
            <li><a href="/hotels" className="hover:text-yellow-200 transition-colors">Hotels</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-yellow-950">Contact</h3>
          <ul className="text-sm sm:text-base space-y-3">
            <li className="flex items-center gap-2">
              <MapPin size={18} /> <span>Chitrakoot, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> <span>support@chitrakootyatra.com</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-yellow-950">Follow Us</h3>
          <div className="flex gap-5 mt-2">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/">
              <Facebook className="hover:text-yellow-300 transition-colors" size={22} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="#">
              <Instagram className="hover:text-yellow-300 transition-colors" size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/30 text-center py-4 text-xs sm:text-sm text-white">
        © {new Date().getFullYear()} Chitrakoot Yatra. All rights reserved.
      </div>
    </footer>
  );
}
