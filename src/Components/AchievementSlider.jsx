import React from "react";
import { motion } from "framer-motion";

const achievements = [
  "28+ Government & Public Sector Digital Projects",
  "Used by District Administrations Across Bihar",
  "Platforms Supporting 2+ Lakh Monthly Users",
  "State-Level Event & Ticketing Systems Deployed",
  "Attendance & Monitoring Systems Across Districts",
  "Official Portals for Startups, Culture & Sports",
  "VR & Immersive Media for Public Outreach",
  "Designed for Scale, Security & Governance"
];

const AchievementSlider = () => {
    return (
        <section className="py-8 bg-white overflow-hidden border-t border-gray-50">
            <div className="flex">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex whitespace-nowrap"
                >
                    {/* Duplicate content enough times to ensure smooth loop on large screens */}
                    {[...achievements, ...achievements, ...achievements, ...achievements].map((text, index) => (
                        <div key={index} className="flex items-center mx-3">
                            <div className="flex items-center px-5 py-2.5 bg-gray-50 rounded-full border border-gray-100">
                                <div className="w-2 h-2 rounded-full bg-indigo-400/80 mr-3"></div>
                                <span className="text-sm md:text-base font-medium text-gray-600 tracking-tight">
                                    {text}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AchievementSlider;