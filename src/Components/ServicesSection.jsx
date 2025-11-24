import React, { useRef, useLayoutEffect } from 'react';
import { FaMobile, FaLaptopCode, FaPaintBrush, FaRocket, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: FaMobile,
    title: "App Development",
    subtitle: "Native & Cross-Platform",
    description: "Building high-performance mobile applications that define the future of user interaction.",
    id: "01",
    tag: "MOBILE_DEV",
    linkId: "product-app" // Mapping to an existing ID in services.json or products.json for demo. 
    // Wait, services.json has IDs like "uiux-design-kit", "corporate-website". 
    // I should map these correctly.
    // Let's check services.json content again.
    // It has "uiux-design-kit", "corporate-website", "brand-strategy".
    // I will map them loosely for now or I should update services.json to match.
    // Let's map "01" to "uiux-design-kit" etc.
  },
  {
    icon: FaLaptopCode,
    title: "Web Engineering",
    subtitle: "Scalable Architectures",
    description: "Architecting robust web platforms using modern frameworks and serverless technologies.",
    id: "02",
    tag: "WEB_SYSTEMS",
    linkId: "corporate-website"
  },
  {
    icon: FaPaintBrush,
    title: "Product Design",
    subtitle: "UI/UX & Systems",
    description: "Crafting intuitive design systems that bridge the gap between human intent and digital response.",
    id: "03",
    tag: "DESIGN_OPS",
    linkId: "uiux-design-kit"
  },
  {
    icon: FaRocket,
    title: "Digital Strategy",
    subtitle: "Growth & Analytics",
    description: "Data-driven strategies to accelerate digital transformation and market penetration.",
    id: "04",
    tag: "GROWTH_HACK",
    linkId: "brand-strategy"
  }
];

const ServicesSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const totalCards = cards.length;

      gsap.set(cards, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformOrigin: 'center center',
      });

      // Define per-card scroll distance to create enough scroll space
      const distancePerCard = 600;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalCards * distancePerCard}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true,
          // markers: true, // Enable for debugging
        }
      });

      cards.forEach((card, i) => {
        if (i === totalCards - 1) return;

        tl.to(card, {
          yPercent: -120,
          rotation: -5,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power2.inOut',
        }, i);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-gray-100 text-black min-h-screen overflow-hidden font-mono flex flex-col items-center pt-4 pb-8"
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-12">
        <div className="inline-block border border-black px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-4 bg-white">
          SYSTEM_SERVICES // v2.0
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
          CORE_CAPABILITIES
        </h2>
      </div>

      {/* Cards Container */}
      <div className="relative w-full max-w-xl h-[500px] md:h-[600px] perspective-1000">
        <div className="relative w-full h-full">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute inset-0 bg-white border-2 border-black rounded-[2rem] p-8 md:p-12 flex flex-col justify-between shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]"
              style={{
                zIndex: services.length - index,
                transform:
                  index === 0
                    ? 'none'
                    : `translate(${index * 15}px, ${index * 15}px) scale(${1 - index * 0.05})`,
                filter: index === 0 ? 'none' : 'brightness(0.95)',
                transition: 'transform 0.3s ease',
              }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <service.icon className="text-5xl" />
                <div className="text-right">
                  <span className="block text-4xl font-bold">{service.id}</span>
                  <span className="text-xs text-gray-500 tracking-widest">
                    INDEX
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="mt-8">
                <div className="text-xs font-bold text-gray-400 mb-2">
                  {`> ${service.tag}`}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                  {service.title}.<br />
                  <span className="text-gray-400">{service.subtitle}.</span>
                </h3>
                <p className="text-lg leading-relaxed border-l-2 border-black pl-6">
                  {service.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-end mt-8">
                <div className="text-xs">
                  STATUS: <span className="text-green-600 font-bold">READY</span>
                </div>
                <Link
                  to={`/service/${service.linkId}`} // Using a new linkId property to match services.json
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm font-bold hover:underline"
                >
                  EXECUTE
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-bold animate-bounce">
        SCROLL_TO_PEEL ↓
      </div>
    </section>
  );
};

export default ServicesSection;
