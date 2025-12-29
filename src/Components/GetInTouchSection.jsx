import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import completeteam from "/completeteam.svg";

gsap.registerPlugin(ScrollTrigger);

const GetInTouchSection = () => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const chatBubblesRef = useRef([]);

  // Function to scroll to contact section
  const scrollToContact = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current || !imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous marquee animation for text - Right to Left
      if (marqueeRef.current) {
        const marqueeContent = marqueeRef.current.querySelector('.marquee-content');
        const contentWidth = marqueeContent.offsetWidth;

        gsap.to(marqueeContent, {
          x: -contentWidth / 2,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }

      // Image container appears - WITH SCROLL TRIGGER
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          duration: 2,
          force3D: true,
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 95%",
            end: "top 45%",
            scrub: 2.5,
            once: true
          }
        }
      );

      // Image itself reveals - WITH SCROLL TRIGGER
      gsap.fromTo(
        imageRef.current,
        { scale: 1.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          duration: 2,
          force3D: true,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 2.5,
            once: true
          }
        }
      );

      // Animate each bubble individually with scroll trigger
      const validBubbles = chatBubblesRef.current.filter(el => el !== null);

      validBubbles.forEach((bubble, index) => {
        if (bubble) {
          // Entrance animation from sides
          const isLeftSide = index < 6;

          gsap.fromTo(
            bubble,
            {
              x: isLeftSide ? -100 : 100,
              opacity: 0,
              scale: 0.8
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              ease: "power3.out",
              duration: 1.2,
              scrollTrigger: {
                trigger: bubble,
                start: "top 90%",
                end: "top 50%",
                scrub: 1.5,
                once: true
              }
            }
          );

          // Floating animation (starts after element is visible)
          gsap.to(bubble, {
            y: "+=10",
            duration: 2 + (index * 0.2),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1,
            force3D: true
          });
        }
      });
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] bg-[#ffffff] overflow-hidden py-10 md:py-20 "

    >
      {/* Scrolling Marquee Text Section */}
      <div className="relative py-4 md:py-6 bg-black -rotate-2 scale-105 z-20 mb-10 md:mb-20 shadow-2xl border-y-2 md:border-y-4 border-white">
        <div ref={marqueeRef} className="relative whitespace-nowrap will-change-transform">
          <div className="marquee-content inline-flex items-center">
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                <h1 className="text-[clamp(4rem,8vw,6rem)] font-black text-white uppercase tracking-tight mx-6 leading-none" style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.02em' }}>
                  GET IN TOUCH WITH NS APPS INNOVATIONS
                </h1>
                <span className="text-[clamp(4rem,8vw,6rem)] font-black text-white mx-8">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Section with Chat Bubbles */}
        <div
          ref={imageContainerRef}
          className="relative flex items-center justify-center min-h-0 md:min-h-[800px]"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="relative w-full flex flex-col md:block items-center justify-center">

            {/* Center Image - Full Width with Proper Aspect Ratio */}
            <img
              ref={imageRef}
              src={completeteam}
              alt="NS Apps Innovations Team"
              loading="lazy"
              className="relative w-full max-w-[1600px] h-auto rounded-3xl object-contain mx-auto"
              style={{ willChange: 'transform', transform: 'translateZ(0)', zIndex: 1 }}
            />

            {/* Left Side - Text Bubbles - Positioned to avoid faces */}
            <div className="relative md:absolute left-auto top-auto md:left-4 lg:left-8 xl:left-16 md:top-[8%] space-y-4 w-full md:w-auto px-4 md:px-0 max-w-md md:max-w-[280px] lg:max-w-sm z-10 flex flex-col items-start">
              {/* Comment Indicator */}
              <div
                ref={el => chatBubblesRef.current[0] = el}
                className="text-gray-400 text-xs md:text-sm px-2 italic"
                style={{ willChange: 'transform' }}
              >

              </div>



              {/* Text Bubble */}
              <div
                ref={el => chatBubblesRef.current[2] = el}
                className="bg-white relative md:absolute text-gray-900 p-4 md:p-2 top-0  rounded-2xl shadow-xl border border-gray-100"
                style={{ willChange: 'transform' }}
              >
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed px-2 whitespace-nowrap">
                  Looking to build your next web or mobile app?
                </p>
              </div>

              {/* Subtext */}
              <div
                ref={el => chatBubblesRef.current[3] = el}
                className="text-gray-500 text-xs md:text-sm px-2 pt-4 md:pt-80"
                style={{ willChange: 'transform' }}
              >
                Let's create something amazing together!
              </div>

              {/* Send Message Button */}
              <div
                ref={el => chatBubblesRef.current[4] = el}
                style={{ willChange: 'transform' }}
              >
                <button
                  onClick={scrollToContact}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer relative z-50"
                >
                  SEND MESSAGE
                </button>
              </div>


              {/* Team Badge - Left Side (Desktop Only) */}
              <div
                ref={el => chatBubblesRef.current[5] = el}
                className="hidden md:flex bg-gray-600 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                NS Apps Team
              </div>
            </div>

            {/* Right Side - Text Bubbles - Positioned to avoid faces */}
            <div className="relative md:absolute right-auto top-auto md:right-4 lg:right-8 xl:right-16 md:top-[80%] space-y-4 w-full md:w-auto px-4 md:px-0 max-w-md md:max-w-[280px] lg:max-w-md z-10 flex flex-col items-end mt-8 md:mt-0">
              {/* Developer Badge */}
              <div
                ref={el => chatBubblesRef.current[6] = el}
                className="bg-gray-600 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit ml-auto flex items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full "></div>
                Full Stack Developer
              </div>

              {/* Team Badge */}
              {/* Team Badge - Mobile Only (Right Side) */}
              <div
                ref={el => chatBubblesRef.current[5] = el}
                className="flex md:hidden bg-gray-600 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit ml-auto items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                NS Apps Team
              </div>

              {/* Why NS Apps Team? Section */}
              <div
                ref={el => chatBubblesRef.current[7] = el}
                className="space-y-3 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 shadow-xl"
                style={{ willChange: 'transform' }}
              >
                <h3 className="text-gray-900 text-base md:text-lg font-bold">Why NS Apps Innovations?</h3>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed ">
                  Specialized in <span className="text-gray-900 font-semibold">React, Node.js, and Android development</span> with expertise in building scalable web and mobile applications.
                </p>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed ">
                  From concept to deployment, we deliver modern, performant solutions that drive results.
                </p>
              </div>

              {/* Projects Badge */}
              <div
                ref={el => chatBubblesRef.current[8] = el}
                className="bg-gray-900 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit ml-auto flex items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                50+ Projects
              </div>

              {/* Innovation Badge - Positioned at bottom to avoid cutting */}
              <div
                ref={el => chatBubblesRef.current[9] = el}
                className="bg-gray-700 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit"
                style={{ willChange: 'transform' }}
              >
                Innovation Driven
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
