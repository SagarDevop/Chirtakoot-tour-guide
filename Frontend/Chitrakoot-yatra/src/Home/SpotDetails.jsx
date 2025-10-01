import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spot from "../Data/Spot";

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
    <div className="min-h-screen bg-[#EAD7B7] text-gray-900 p-4 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#99744A] text-center mt-20 mb-8 drop-shadow-2xl">
        {spot.name}
      </h1>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 mb-6 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${spot.name} ${index}`}
            className="w-[80vw] sm:w-[50vw] md:w-[30vw] lg:w-[25vw] h-[40vh] sm:h-[50vh] rounded-lg object-cover flex-shrink-0"
            style={{ scrollSnapAlign: "start" }}
          />
        ))}
      </div>

      <div className="bg-white p-6 md:p-10 rounded-lg shadow-md w-full max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#99744A] p-4 rounded-xl shadow-md text-white">
            <h3 className="text-lg font-semibold mb-2">Best Time</h3>
            <p className="text-sm">{spot.besttime}</p>
          </div>
          <div className="bg-[#99744A] p-4 rounded-xl shadow-md text-white">
            <h3 className="text-lg font-semibold mb-2">Tips</h3>
            <p className="text-sm">{spot.Tips}</p>
          </div>
          <div className="bg-[#99744A] p-4 rounded-xl shadow-md text-white">
            <h3 className="text-lg font-semibold mb-2">Highlights</h3>
            <p className="text-sm">{spot.Highlights}</p>
          </div>
        </div>

        <div className="w-full bg-[#414A37] p-6 rounded-lg shadow text-white text-base md:text-lg">
          <h2 className="text-lg font-semibold mb-4">संक्षिप्त वर्णन</h2>
          {spot.description}
        </div>

        <div className="w-full bg-[#414A37] p-6 rounded-lg shadow text-white text-base md:text-lg">
          <h2 className="text-lg font-semibold mb-4">
            {spot.name} का इतिहास और धार्मिक महत्व
          </h2>
          {spot.fullDescription}
          <div className="mt-8">
            <a
              href={spot.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black py-2 px-6 rounded-md hover:bg-black hover:text-white transition"
            >
              📍 Show on Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
