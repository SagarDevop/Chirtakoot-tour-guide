import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Map, Car, Hotel, User, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api.js";

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
      await api.post("/api/logout", {});
      localStorage.removeItem("user");
      setUser(null);
      window.dispatchEvent(new Event("userUpdated"));
      toast.error("BYE BYE, we’ll miss you 😢", { autoClose: 2000 });
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
        className={`max-w-7xl mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
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
              scrolled ? "h-12" : "h-20 -ml-4"
            }`}
          />
        </motion.div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex space-x-10">
          {centerLinks.map((link, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Link
                to={link.to}
                className="group relative flex items-center gap-2 text-[17px] font-semibold text-white transition-all"
              >
                <span className="group-hover:opacity-0 transition-all">
                  {link.icon}
                </span>
                {link.name}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:block">
          {user ? (
            <div className="relative">
              <button
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#414A37] to-[#2E3528] 
                text-white font-bold text-lg flex items-center justify-center 
                shadow-md hover:scale-105 transition"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </button>

              <AnimatePresence>
                {profileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 border-b flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-gray-800">
                          {user.name}
                        </h2>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <button
                        onClick={() => setProfileDropdown(false)}
                        className="text-gray-500 hover:text-gray-800"
                      >
                        ✖
                      </button>
                    </div>

                    <div className="p-4 flex flex-col space-y-3">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 
                        text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition"
                      >
                        🚪 Logout
                      </button>
                      <button
                        onClick={() => navigate("/profile")}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg shadow-sm hover:bg-gray-200 transition"
                      >
                        👤 View Profile
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/account"
              className="flex items-center gap-2 text-[17px] font-semibold text-white transition hover:text-rose-600"
            >
              <User size={22} />
              Account
            </Link>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 my-2 px-4 py-5 space-y-4 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md bg-[#414A37]/90 text-white"
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
                  className="flex items-center gap-2 text-[17px] font-medium pb-2 border-b border-white/20"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="pt-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    🚪 Logout
                  </button>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200"
                  >
                    👤 View Profile
                  </button>
                </div>
              ) : (
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-[17px] font-semibold"
                >
                  <User size={20} />
                  Account
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
