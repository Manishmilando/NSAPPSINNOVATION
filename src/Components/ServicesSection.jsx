import React, { useRef, useEffect } from 'react';
import { Smartphone, Laptop, Palette, Glasses, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CurveSVGManipulation from '../Components/Svgmanupulation';


gsap.registerPlugin(ScrollTrigger);


const ServiceCard = ({ icon: Icon, title, description, index, clipStyle }) => {
  const cardRef = useRef(null);


  useEffect(() => {
    const el = cardRef.current;


    gsap.fromTo(
      el,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
          scrub: 0.5,
        },
      }
    );


    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, []);


  return (
    <div ref={cardRef} className="relative mt-10 flex-shrink-0 snap-center">
      {/* Outer cutout layer */}
      <div className="flex justify-center bg-black/5" style={clipStyle}>
        {/* Inner cutout layer */}
        <div className="flex justify-center bg-white h-96 w-72 scale-[0.99] border border-gray-200 shadow-md" style={clipStyle}>
          {/* Card content */}
          <div className="relative h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col justify-between group hover:from-gray-900 hover:to-gray-800 transition-all duration-500">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 rounded-xl bg-white group-hover:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                <Icon className="text-3xl text-gray-900 group-hover:text-white transition-colors duration-500" />
              </div>
            </div>


            {/* Title and Description */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500 mb-4 tracking-tight">
                {title}
              </h3>


              <p className="text-sm sm:text-base text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                {description}
              </p>
            </div>


            {/* Hover Arrow */}
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-white text-sm font-semibold tracking-wide">Explore</span>
              <svg
                className="w-4 h-4 text-white transform group-hover:translate-x-2 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>


      {/* Number indicator */}
      <p className="absolute top-2 left-1 z-50 text-black/70 font-mono text-sm tracking-wider">
        / 0{index + 1}
      </p>
    </div>
  );
};


const ServicesSection = () => {
  const services = [
    {
      icon: Smartphone,
      title: 'App Development',
      description:
        'Native and cross-platform apps engineered for performance, reliability, and delightful user journeys.',
    },
    {
      icon: Laptop,
      title: 'Web Development',
      description:
        'Modern, scalable web platforms built with React, Node, and cloud-native architectures.',
    },
    {
      icon: Palette,
      title: 'UI / UX Design',
      description:
        'User-centered interfaces that merge strong visual identity with intuitive flows.',
    },
    {
      icon: Glasses,
      title: 'VR Experiences',
      description:
        'Immersive 360° virtual reality and augmented reality solutions that transform how users interact with digital content.',
    },
  ];


  const clipPathStyle = {
    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
  };

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300; // Approx card width
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };


  return (
    <>
      <section className="relative w-full min-h-screen bg-white text-black py-8 overflow-hidden" id='service'>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header + SVG wrapper */}
          <div className="relative px-4 md:px-0">
            {/* Text block */}
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
                Our Services
              </h2>
            </div>



            <div className="w-full overflow-visible flex w-full z-50 absolute top-[10%] right-14">
              <CurveSVGManipulation />


            </div>
          </div>


          {/* Services Grid Wrapper with Arrows */}
          <div className="relative max-w-7xl mx-auto mt-16 md:mt-20 z-10">
            {/* Left Arrow (Mobile Only) */}
            <button
              onClick={() => scroll('left')}
              className="md:hidden absolute left-2 top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 text-gray-800 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow (Mobile Only) */}
            <button
              onClick={() => scroll('right')}
              className="md:hidden absolute right-2 top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-gray-900 rounded-full shadow-lg border border-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex md:flex-wrap items-center overflow-x-auto md:overflow-visible gap-6 md:gap-10 px-4 md:px-0 pb-12 md:pb-0 snap-x snap-mandatory md:snap-none justify-start md:justify-center scrollbar-hide"
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  index={index}
                  clipStyle={clipPathStyle}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


export default ServicesSection;
