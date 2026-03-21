import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import productsData from "../data/products.json";

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === id);
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // --- REMOVED HERO-CARD ANIMATION - Framer Motion handles it ---

      // --- 1. Text Reveal (Left Side) ---
      tl.from(
        ".hero-text-mask",
        {
          yPercent: 120,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        },
        "+=0.5" // Start after a small delay
      );

      // --- 2. Floating Team Avatars ---
      gsap.to(".team-floater", {
        y: -15,
        duration: 2,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // --- 3. Infinite Marquee Animation ---
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });

      // --- 4. Bento Grid 3D Reveal ---
      const cards = gsap.utils.toArray(".bento-card");
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
          }),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-medium text-gray-500">
        Product not found
      </div>
    );

  // Images for the card stack - Get 3 images or use main image as fallback
  const stackImages =
    product.images && product.images.length >= 3
      ? product.images.slice(0, 3)
      : product.images && product.images.length > 0
        ? [...product.images, product.img, product.img].slice(0, 3)
        : [product.img, product.img, product.img];

  // Marquee content repeated for seamless loop
  const marqueeText =
    " CREATIVE • INNOVATIVE • DIGITAL • EXPERIENCE • FUTURE • DESIGN • ";

  // Generate gallery items from product data
  const getGalleryItems = () => {
    if (!product.images || product.images.length === 0) {
      return [
        {
          type: "image",
          src: product.img,
          span: "col-span-1 sm:col-span-2 md:col-span-2 row-span-2",
        },
      ];
    }

    const spanPatterns = [
      "col-span-1 sm:col-span-2 md:col-span-2 row-span-2",
      "col-span-1 sm:col-span-1 md:col-span-1 row-span-1",
      "col-span-1 sm:col-span-1 md:col-span-1 row-span-1",
      "col-span-1 sm:col-span-1 md:col-span-1 row-span-2",
      "col-span-1 sm:col-span-2 md:col-span-2 row-span-1",
      "col-span-1 sm:col-span-1 md:col-span-1 row-span-1",
      "col-span-1 sm:col-span-1 md:col-span-1 row-span-1",
      "col-span-1 sm:col-span-1 md:col-span-1 row-span-2",
    ];

    return product.images.map((imageSrc, index) => ({
      type: "image",
      src: imageSrc,
      span: spanPatterns[index % spanPatterns.length],
    }));
  };

  const galleryItems = getGalleryItems();

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#f3f4f6] text-gray-900 font-sans selection:bg-black selection:text-white relative overflow-hidden"
    >
      {/* --- HERO SECTION (Fully Responsive) --- */}
      <header className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 min-h-[80vh] md:min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12 z-10">
        {/* IMAGE FIRST ON MOBILE/TABLET - RIGHT SIDE */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 relative h-[400px] sm:h-[800px] md:h-[600px] flex items-center justify-center lg:justify-end">
          {/* 3D Card Stack - Inline with Product Images */}
          <div className="absolute lg:bottom-32 w-full h-full">
            <div className="absolute top-0 sm:top-20 md:top-36 right-0 sm:right-96 md:right-32 lg:right-64 h-[250px] sm:h-[280px] md:h-[300px] w-[280px] sm:w-[320px] md:w-[350px] p-6 sm:p-8 md:p-10 [perspective:1200px]">
              {/* Card 1 - Back */}
              <motion.div
                initial={{ opacity: 0, x: -120, rotateY: -25 }}
                animate={{ opacity: 1, x: 0, rotateY: -9 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-0 z-10 h-[180px] sm:h-[190px] md:h-[200px] w-[280px] sm:w-[320px] md:w-[350px]
                     rounded-xl shadow-2xl
                     [transform:rotateZ(6deg)]"
              >
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={stackImages[0]}
                  alt={`${product.title} - Card 1`}
                />
              </motion.div>

              {/* Card 2 - Middle */}
              <motion.div
                initial={{ opacity: 0, x: -120, rotateY: -30 }}
                animate={{ opacity: 1, x: 0, rotateY: -17 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                className="absolute top-16 sm:top-20 md:top-24 left-16 sm:left-20 md:left-24 z-20 h-[180px] sm:h-[190px] md:h-[200px] w-[280px] sm:w-[320px] md:w-[350px]
                     rounded-xl shadow-2xl
                     [transform:rotateZ(6deg)]"
              >
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={stackImages[1]}
                  alt={`${product.title} - Card 2`}
                />
              </motion.div>

              {/* Card 3 - Front */}
              <motion.div
                initial={{ opacity: 0, x: -120, rotateY: -35 }}
                animate={{ opacity: 1, x: 0, rotateY: -20 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                className="absolute top-32 sm:top-40 md:top-48 left-32 sm:left-40 md:left-48 z-30 h-[180px] sm:h-[190px] md:h-[200px] w-[280px] sm:w-[320px] md:w-[350px]
                     rounded-xl shadow-2xl
                     [transform:rotateZ(6deg)]"
              >
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={stackImages[2]}
                  alt={`${product.title} - Card 3`}
                />
              </motion.div>
            </div>
          </div>

          {/* Floating Avatar Pills (Hidden on Mobile) */}
          {product.team && (
            <div className="hidden sm:flex absolute bottom-6 right-4 sm:right-10 z-40 items-center gap-2 sm:gap-3 pointer-events-none flex-wrap">
              {product.team.map((member, i) => (
                <div
                  key={i}
                  className="team-floater flex items-center gap-1.5 sm:gap-2
                   bg-white/80 backdrop-blur-md
                   px-2 sm:px-3 py-1 sm:py-1.5 rounded-full
                   shadow-md border border-gray-100"
                >
                  <img
                    src={
                      member.image ||
                      `https://ui-avatars.com/api/?name=${member.name}&background=random`
                    }
                    alt={member.name}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                  />

                  <div className="leading-tight">
                    <div className="text-[10px] sm:text-[11px] font-semibold text-gray-900">
                      {member.name}
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-gray-500 font-medium">
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TEXT SECOND ON MOBILE/TABLET - LEFT SIDE */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 max-w-2xl relative z-20">
          <div className="overflow-hidden mb-3 sm:mb-4 md:mb-6">
            <div className="hero-text-mask inline-block">
              <span className="text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] text-gray-500 uppercase flex items-center gap-2 sm:gap-3">
                {product.client || "Create Your Own"}
              </span>
            </div>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-text-mask text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.85] text-gray-900 mb-3 sm:mb-4 md:mb-6">
              {product.title}
            </h1>
          </div>

          <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
            <p className="hero-text-mask text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-600 leading-snug">
              {product.category}{" "}
              <span className="font-bold text-gray-900">Experience</span>
            </p>
          </div>

          <div className="overflow-hidden mb-6 sm:mb-8 md:mb-12">
            <p className="hero-text-mask text-sm sm:text-base md:text-lg text-gray-500 max-w-lg leading-relaxed">
              {product.desc}
            </p>
          </div>

          <div className="hero-text-mask flex gap-3 sm:gap-4">
            <button
              onClick={() =>
                product.link && window.open(product.link, "_blank")
              }
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gray-900 hover:bg-gray-600 transform duration-500 hover:scale-105 ease-in-out text-white rounded-full font-bold text-xs sm:text-sm tracking-wide transition-transform"
            >
              VIEW PROJECT
            </button>
          </div>

          {/* Partners / Tags row */}
          <div className="mt-8 sm:mt-12 md:mt-16 flex flex-wrap gap-3 sm:gap-4 md:gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {product.tags &&
              product.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm font-bold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </header>

      {/* --- CREATIVE SEPARATOR: INFINITE MARQUEE --- */}
      <div className="relative py-10 bg-black -rotate-2 scale-105 z-20 mb-20 shadow-2xl border-y-4 border-white">
        <div className="marquee-inner flex whitespace-nowrap">
          {/* Repeat text enough times to fill width */}
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-black text-white px-4 tracking-tighter">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* --- CONTENT SECTION (Responsive) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-20 sm:pb-30 md:pb-40 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 sm:gap-12 md:gap-16 lg:gap-20">
          {/* Sticky Sidebar */}
          <div className="sidebar-container space-y-6 sm:space-y-8 md:space-y-12 h-fit md:sticky md:top-24 lg:top-32">
            <div className="sidebar-item p-4 sm:p-6 md:p-8 bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 sm:mb-4 md:mb-6">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 text-gray-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default flex items-center gap-1.5 sm:gap-2"
                  >
                    <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="sidebar-item space-y-3 sm:space-y-4">
              <button
                onClick={() =>
                  product.link && window.open(product.link, "_blank")
                }
                className="w-full group flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-gray-900 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-sm sm:text-base"
              >
                <span>Visit Live Site</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Description & Gallery */}
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            <div className="prose prose-sm sm:prose-base md:prose-lg prose-gray max-w-none">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
                <span className="w-6 sm:w-8 h-[2px] bg-gray-900"></span>
                Project Overview
              </h2>
              <p
                className="sidebar-item text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 font-light"
                style={{ opacity: 1, transform: "none" }}
              >
                {product.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIVE BENTO GRID - DYNAMIC FROM PRODUCT DATA */}
      {galleryItems.length > 0 && (
        <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 md:pb-20 z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
            <span className="w-6 sm:w-8 h-[2px] bg-gray-900"></span>
            Visual Assets
          </h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[180px] gap-3 sm:gap-4 md:grid-flow-row-dense"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 20 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`relative group rounded-xl sm:rounded-2xl overflow-hidden ${item.span} cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                onClick={() => setSelectedImage(item)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-transparent z-0"></div>

                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`${product.title} - Image ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gray-900 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.type}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 rounded-xl sm:rounded-2xl pointer-events-none transition-colors duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Image Modal - Responsive */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              layoutId={selectedImage.src}
              className="relative max-w-5xl max-h-[90vh] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              {selectedImage.type === "video" ? (
                <video
                  src={selectedImage.src}
                  controls
                  autoPlay
                  className="w-full h-full object-fit"
                />
              ) : (
                <img
                  src={selectedImage.src}
                  alt="Gallery Preview"
                  className="w-full h-full object-fit"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
