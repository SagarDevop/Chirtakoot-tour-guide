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
      className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white transition-all duration-300"
    >
     <img src={image} alt={name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h2 className="text-xl font-bold text-yellow-700">{name}</h2>
        <p className="text-sm text-gray-700 mt-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            {category}
          </span>
          <button onClick={handleClick} className='text-xs bg-green-900 text-white  px-2 py-1 rounded-md'>more..</button>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            📍 Show on Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
