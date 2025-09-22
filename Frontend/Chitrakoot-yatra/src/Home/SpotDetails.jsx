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
  


  <div className="min-h-screen bg-[#EAD7B7] text-gray-900 p-4 mt-20 text-center">
    {/* Spot ka Naam */}
    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-500 text-center mb-8
               drop-shadow-2xl">{spot.name}</h1>
   {/* Images horizontal scroll, scroller hidden */}
<div
  className="flex overflow-x-auto space-x-4 mb-6 scrollbar-hide"
  style={{
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none" // IE 10+
  }}
>
  {images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`${spot.name} ${index}`}
      className="w-[25vw] h-[50vh] max-w-md flex-shrink-0 rounded-lg object-cover"
      style={{ scrollSnapAlign: "start" }} // optional for smooth snap
      
    />
  ))}
</div>
<div
  ref={scrollRef}
  className="flex overflow-x-auto space-x-4 mb-6"
  style={{
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none" // IE 10+
  }}
  >


    </div>

   <div className=""></div>
  <div className="bg-amber-100 p-8 rounded-lg shadow-md w-full max-w-7xl mx-auto h-[100vh] flex relative flex-col gap-12">
    
    <div className="w-full flex gap-4">

  {/*  Best Time Box */}
  <div className="flex-1 bg-rose-100 p-4 rounded-xl shadow-md border border-gray-200">
    <h3 className="text-base font-semibold text-gray-800 mb-2">Best Time</h3>
    <p className="text-sm text-gray-700">{spot.besttime}</p>
  </div>

  {/*  Tips & Highlights Box */}
  <div className="flex-1 bg-rose-100 p-4 rounded-xl shadow-md border border-gray-200">
    <h3 className="text-base font-semibold text-gray-800 mb-2">Tips </h3>
    <p className="text-sm text-gray-700">{spot.Tips}</p>
  </div>
   
   <div className="flex-1 bg-rose-100 p-4 rounded-xl shadow-md border border-gray-200">
    <h3 className="text-base font-semibold text-gray-800 mb-2">Highlights </h3>
    <p className="text-sm text-gray-700">{spot.Highlights}</p>
  </div>
   
</div>

    {/* Description */}
   <div className="w-full bg-[#EFE6DD] p-4 rounded-lg shadow text-gray-800 text-lg ">
     <h2 className="text-base font-semibold text-gray-800 mb-4">संक्षिप्त वर्णन</h2>

    {spot.description}
  </div>

   {/* Full Description */}
  <div className="w-full bg-[#EFE6DD] p-4 rounded-lg shadow text-gray-700  h-[50vh] ">
   <h2 className="text-base font-semibold text-gray-800 mb-4"> {spot.name} का इतिहास और धार्मिक महत्व</h2>

    {spot.fullDescription}{spot.Highlights}
  </div>
  
</div>
</div>
);

};

export default SpotDetails;
