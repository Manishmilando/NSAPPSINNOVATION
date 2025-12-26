import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Lottie from 'lottie-react';

const CARD_TILT_MAX = 12;

// 3D tilt hook
const useTilt = () => {
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -CARD_TILT_MAX;
    const rotateY = ((x - centerX) / centerX) * CARD_TILT_MAX;

    ref.current.style.setProperty('--rotateX', `${rotateX}deg`);
    ref.current.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--rotateX', `0deg`);
    ref.current.style.setProperty('--rotateY', `0deg`);
  };

  return { ref, handleMouseMove, handleMouseLeave };
};

// Shared Lottie wrapper
const BigLottie = ({ jsonUrl }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(jsonUrl)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error(`Failed to load ${jsonUrl}`, err);
      });
  }, [jsonUrl]);

  if (!animationData) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
        Loading animation...
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px] xl:w-[650px] xl:h-[650px] -mt-8 sm:-mt-12 md:-mt-16 drop-shadow-2xl"
      />
    </motion.div>
  );
};

// Lottie for each section
const WebDevLottie = () => <BigLottie jsonUrl="/WebDevDesign.json" />;
const MobileAppLottie = () => <BigLottie jsonUrl="/MobileAppShowcase.json" />;
const AILottie = () =>
  <BigLottie jsonUrl="/Man and robot with computers sitting together in workplace.json" />;

// Who We Are View - FIXED VERSION
const WhoWeAreView = ({ whoWeAreRef }) => { // whoWeAreRef prop is unused now if we use internal ref, but let's keep it or remove it. Better to use internal ref.
  const internalRef = useRef(null);
  const isWhoWeAreInView = useInView(internalRef, { once: true, amount: 0.3 });
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <motion.div
      key="who-we-are"
      ref={internalRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isWhoWeAreInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
    >
      {/* Left Content */}
      <div className="flex flex-col justify-start order-1 lg:order-1">
        <div className="max-w-full space-y-4 sm:space-y-6 md:space-y-8">
          <p className="text-xs sm:text-sm font-normal tracking-wide text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-800">NS Apps Innovations</span>{" "}
            is a creative tech company focused on building modern websites, Android apps,
            and AI tools with exceptional design and performance.
          </p>

          <p className="text-xs sm:text-sm font-normal tracking-wide text-gray-600 leading-relaxed">
            We're a passionate team of developers and designers who believe in blending
            innovation, creativity, and technology to craft experiences that truly stand out.
          </p>

          <p className="text-xs sm:text-sm font-normal tracking-wide text-gray-600 leading-relaxed">
            Our goal is simple — to turn bold ideas into interactive, meaningful digital
            experiences that inspire.
          </p>
        </div>
      </div>

      {/* Right Side - 3D PNG Logo */}
      <motion.div
        className="relative order-2 lg:order-2 w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isWhoWeAreInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <div
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-[#f8f9fa] rounded-2xl flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] transition-transform duration-150 w-full"
          style={{
            transform:
              'perspective(1000px) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="relative text-center px-4" style={{ transform: 'translateZ(40px)' }}>
            <img
              src="/texture.png"
              alt="NS Apps Innovations"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto object-contain select-none pointer-events-none"
              draggable="false"
            />

            <p className="mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              NS Apps Innovations
            </p>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
              Building the Future
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AboutUsSection = () => {
  const [activeTab, setActiveTab] = useState('what-we-do');
  const [activeSection, setActiveSection] = useState('mobile-apps');

  const sections = [

    {
      id: 'mobile-apps',
      title: 'Android App Development',
      description:
        'We develop native Android applications that deliver seamless user experiences. Our apps are built with performance, security, and scalability in mind, ensuring they work flawlessly across all devices.',
      services: ['Native Android Apps', 'App UI/UX Design', 'Firebase Integration']
    },
    {
      id: 'web-development',
      title: 'Modern Web Development',
      description:
        'We craft beautiful, interactive websites using React, Vite, and Tailwind CSS. From animated landing pages to complex dashboards, we build fast, responsive, and user-friendly web applications that make an impact.',
      services: ['Landing Pages & Websites', 'Interactive UI/UX Design', 'Dashboard Development']
    },
    {
      id: 'ai-tools',
      title: 'AI & Innovation',
      description:
        'We harness the power of artificial intelligence to create smart tools and solutions. From chatbots to automation, we integrate cutting-edge AI technologies to solve real-world problems and enhance user experiences.',
      services: ['AI-Powered Tools', 'Automation Solutions', 'Smart Integrations']
    }
  ];

  const currentSection = sections.find((section) => section.id === activeSection);

  return (
    <section className="relative bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 z-[10]" id="about-section">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <motion.div
          className="text-left mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12">
            {/* WHAT WE DO Tab - Now First */}
            <button
              type="button"
              onClick={() => setActiveTab('what-we-do')}
              className="relative group"
            >
              <h3
                className={`text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors duration-300 ${activeTab === 'what-we-do' ? 'text-gray-900' : 'text-gray-400'
                  } group-hover:text-gray-900`}
              >
                WHAT WE DO
              </h3>

              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-500"
                initial={false}
                animate={{ scaleX: activeTab === 'what-we-do' ? 1 : 0, originX: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />

              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: activeTab === 'what-we-do' ? 0 : 1 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ originX: 0 }}
              />
            </button>

            {/* WHO WE ARE Tab - Now Second */}
            <button
              type="button"
              onClick={() => setActiveTab('who-we-are')}
              className="relative group"
            >
              <h3
                className={`text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors duration-300 ${activeTab === 'who-we-are' ? 'text-gray-900' : 'text-gray-400'
                  } group-hover:text-gray-900`}
              >
                WHO WE ARE
              </h3>

              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-500"
                initial={false}
                animate={{ scaleX: activeTab === 'who-we-are' ? 1 : 0, originX: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />

              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: activeTab === 'who-we-are' ? 0 : 1 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ originX: 0 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {/* WHAT WE DO CONTENT - Now First */}
          {activeTab === 'what-we-do' && (
            <motion.div
              key="what-we-do"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start"
            >
              {/* Left Content - Responsive Height */}
              <motion.div className="space-y-6 sm:space-y-8 min-h-0 sm:min-h-[450px] md:min-h-[500px] flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-grow"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-4 sm:mb-6 md:mb-8 leading-tight">
                      {currentSection.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-full md:max-w-md">
                      {currentSection.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Service Navigation */}
                <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 md:pt-8">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      className={`font-normal text-sm sm:text-base cursor-pointer transition-colors duration-300 ${activeSection === section.id
                        ? 'text-indigo-600'
                        : 'text-gray-400 hover:text-indigo-600'
                        }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Visual Area - Responsive Height */}
              <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {activeSection === 'web-development' && <WebDevLottie />}
                        {activeSection === 'mobile-apps' && <MobileAppLottie />}
                        {activeSection === 'ai-tools' && <AILottie />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* WHO WE ARE CONTENT - Now Second */}
          {activeTab === 'who-we-are' && (
            <WhoWeAreView />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AboutUsSection;
