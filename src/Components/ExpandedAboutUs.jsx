import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const aboutData = [
    {
        id: 1,
        text: "NS Apps Innovations is one of Bihar’s earliest and most trusted technology startups, building the digital backbone of the state. From the Startup Bihar Portal and the Buddha Samyak ticketing system to AI chatbots, VR heritage experiences, legal-tech platforms, and statewide attendance systems, we power some of Bihar’s most ambitious digital transformations. We create scalable, modern, and impactful solutions for governance, culture, tourism, and public services — shaping Digital Bihar and preparing it for a national and global technological future..",
        highlights: ["NS Apps Innovations", "Bihar's most ambitious digital transformations"],
        media: [
            { type: "image", url: "https://placehold.co/600x400/1a1a1a/FFF?text=NS+Apps+Innovations" },
            { type: "image", url: "https://placehold.co/600x400/2b2b2b/FFF?text=Digital+Transformation" },
            { type: "image", url: "https://placehold.co/600x400/3c3c3c/FFF?text=Team" },
        ],
    },
    {
        id: 2,
        text: "We are the tech team behind the Asia Hockey Men's & Women's Championship, Rajgir —\ndelivering live match updates, dynamic schedules, athlete insights,\nand a world-class event website trusted by thousands.",
        highlights: ["Asia Hockey Men's & Women's Championship", "live match updates", "world-class event website"],
        media: [
            { type: "image", url: "/Projects/Hockey1.png" },
            { type: "image", url: "/Projects/Hockey2.png" },
            { type: "image", url: "/Projects/Hockey3.png" },
        ],
    },
    {
        id: 3,
        text: "We are the ones behind the Startup Bihar Portal —\nthe digital gateway empowering thousands of founders\nand shaping Bihar's entrepreneurial rise.",
        highlights: ["Startup Bihar Portal", "empowering thousands of founders", "entrepreneurial rise"],
        media: [
            { type: "image", url: "/Projects/StartupBihar1.png" },
            { type: "image", url: "/Projects/StartupBihar2.png" },
            { type: "image", url: "/Projects/StartupBihar3.png" },
        ],
    },
    {
        id: 4,
        text: "We engineered the Buddha Samyak Darshan Museum Ticketing System,\nseamlessly handling 2+ lakh visitors every month\nwith unmatched speed, reliability, and scale.",
        highlights: ["Buddha Samyak Darshan Museum", "2+ lakh visitors", "unmatched speed"],
        media: [
            { type: "image", url: "/Projects/BudhaSamyak1.png" },
            { type: "image", url: "/Projects/BudhaSamyak2.png" },
            { type: "image", url: "/Projects/BudhaSamyak3.png" },
        ],
    },
    {
        id: 5,
        text: "We built the Bihar Film and Bihar Heritage websites —\nwelcoming filmmakers, preserving culture, and showcasing the marvels of the state\nin modern digital form.",
        highlights: ["Bihar Film", "Bihar Heritage", "preserving culture", "modern digital form"],
        media: [
            { type: "image", url: "/Projects/Bihar State Film Development and Finance Corporation2.png" },
            { type: "image", url: "/Projects/BiharHeritage1.png" },
            { type: "image", url: "/Projects/BiharHeritage2.png" },
        ],
    },
    {
        id: 6,
        text: "We authenticate thousands of MMUY & Bihar Laghu Udyami Yojna beneficiary attendances across all districts —\nensuring secure verification, transparent monitoring,\nand real-time insights statewide.",
        highlights: ["MMUY", "Bihar Laghu Udyami Yojna", "secure verification", "transparent monitoring"],
        media: [
            { type: "image", url: "/Projects/MMUYScheme.png" },
            { type: "image", url: "/Projects/MMUYScheme2.png" },
            { type: "image", url: "/Projects/HelloUdyami2.png" },
        ],
    },
    {
        id: 7,
        text: "Our LITMAN system — Bihar's Litigation Management & Compliance Tracking platform —\nhelps departments manage and monitor court cases with precision,\nensuring no file is forgotten and compliance with court orders never slips.\nIts flagship implementation, the ViSha Portal,\nhas transformed how legal workflows operate across the state.",
        highlights: ["LITMAN system", "Litigation Management", "ViSha Portal", "transformed legal workflows"],
        media: [
            { type: "image", url: "/Projects/VidhiSakha.png" },
            { type: "image", url: "/Projects/VidhiSakha2.png" },
            { type: "image", url: "/Projects/VidhiSakha3.png" },
        ],
    },
    {
        id: 8,
        text: "We track Awas Yojna progress through GPS-accurate inspections and photo-verified audits,\nbringing accountability directly to the ground.",
        highlights: ["Awas Yojna", "GPS-accurate inspections", "accountability"],
        media: [
            { type: "image", url: "https://placehold.co/600x400/15803d/FFF?text=Awas+Yojna" },
            { type: "image", url: "https://placehold.co/600x400/16a34a/FFF?text=GPS+Inspections" },
            { type: "image", url: "https://placehold.co/600x400/22c55e/FFF?text=Audits" },
        ],
    },
    {
        id: 9,
        text: "We developed Bihar's first AI-powered government chatbot,\nand we are the design consultants behind the\nnew, modern Bihar State Government website.",
        highlights: ["AI-powered government chatbot", "design consultants", "Bihar State Government website"],
        media: [
            { type: "image", url: "https://placehold.co/600x400/0369a1/FFF?text=AI+Chatbot" },
            { type: "image", url: "https://placehold.co/600x400/0ea5e9/FFF?text=Modern+Website" },
            { type: "image", url: "https://placehold.co/600x400/38bdf8/FFF?text=Gov+Portal" },
        ],
    },
    {
        id: 10,
        text: "We captured Bihar's greatest monuments in 360° VR,\nbringing the state's heritage and architecture to virtual reality.",
        highlights: ["360° VR", "virtual reality", "heritage"],
        media: [
            { type: "image", url: "https://placehold.co/600x400/4c1d95/FFF?text=360+VR" },
            { type: "image", url: "https://placehold.co/600x400/5b21b6/FFF?text=Virtual+Tour" },
            { type: "image", url: "https://placehold.co/600x400/7c3aed/FFF?text=Monuments" },
        ],
    },
];

const ExpandedAboutUs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-advance every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % aboutData.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const renderText = (text, highlights) => {
        const lines = text.split('\n');
        return lines.map((line, i) => {
            let parts = [line];

            highlights.forEach(phrase => {
                const newParts = [];
                parts.forEach(part => {
                    if (typeof part !== 'string') {
                        newParts.push(part);
                        return;
                    }
                    const splitPart = part.split(phrase);
                    for (let j = 0; j < splitPart.length; j++) {
                        newParts.push(splitPart[j]);
                        if (j < splitPart.length - 1) {
                            newParts.push(
                                <motion.span
                                    key={`${i}-${j}`}
                                    className="font-bold text-gray-800"
                                    initial={{ opacity: 0.5, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: (i * 0.1) + (j * 0.05), duration: 0.4 }}
                                >
                                    {phrase}
                                </motion.span>
                            );
                        }
                    }
                });
                parts = newParts;
            });

            return (
                <motion.p
                    key={i}
                    className="mb-4 text-sm sm:text-base text-gray-500 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                >
                    {parts}
                </motion.p>
            );
        });
    };

    // Extract project name from highlights
    const getProjectName = (item) => {
        return item.highlights[0] || "Our Work";
    };

    return (
        <section className="relative bg-gray-50 h-screen flex items-center overflow-hidden">
            {/* Subtle texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(0 0 0 / 0.1) 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }} />
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center"
                    >
                        {/* Left Content */}
                        <div className="space-y-6">
                            {/* Header */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.7,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tighter text-gray-900 leading-tight"
                            >
                                {getProjectName(aboutData[activeIndex])}
                            </motion.h1>

                            {/* Paragraph Text - Horizontal */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.4,
                                    duration: 0.7,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl"
                            >
                                {renderText(
                                    aboutData[activeIndex].text,
                                    aboutData[activeIndex].highlights
                                )}
                            </motion.div>

                            {/* Bottom Meta */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.6,
                                    duration: 0.6,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="flex items-center justify-between pt-6 border-t border-gray-200"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-normal text-4xl text-gray-400">
                                        {String(activeIndex + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text-sm text-gray-500">/ {String(aboutData.length).padStart(2, '0')}</span>
                                </div>

                                {/* Progress Indicators */}
                                <div className="flex items-center gap-1.5">
                                    {aboutData.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveIndex(idx)}
                                            className="group relative"
                                            aria-label={`Go to project ${idx + 1}`}
                                        >
                                            <div
                                                className={`transition-all duration-300 ${idx === activeIndex
                                                    ? 'w-6 h-[2px] bg-black'
                                                    : 'w-1.5 h-[2px] bg-gray-400 group-hover:bg-gray-600'
                                                    }`}
                                            />
                                            {idx === activeIndex && (
                                                <motion.div
                                                    className="absolute top-0 left-0 h-[2px] bg-gray-600"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ duration: 10, ease: 'linear' }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Images - Compact Grid */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.8,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="relative h-[400px] lg:h-[500px]"
                        >
                            <div className="grid grid-cols-2 gap-3 h-full">
                                {aboutData[activeIndex].media.map((mediaItem, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            delay: 0.5 + (idx * 0.1),
                                            duration: 0.7,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                            transition: { duration: 0.3 }
                                        }}
                                        className={`relative overflow-hidden bg-gray-200 ${idx === 0 ? 'col-span-2 row-span-2' : ''
                                            }`}
                                        style={{
                                            border: '1px solid rgba(0,0,0,0.08)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                                        }}
                                    >
                                        {mediaItem.type === 'video' ? (
                                            <video
                                                src={mediaItem.url}
                                                autoPlay
                                                muted
                                                loop
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={mediaItem.url}
                                                alt={`Project visual ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                        {/* Subtle overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/3" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Decorative corner marks with animation */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                                className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-gray-300 pointer-events-none"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.95, duration: 0.5 }}
                                className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-gray-300 pointer-events-none"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.0, duration: 0.5 }}
                                className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-gray-300 pointer-events-none"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.05, duration: 0.5 }}
                                className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-gray-300 pointer-events-none"
                            />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ExpandedAboutUs;
