import React, { useRef } from "react";
import SpotCard from "../Components/SpotCard";
import { motion, useScroll, useTransform } from "framer-motion";
import Spot from "../Data/Spot";

const TouristSpots = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden bg-[#DBC2A6]"
    >
      {/* Heading */}
      <motion.h1
        className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-yellow-900 mb-10 leading-snug"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🛕 Explore Chitrakoot’s Sacred Spots
      </motion.h1>

      {/* Grid for cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {Spot.map((spot, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <SpotCard {...spot} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TouristSpots;
