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
      className="mt-14 relative min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 px-6 overflow-hidden"
    >
      <motion.img
        src="https://i.pinimg.com/736x/83/d4/d9/83d4d9efc456435251c34d0748ad21f5.jpg"
        alt="mandala background"
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0 pointer-events-none "
        style={{ y }}
      />

      {/* Content Layer */}
      <motion.h1
        className="relative z-10 text-4xl font-bold text-center text-yellow-800 mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🛕 Explore Chitrakoot’s Sacred Spots
      </motion.h1>

      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {Spot.map((spot, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SpotCard {...spot} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TouristSpots;
