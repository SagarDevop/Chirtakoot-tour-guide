import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Map, Car, Hotel, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Navbar() {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    setUser(JSON.parse(storedUser));
  } else {
    setUser(null);
  }
}, [location]);

  // Load user from localStorage on mount
  useEffect(() => {
  const handleUserUpdate = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  window.addEventListener("userUpdated", handleUserUpdate);
  return () => window.removeEventListener("userUpdated", handleUserUpdate);
}, []);



  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // Redirect to homepage after logout
  };

  const centerLinks = [
    { name: "Home", icon: <Home size={20} />, to: "/" },
    { name: "Tourist Spot", icon: <Map size={20} />, to: "/tourist-spots" },
    { name: "Rickshaw Tour", icon: <Car size={20} />, to: "/rickshaw-tour" },
    { name: "Hotel", icon: <Hotel size={20} />, to: "/hotels" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-gradient-to-r from-sky-100 via-orange-50 to-pink-100 border-b border-white/30 shadow-lg"
          : "bg-gradient-to-r from-sky-200 via-orange-100 to-pink-200"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 transition-all duration-300 flex items-center justify-between ${scrolled ? "h-16" : "h-24"}`}>
        {/* Logo */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="flex items-center">
          <img src="/logockt.png" alt="TourGuide Logo" className={`transition-all duration-500 object-contain ${scrolled ? "h-12 scale-100" : "h-20 scale-150 -ml-4"}`} />
        </motion.div>

        {/* Center Nav Links */}
        <div className="hidden md:flex space-x-10">
          {centerLinks.map((link, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Link to={link.to} className="group relative flex items-center gap-2 text-[17px] font-semibold text-sky-900 transition-all duration-300">
                <span className="group-hover:blur-sm group-hover:opacity-0 transition-all duration-300">{link.icon}</span>
                {link.name}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-teal-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Side */}
        <div className="relative">
          {user ? (
            // Show user letter with dropdown
            <div>
              <button
                className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg flex items-center justify-center"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </button>

              {profileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-4 space-y-2"
                >
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <button onClick={handleLogout} className="w-full text-left text-red-500 hover:underline">
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            // Default Account icon
            <Link to="/account" className="hidden md:flex group relative items-center gap-2 text-[17px] font-semibold text-sky-900 transition-all duration-300 hover:text-rose-600">
              <User size={22} />
              Account
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          <motion.div whileTap={{ rotate: 90 }}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 my-2 px-4 py-5 space-y-4 bg-white/80 rounded-2xl border border-white/30 shadow-xl backdrop-blur-lg"
          >
            {[...centerLinks].map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={item.to} onClick={() => setOpen(false)} className="flex items-center gap-2 text-[17px] font-medium text-gray-900 hover:text-purple-600 transition-all border-b pb-2">
                  {item.icon}
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
