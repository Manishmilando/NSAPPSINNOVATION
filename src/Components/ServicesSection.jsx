import React, { useRef, useState, useLayoutEffect } from 'react';
import { Smartphone, Laptop, Palette, Rocket, ArrowRight, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Smartphone,
    title: "App Development.",
    subtitle: "Native & Cross-Platform.",
    tag: "MOBILE_DEV",
    description: "Building high-performance mobile applications that define the future of user interaction.",
    fullDescription: "We specialize in creating native and cross-platform mobile applications that offer seamless user experiences. From concept to deployment, our team ensures your app is scalable, secure, and intuitive.",
    id: "01",
    linkId: "product-app"
  },
  {
    icon: Laptop,
    title: "Web Engineering.",
    subtitle: "Scalable Architectures.",
    tag: "WEB_SYSTEMS",
    description: "Architecting robust web platforms using modern frameworks and serverless technologies.",
    fullDescription: "Our web engineering solutions are designed to handle high traffic and complex data processing. We utilize the latest frameworks like React, Next.js, and Node.js to build responsive and powerful web applications.",
    id: "02",
    linkId: "corporate-website"
  },
  {
    icon: Palette,
    title: "Product Design.",
    subtitle: "User-Centric Interfaces.",
    tag: "UI_UX_DESIGN",
    description: "Crafting intuitive design systems that bridge the gap between human intent and digital response.",
    fullDescription: "Design is at the heart of everything we do. Our product design process involves deep user research, wireframing, and prototyping to create interfaces that are not only beautiful but also highly functional.",
    id: "03",
    linkId: "uiux-design-kit"
  },
  {
    icon: Rocket,
    title: "Digital Strategy.",
    subtitle: "Market Penetration.",
    tag: "GROWTH_HACK",
    description: "Data-driven strategies to accelerate digital transformation and market penetration.",
    fullDescription: "We help businesses navigate the digital landscape with data-driven strategies. Our services include market analysis, digital marketing planning, and growth hacking to ensure your brand reaches its full potential.",
    id: "04",
    linkId: "brand-strategy"
  }
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        x: () => -(containerRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${containerRef.current.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [expandedId]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="bg-gray-50 text-black font-sans py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10 top-8">
        <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-wide text-gray-800 border-b-2 border-gray-800 inline-block pb-1">
          Services
        </h2>

        <p className="text-xl font-mono text-gray-600 max-w-2xl border-l-4 border-black pl-6 mt-6">
          Comprehensive digital solutions tailored to elevate your business in the modern landscape.
        </p>
      </div>

      <div ref={triggerRef} className="w-full h-[700px] flex items-center relative z-10">
        <div
          ref={containerRef}
          className="flex gap-12 px-6 md:px-12 w-fit"
        >
          {services.map((service, index) => {
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={index}
                className={`service-card flex-shrink-0 bg-white rounded-[2rem] border-2 border-black hover:-translate-y-1 transition-all duration-300 ease-out group relative overflow-hidden flex flex-col
                    ${isExpanded ? 'w-[500px] md:w-[650px]' : 'w-[380px] md:w-[480px]'}
                `}
              >
                {/* Card Header */}
                <div className="p-8 pb-0 flex justify-between items-start">
                  <div className="p-3">
                    <service.icon className="w-12 h-12 text-black" strokeWidth={2} />
                  </div>
                  <div className="text-right">
                    <span className="block text-4xl font-black">{service.id}</span>
                    <span className="text-xs font-mono font-bold tracking-widest text-gray-500">INDEX</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="font-mono text-xs font-bold text-gray-400 tracking-widest uppercase mb-3 block">
                      {service.tag}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-black leading-[0.9] tracking-tight text-black mb-1">
                      {service.title}
                    </h3>
                    <h4 className="text-4xl md:text-5xl font-bold leading-[0.9] tracking-tight text-gray-400">
                      {service.subtitle}
                    </h4>
                  </div>

                  <div className="border-l-2 border-black pl-6 py-2">
                    <p className="text-lg font-medium leading-relaxed text-gray-800">
                      {service.description}
                    </p>
                  </div>

                  {/* Expanded Content */}
                  <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="overflow-hidden">
                      <div className="bg-gray-100 p-6 rounded-xl border border-black font-mono text-sm leading-relaxed">
                        {service.fullDescription}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-8 pt-0 mt-auto flex items-center justify-between">
                  <div className="font-mono text-xs font-bold">
                    STATUS: <span className="text-green-600">READY</span>
                  </div>
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="group/btn flex items-center gap-2 text-sm font-black uppercase tracking-wider hover:gap-3 transition-all outline-none"
                  >
                    {isExpanded ? 'COLLAPSE' : 'EXECUTE'}
                    {isExpanded ? <Minus className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
          {/* Spacer to ensure last card is fully visible if needed */}
          <div className="w-[10vw] flex-shrink-0"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
