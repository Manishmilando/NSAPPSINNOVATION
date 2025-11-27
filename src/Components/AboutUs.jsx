import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Lottie from 'lottie-react';
// import CurveSVGManipulation from './Svgmanupulation'; 

const CARD_TILT_MAX = 12; // degrees

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

// Shared Lottie wrapper: big size, no bg divs around (only this container)
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
        className="w-[550px] h-[550px] md:w-[650px] md:h-[650px] -mt-16 drop-shadow-2xl"
      />
    </motion.div>
  );
};

// Lottie for each section (from public)
const WebDevLottie = () => <BigLottie jsonUrl="/WebDevDesign.json" />;
const MobileAppLottie = () => <BigLottie jsonUrl="/MobileAppShowcase.json" />;
const AILottie = () => <BigLottie jsonUrl="/simpleaipulse.json" />;

const AboutUsSection = () => {
  const [activeTab, setActiveTab] = useState('who-we-are');
  const [activeSection, setActiveSection] = useState('web-development');

  // Refs for scroll animations
  const whoWeAreRef = useRef(null);
  const isWhoWeAreInView = useInView(whoWeAreRef, { once: true, amount: 0.3 });

  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt();

  const sections = [
    {
      id: 'web-development',
      title: 'Modern Web Development',
      description: 'We craft beautiful, interactive websites using React, Vite, and Tailwind CSS. From animated landing pages to complex dashboards, we build fast, responsive, and user-friendly web applications that make an impact.',
      services: ['Landing Pages & Websites', 'Interactive UI/UX Design', 'Dashboard Development']
    },
    {
      id: 'mobile-apps',
      title: 'Android App Development',
      description: 'We develop native Android applications that deliver seamless user experiences. Our apps are built with performance, security, and scalability in mind, ensuring they work flawlessly across all devices.',
      services: ['Native Android Apps', 'App UI/UX Design', 'Firebase Integration']
    },
    {
      id: 'ai-tools',
      title: 'AI & Innovation',
      description: 'We harness the power of artificial intelligence to create smart tools and solutions. From chatbots to automation, we integrate cutting-edge AI technologies to solve real-world problems and enhance user experiences.',
      services: ['AI-Powered Tools', 'Automation Solutions', 'Smart Integrations']
    }
  ];

  const currentSection = sections.find(section => section.id === activeSection);

  const whoWeAreContent = [
    {
      icon: '',
      text: 'NS Apps Innovations is a creative tech company focused on building modern websites, Android apps, and AI tools with exceptional design and performance.'
    },
    {
      text: "We're a passionate team of developers and designers who believe in blending innovation, creativity, and technology to craft experiences that truly stand out."
    },
    {
      text: 'Our goal is simple — to turn bold ideas into interactive, meaningful digital experiences that inspire.'
    }
  ];

  return (
    <section className="relative bg-gray-50 py-20 px-4 z-[10]">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation with Animated Underlines */}
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-12">
            {/* WHO WE ARE Tab */}
            <button
              onClick={() => setActiveTab('who-we-are')}
              className="relative group"
            >
              <h3 className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === 'who-we-are' ? 'text-gray-900' : 'text-gray-400'
                } group-hover:text-gray-900`}>
                WHO WE ARE
              </h3>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-500"
                initial={false}
                animate={{
                  scaleX: activeTab === 'who-we-are' ? 1 : 0,
                  originX: 0
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: activeTab === 'who-we-are' ? 0 : 1 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ originX: 0 }}
              />
            </button>

            {/* WHAT WE DO Tab */}
            <button
              onClick={() => setActiveTab('what-we-do')}
              className="relative group"
            >
              <h3 className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === 'what-we-do' ? 'text-gray-900' : 'text-gray-400'
                } group-hover:text-gray-900`}>
                WHAT WE DO
              </h3>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-500"
                initial={false}
                animate={{
                  scaleX: activeTab === 'what-we-do' ? 1 : 0,
                  originX: 0
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: activeTab === 'what-we-do' ? 0 : 1 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ originX: 0 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {/* WHO WE ARE CONTENT */}
          {activeTab === 'who-we-are' && (
            <motion.div
              key="who-we-are"
              ref={whoWeAreRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-16 items-start"
            >
              {/* Left Content */}
              <div className="space-y-6 pt-16">
                {whoWeAreContent.map((item, index) => (
                  <motion.p
                    key={index}
                    className="text-base text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isWhoWeAreInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.text}
                  </motion.p>
                ))}
              </div>

              {/* Right Side - 3D PNG Logo */}
              <motion.div
                className="relative"
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
                  className="bg-white rounded-2xl shadow-[0_24px_80px_rgba(15,23,42,0.18)] border border-gray-100 flex items-center justify-center min-h-[400px] transition-transform duration-150"
                  style={{
                    transform: 'perspective(1000px) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div
                    className="relative text-center"
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    <img
                      src="/texture.png"
                      alt="NS Apps Innovations"
                      className="w-48 h-48 mx-auto object-contain select-none pointer-events-none"
                      draggable="false"
                    />

                    <p className="mt-8 text-2xl font-bold text-gray-900">
                      NS Apps Innovations
                    </p>
                    <p className="mt-2 text-sm text-gray-500 uppercase tracking-wider">
                      Building the Future
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* WHAT WE DO CONTENT */}
          {activeTab === 'what-we-do' && (
            <motion.div
              key="what-we-do"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-16 items-start"
            >
              {/* Left Content - FIXED HEIGHT */}
              <motion.div className="space-y-8 min-h-[500px] flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-grow"
                  >
                    <h2 className="text-5xl md:text-6xl font-normal text-black mb-8 leading-tight">
                      {currentSection.title}
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed max-w-md">
                      {currentSection.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Service Navigation */}
                <div className="space-y-6 pt-8">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      className={`font-normal text-base cursor-pointer transition-colors duration-300 ${activeSection === section.id ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-600'
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

              {/* Right visual area - FIXED HEIGHT */}
              <div className="relative h-[500px]">
                <motion.div
                  className=""
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
        </AnimatePresence>
      </div>
      {/* <div className="absolute left-0 bottom-0 top-8/9 w-full z-0">
        <CurveSVGManipulation />
      </div> */}
    </section>
  );
};

export default AboutUsSection;
