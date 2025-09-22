import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Map, Car, Hotel, User, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://chitrakoot-yatra.onrender.com/api/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");
      setUser(null);
      window.dispatchEvent(new Event("userUpdated"));
      toast.error("BYY BYY, we miss you 😢", { autoClose: 2000 });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
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
          ? "backdrop-blur-md bg-[#414A37] border-b border-white/20 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 transition-all duration-300 flex items-center justify-between ${
          scrolled ? "h-16" : "h-24"
        }`}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center"
        >
          <img
            src="/logoyatra.png"
            alt="TourGuide Logo"
            className={`transition-all duration-500 object-contain ${
              scrolled ? "h-12 scale-100" : "h-20 scale-150 -ml-4"
            }`}
          />
        </motion.div>

        {/* Center Nav Links */}
        <div className="hidden md:flex space-x-10">
          {centerLinks.map((link, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Link
                to={link.to}
                className="group relative flex items-center gap-2 text-[17px] font-semibold text-white transition-all duration-300"
              >
                <span className="group-hover:blur-sm group-hover:opacity-0 transition-all duration-300">
                  {link.icon}
                </span>
                {link.name}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Side */}
        <div className="relative">
          {user ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#414A37] to-[#2E3528] 
               text-white font-bold text-lg flex items-center justify-center 
               shadow-md hover:scale-105 transition-transform duration-200"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </button>

              {/* Dropdown */}
              {profileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl 
                 border border-gray-200 overflow-hidden z-50"
                >
                  <div
                    className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 border-b 
                      flex items-start justify-between"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        {user.name}
                      </h2>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={() => setProfileDropdown(false)}
                      className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                    >
                      ✖
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="p-4 flex flex-col space-y-3">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 
                     text-white font-semibold rounded-lg shadow-md 
                     hover:from-red-600 hover:to-red-700 
                     transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      🚪 Logout
                    </button>
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium 
                     rounded-lg shadow-sm hover:bg-gray-200 
                     transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      👤 View Profile
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              to="/account"
              className="hidden md:flex group relative items-center gap-2 text-[17px] font-semibold text-white transition-all duration-300 hover:text-rose-600"
            >
              <User size={22} />
              Account
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-500 group-hover:w-full transition-all duration-300"></span>
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
            className="md:hidden mx-4 my-2 px-4 py-5 space-y-4 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md bg-white/10"
          >
            {centerLinks.map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-[17px] font-medium text-gray-900 hover:text-purple-600 transition-all border-b border-white/20 pb-2"
                >
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
