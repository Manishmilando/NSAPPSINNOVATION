import React, { useRef, useEffect } from 'react';
import { FaMobile, FaLaptopCode, FaPaintBrush, FaRocket } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ icon: Icon, title, description, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          scrub: 0.5
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === cardRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={cardRef} className="relative mt-10" id="services-section"> 
      {/* Outer cutout layer */}
      <div className="flex justify-center div-cutout bg-black/40">
        {/* Inner cutout layer */}
        <div className="flex justify-center div-cutout bg-white h-96 w-72 scale-[0.99]">
          {/* Card content */}
          <div className="relative h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col justify-between group hover:from-gray-900 hover:to-gray-800 transition-all duration-500">
            
            {/* Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 rounded-xl bg-white group-hover:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Icon className="text-3xl text-gray-900 group-hover:text-white transition-colors duration-500" />
              </div>
            </div>
            
            {/* Title and Description */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500 mb-4 tracking-tight">
                {title}
              </h3>
              
              <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed text-sm">
                {description}
              </p>
            </div>

            {/* Hover Arrow */}
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-white text-sm font-semibold tracking-wide">Explore</span>
              <svg className="w-4 h-4 text-white transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      icon: FaMobile,
      title: "Android Development",
      description: "Native Android applications with intuitive interfaces and seamless performance for exceptional user experiences."
    },
    {
      icon: FaLaptopCode,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies like React and Tailwind CSS for optimal performance."
    },
    {
      icon: FaPaintBrush,
      title: "UI/UX Design",
      description: "Beautiful, user-centered designs that combine aesthetics with functionality to create memorable digital experiences."
    },
    {
      icon: FaRocket,
      title: "Digital Solutions",
      description: "Custom creative tech solutions tailored to your business needs, from concept to deployment and beyond."
    }
  ];

  return (
    <>
      <style>{`
        .div-cutout {
          clip-path: polygon(
            0 0,
            calc(100% - 20px) 0,
            100% 20px,
            100% 100%,
            0 100%
          );
        }
      `}</style>

      <section className="w-full min-h-screen bg-white text-black px-10 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transforming ideas into innovative digital solutions with creativity and technical excellence
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto flex justify-center items-center flex-wrap gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
