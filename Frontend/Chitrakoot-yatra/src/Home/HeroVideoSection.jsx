import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tester from "../Components/Tester";
import  { Link } from "react-router-dom";

const videoSources = [
  "Vedio/stock-footage-chitrakoot-india-jul-priests-perform-aarti-at-ram-ghat-at-night-up.mp4",
  "Vedio/stock-footage-chitrakoot-india-jul-surroundings-of-ancient-maratha-architecture.mp4",
  "Vedio/stock-footage-chitrakoot-uttar-pradesh-india-jul-boats-gliding-at-night-in-river.mp4",
  "Vedio/stock-footage-chitrakoot-uttar-pradesh-india-jul-tourist-in-boat-and-ganga-arti.mp4",
  "Vedio/stock-footage-uttar-pradesh-india-jul-view-of-chitrakoot-city-from-the-height.mp4",
];
const places = [
  {
    title: "रामघाट",
    desc: "जहाँ प्रभु श्रीराम ने स्नान किया और संत तुलसीदास ने रामचरितमानस की रचना की।",
    img: "https://media.gettyimages.com/id/2207985360/photo/illuminated-rowboats-at-ram-ghat-evening-aarti-of-mandakini-river-in-chitrakoot-madhya.jpg?s=612x612&w=0&k=20&c=qTZq8zG1VH4zOhFZKYpW5TBjKdKFtIDI8iaYUQnwWf8=",
  },
  {
    title: "कामदगिरी पर्वत",
    desc: "पवित्र पर्वत जिसकी परिक्रमा करने से सभी मनोकामनाएँ पूर्ण होती हैं।",
    img: "data:image/jpeg;base64,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",
  },
  {
    title: "भरत मिलाप मंदिर",
    desc: "जहाँ भरत ने प्रभु श्रीराम से मिलन कर चरण पादुका माँगी थी।",
    img: "https://www.tirthayatra.org/wp-content/uploads/2022/06/PXL_20211028_043122615_small.jpg",
  },
];

const HeroVideoSection = () => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * videoSources.length)
  );

  useEffect(() => {
    videoSources.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnd = () => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * videoSources.length);
      } while (nextIndex === currentIndex);
      setCurrentIndex(nextIndex);
    };

    video?.addEventListener("ended", handleVideoEnd);
    return () => {
      video?.removeEventListener("ended", handleVideoEnd);
    };
  }, [currentIndex]);

  return (
    <div className="relative w-full ">
      {/* Sticky Video Section */}
<div className="sticky top-0 h-screen z-10 bg-[#414A37] overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.video
      key={currentIndex}
      ref={videoRef}
      src={videoSources[currentIndex]}
      autoPlay
      muted
      playsInline
      loop
      className="absolute inset-0 w-full h-full object-cover"
    />
  </AnimatePresence>

  {/* Overlay Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center px-4">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-snug">
      ✨ Welcome to <span className="text-yellow-400">Chitrakoot यात्रा</span> ✨
    </h1>

    <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl">
      Discover sacred sites. Experience divine beauty.
    </p>

    <div className="flex flex-col sm:flex-row gap-4">
      <Link
        to="/tourist-spots"
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition"
      >
        Explore Spots
      </Link>
      <Link
        to="/rickshaw-tour"
        className="bg-white/20 hover:bg-white/30 border border-white text-white px-6 py-3 rounded-full font-semibold transition"
      >
        Book Rickshaw Tour
      </Link>
    </div>
  </div>
</div>

      {/* Overlapping Tester */}
      <div className="bg-[#414A37] relative w-full z-20">
  {/* Overlay Section */}
  <div className="relative min-h-screen bg-cover bg-center bg-fixed bg-[url('/assets/chitrakoot-overlay.jpg')] flex flex-col justify-center items-center text-white px-4 md:px-6 py-16 md:py-20">
    
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60 z-0" />

    {/* Floating Diyas */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.img
        src="/diya.png"
        className="absolute top-6 right-6 w-10 sm:w-12"
        animate={{ y: [0, 0, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.img
        src="/diya.png"
        className="absolute top-6 left-6 w-10 sm:w-12"
        animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.img
        src="/diya.png"
        className="absolute bottom-6 right-10 w-12 sm:w-16"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.img
        src="/diya.png"
        className="absolute bottom-6 left-10 w-12 sm:w-16"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
    </div>

    {/* Title */}
    <motion.h2
      className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      ✨ Experience the Heart of{" "}
      <span className="text-yellow-400">Chitrakoot</span> ✨
    </motion.h2>

    {/* Subtitle */}
    <motion.p
      className="relative z-10 text-base sm:text-lg md:text-xl text-center max-w-2xl italic mb-8 px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      "जहाँ राम बसे, वहीं कल्याण बसे।"
    </motion.p>

    {/* Responsive Grid */}
    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-2 sm:px-4">
      {places.map((place, index) => (
        <motion.div
          key={index}
          className="group backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-4 sm:p-5 text-center shadow-lg transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={place.img}
            alt={place.title}
            className="w-full h-36 sm:h-40 object-cover rounded-xl mb-4 border border-white/20 transition duration-300 group-hover:brightness-110"
          />

          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white transition-all duration-300 group-hover:text-yellow-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">
            {place.title}
          </h3>

          <p className="text-sm sm:text-base text-white/90 transition-colors duration-300 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-pink-500/20 group-hover:to-blue-500/20 p-2 rounded-lg">
            {place.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</div>

    </div>
  );
};
export default HeroVideoSection;
