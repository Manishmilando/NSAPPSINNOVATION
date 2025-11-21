import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sir from "/sir.png"

gsap.registerPlugin(ScrollTrigger);

const GetInTouchSection = () => {
  const containerRef = useRef(null);
  const textWrapperRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const chatBubblesRef = useRef([]);

  // Function to scroll to contact section
  const scrollToContact = (e) => {
    e.preventDefault(); // ✅ Prevent default behavior
    e.stopPropagation(); // ✅ Stop event bubbling
    
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current || !textWrapperRef.current || !imageContainerRef.current) return;

    const textWidth = textWrapperRef.current.scrollWidth;
    const windowWidth = window.innerWidth;

    // Master timeline for horizontal scroll
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${textWidth - windowWidth + 1500}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        // ✅ Add this to prevent scroll interference
        onLeave: () => {
          // Ensure ScrollTrigger doesn't interfere with navigation
          ScrollTrigger.refresh();
        }
      }
    });

    // Horizontal text scroll
    masterTimeline.to(textWrapperRef.current, {
      x: () => -(textWidth - windowWidth),
      ease: "none",
      duration: 3,
      force3D: true
    }, 0);

    // Image section appears
    masterTimeline.fromTo(
      imageContainerRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        duration: 1,
        force3D: true
      },
      0.5
    );

    // Image itself reveals
    masterTimeline.fromTo(
      imageRef.current,
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        duration: 0.8,
        force3D: true
      },
      1.0
    );

    // Chat bubbles and badges stagger in
    const validBubbles = chatBubblesRef.current.filter(el => el !== null);

    masterTimeline.fromTo(
      validBubbles,
      {
        y: 50,
        opacity: 0,
        scale: 0.5
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: {
          amount: 1,
          from: "start"
        },
        ease: "back.out(1.7)",
        duration: 0.6,
        force3D: true
      },
      1.5
    );

    // Floating animation for badges
    masterTimeline.add(() => {
      validBubbles.forEach((bubble, index) => {
        if (bubble) {
          gsap.to(bubble, {
            y: "+=8",
            duration: 2 + (index * 0.2),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.15,
            force3D: true
          });
        }
      });
    }, 2.2);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Kill floating animations
      validBubbles.forEach(bubble => {
        if (bubble) gsap.killTweensOf(bubble);
      });
      masterTimeline.scrollTrigger?.kill();
      masterTimeline.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#ffffff] overflow-hidden pt-24"
      id="get-in-touch" // ✅ Changed from "contact-section" to match common patterns
    >
      {/* Container for both text and image sections */}
      <div className="relative h-screen flex flex-col justify-between">

        {/* Horizontal Scrolling Text - Top Section */}
        <div className="relative z-20 h-[30vh] flex items-start pt-8">
          <div
            ref={textWrapperRef}
            className="flex items-center whitespace-nowrap will-change-transform px-8"
            style={{ transform: 'translateZ(0)' }}
          >
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-black text-black leading-none tracking-tighter mr-8 md:mr-12">
              GET IN
            </h1>
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-black text-black leading-none tracking-tighter mr-8 md:mr-12">
              TOUCH
            </h1>
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-black text-black leading-none tracking-tighter mr-8 md:mr-12">
              WITH
            </h1>
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-black text-black leading-none tracking-tighter mr-8 md:mr-12">
              NS APPS
            </h1>
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-black text-black leading-none tracking-tighter mr-8 md:mr-12">
              INNOVATIONS
            </h1>
            <div className="w-[clamp(3rem,8vw,6rem)] h-[clamp(3rem,8vw,6rem)] bg-gray-900 rounded-full flex-shrink-0"></div>
          </div>
        </div>

        {/* Image Section with Chat Bubbles - Bottom Section */}
        <div
          ref={imageContainerRef}
          className="relative flex-1 flex items-center justify-center px-6 pb-10"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="relative flex items-center justify-center w-full max-w-[90rem]">

            {/* Center Image */}
            <img
              ref={imageRef}
              src={Sir}
              alt="Nishant Shakher"
              className="relative w-[420px] h-[480px] sm:w-[500px] sm:h-[560px] md:w-[600px] md:h-[650px] lg:w-[700px] lg:h-[750px] xl:w-[800px] xl:h-[850px] rounded-3xl object-cover object-center"
              style={{ willChange: 'transform', transform: 'translateZ(0)', zIndex: 1 }}
            />

            {/* Left Side - Text Bubbles */}
            <div className="absolute left-4 md:left-8 lg:left-12 xl:left-20 top-[15%] space-y-4 max-w-[240px] md:max-w-[280px] lg:max-w-sm hidden md:block z-10">
              {/* Nishant Badge */}
              <div
                ref={el => chatBubblesRef.current[0] = el}
                className="bg-gray-700 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit"
                style={{ willChange: 'transform' }}
              >
                Nishant
              </div>

              {/* Text Bubble */}
              <div
                ref={el => chatBubblesRef.current[1] = el}
                className="bg-white text-gray-900 p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100"
                style={{ willChange: 'transform' }}
              >
                <p className="text-sm md:text-base leading-relaxed">
                  Looking to build your next web or mobile app?
                </p>
              </div>

              {/* Subtext */}
              <div
                ref={el => chatBubblesRef.current[2] = el}
                className="text-gray-500 text-xs md:text-sm px-2"
                style={{ willChange: 'transform' }}
              >
                Let's create something amazing together!
              </div>

              {/* Send Message Button */}
              <div
                ref={el => chatBubblesRef.current[3] = el}
                style={{ willChange: 'transform' }}
              >
                <button 
                  onClick={scrollToContact}
                  onMouseDown={(e) => e.stopPropagation()} // ✅ Prevent interference
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer relative z-50"
                >
                  SEND MESSAGE
                </button>
              </div>

              {/* Team Badge */}
              <div
                ref={el => chatBubblesRef.current[4] = el}
                className="bg-gray-600 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit flex items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                NS Apps Team
              </div>
            </div>

            {/* Right Side - Text Bubbles */}
            <div className="absolute right-4 md:right-8 lg:right-12 xl:right-20 top-[15%] space-y-4 max-w-[240px] md:max-w-[280px] lg:max-w-md hidden md:block z-10">
              {/* Developer Badge */}
              <div
                ref={el => chatBubblesRef.current[5] = el}
                className="bg-gray-600 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit ml-auto flex items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Full Stack Developer
              </div>

              {/* Why Nishant? Section */}
              <div
                ref={el => chatBubblesRef.current[6] = el}
                className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200"
                style={{ willChange: 'transform' }}
              >
                <h3 className="text-gray-900 text-lg md:text-xl font-bold">Why Nishant Shakher?</h3>
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                  Specialized in <span className="text-gray-900 font-semibold">React, Node.js, and Android development</span> with expertise in building scalable web and mobile applications.
                </p>
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                  From concept to deployment, I deliver modern, performant solutions that drive results.
                </p>
              </div>

              {/* Client Badge */}
              <div
                ref={el => chatBubblesRef.current[7] = el}
                className="bg-gray-900 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit ml-auto flex items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                50+ Projects
              </div>

              {/* Innovation Badge */}
              <div
                ref={el => chatBubblesRef.current[8] = el}
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
