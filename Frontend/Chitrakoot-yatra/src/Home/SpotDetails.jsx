import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Spot from "../Data/Spot";
import Typewriter from "typewriter-effect";

gsap.registerPlugin(ScrollTrigger);

const SpotDetails = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const spot = Spot.find((s) => s.name === decodedName);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = spot?.images?.length ? spot.images : [spot?.image];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || images.length <= 1) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        const isAtEnd =
          scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
          scrollContainer.scrollWidth - 10;

        if (isAtEnd) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      }
    );
  }, []);

  if (!spot) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-800 to-green-900 text-white">
        <p className="text-2xl font-bold animate-pulse">🚫 Spot Not Found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#447921] to-[#133d28] text-white relative px-4 py-24 sm:px-10">
      {/* Floating blurred blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-lime-400 rounded-full filter blur-3xl opacity-30 animate-pulse z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-lime-400 rounded-full filter blur-3xl opacity-20 animate-pulse z-0"></div>

      <motion.h1
        className="relative z-10 text-4xl sm:text-5xl font-extrabold text-center text-green-950 mb-14"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typewriter
          options={{
            strings: [
              `${spot.name}`,
              "Explore the Hidden Beauty",
              "Discover More Below",
            ],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 30,
          }}
        />
      </motion.h1>

      {/* Scrollable Image Gallery */}
      <div
        ref={scrollRef}
        className="relative z-10 flex gap-6 overflow-x-auto no-scrollbar mb-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {images.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`Image ${idx + 1}`}
            className="min-w-[85%] sm:min-w-[70%] md:min-w-[60%] lg:min-w-[50%] h-[60vh] object-cover rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          />
        ))}
      </div>

      {/* Description Card */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto glassmorphism p-6 sm:p-10 mb-12 text-lg text-white rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-lg leading-relaxed mb-6 text-white font-semibold text-center">
          <Typewriter
            options={{
              strings: [
                `${spot.description}`,
                `${spot.fullDescription}`,
                `Best Time to Visit: ${spot.besttime}`,
                ` Highlights: ${spot.Highlights}`,
                ` Tips: ${spot.Tips}`,
                
              ],
              loop: true,
              autoStart: true,
              delay: 25,
              deleteSpeed: 0,
              pauseFor: 4000,
            }}
          />
        </div>
      </motion.div>

      {/* Map Button */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <a
          href={spot.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full shadow-lg transition-all duration-300"
        >
          🌍 View on Map
        </a>
      </motion.div>
    </div>
  );
};

export default SpotDetails;
