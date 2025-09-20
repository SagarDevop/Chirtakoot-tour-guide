import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

const SpotCard = ({ name, image, description, mapLink, category }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = cardRef.current;

 

    gsap.fromTo(
      el,
      { boxShadow: '0 0 0px transparent' },
      {
        boxShadow: '0 0 30px rgba(0, 100, 0, 0.5)', 
        scrollTrigger: {
          trigger: el,
          start: 'top center',   // when top of card hits center of screen
          end: 'bottom center',
          toggleActions: 'play reverse play reverse',
        },
        duration: 0.5,
        ease: 'power2.out',
      }
    );
  }, []);

   const handleClick = () => {
    navigate(`/tourist-spot/${encodeURIComponent(name,description,mapLink,category,)}`);
    console.log('Detailed button clicked');
  };

  return (
   <div
  ref={cardRef}
  className="w-[28vw] h-[55vh] bg-[#99744A] backdrop-blur-md border border-white/20 p-4 rounded-xl text-white transition-all duration-300 flex flex-col"
>
  <img
    src={image}
    alt={name}
    className="w-full h-40 object-cover rounded-md"
  />

  <div className="p-3 flex flex-col flex-grow">
    <h2 className="text-lg font-bold text-yellow-300">{name}</h2>
    <p className="text-sm text-gray-200 mt-2 flex-grow overflow-hidden line-clamp-4">
      {description}
    </p>

    <div className="mt-4 flex items-center justify-between">
      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
        {category}
      </span>
      <button
        onClick={handleClick}
        className="text-xs bg-green-900 text-white px-2 py-1 rounded-md"
      >
        more..
      </button>
      <a
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300 hover:text-blue-500 text-sm font-medium"
      >
        📍 Show on Map
      </a>
    </div>
  </div>
</div>

  );
};

export default SpotCard;
