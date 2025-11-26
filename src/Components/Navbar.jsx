import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TopNavbar = () => {
  const navRef = useRef(null);
  const [activeTab, setActiveTab] = useState("hero-section"); // Changed to hero-section ID
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Scroll hide/show effect only
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth show/hide
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -120,
        opacity: isVisible ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isVisible]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      
      setActiveTab(sectionId);
    }
  };

  const navItems = [
    {
      name: "Home",
      id: "hero-section",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Services",
      id: "services-section",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
    },
    {
      name: "Projects",
      id: "projects-section",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      ),
    },
    {
      name: "Team",
      id: "team-section",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      name: "About",
      id: "about-section",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      ),
    },
    {
      name: "Contact",
      id: "contact-section",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={navRef}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-500 w-[95%] md:w-auto"
    >
      <div className="relative">
        {/* Outer glass border */}
        <div className="absolute inset-0 bg-transparent backdrop-blur-sm rounded-full border border-white shadow-[0_8px_32px_rgba(255,255,255,0.1)]"></div>

        {/* Inner layer */}
        <div className="absolute inset-[6px] bg-white/50 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)]"></div>

        {/* Navbar content */}
        <div className="relative px-6 py-2.5 flex items-center justify-center transition-all duration-300">
          <div className="flex items-center space-x-4">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex flex-col items-center justify-center px-2.5 py-1.5 min-w-[55px] transition-all duration-300 ease-out group ${
                  activeTab === item.id
                    ? "text-gray-800"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                <div
                  className={`transition-all duration-300 ${
                    activeTab === item.id
                      ? "scale-105 drop-shadow-sm"
                      : "group-hover:scale-105 group-hover:drop-shadow-sm"
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    strokeWidth: activeTab === item.id ? 2 : 1.5,
                    className: `w-4.5 h-4.5 transition-all duration-300`,
                  })}
                </div>
                <span
                  className={`text-[10px] font-medium mt-0.5 transition-all duration-300 ${
                    activeTab === item.id
                      ? "opacity-100 font-semibold"
                      : "opacity-60 group-hover:opacity-90 group-hover:font-medium"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
