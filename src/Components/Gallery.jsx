import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const galleryItems = [
        {
            type: "image",
            src: "/gallery/biharFilmCityMeeting.jpeg",
            span: "col-span-1 md:col-span-2 row-span-2",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.01.59.jpeg",
            span: "col-span-1 md:col-span-1 row-span-1",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.01.jpeg",
            span: "col-span-1 md:col-span-1 row-span-1",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/rubymam.jpeg",
            span: "col-span-1 md:col-span-1 row-span-2",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/rubymam2.jpeg",
            span: "col-span-1 md:col-span-2 row-span-1",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.07.jpeg",
            span: "col-span-1 md:col-span-1 row-span-1",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.09.jpeg",
            span: "col-span-1 md:col-span-2 row-span-2",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.10.jpeg",
            span: "col-span-1 md:col-span-1 row-span-1",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.12.jpeg",
            span: "col-span-1 md:col-span-1 row-span-1",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.13.jpeg",
            span: "col-span-1 md:col-span-2 row-span-1",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.04.jpeg",
            span: "col-span-1 md:col-span-1 row-span-2",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.15.jpeg",
            span: "col-span-1 md:col-span-2 row-span-2",
            date: "Dec 12, 2024",
        },
        {
            type: "image",
            src: "/gallery/WhatsApp Image 2025-12-12 at 17.02.17.jpeg",
            span: "col-span-1 md:col-span-1 row-span-1",
            date: "Dec 12, 2024",
        },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-purple-500/30 selection:text-black">
            <div className="container mx-auto px-4 pt-40 pb-12">
                {/* Header - Left Aligned */}
                <div className="mb-20 text-left">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 mb-4">
                        Our Gallery
                    </h1>
                    <p className="text-gray-400 max-w-xl text-lg font-medium">
                        A visual journey through our cinema and innovations.
                    </p>
                </div>

                {/* Bento Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6 md:grid-flow-row-dense"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                >
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, scale: 0.9, y: 20 },
                                show: { opacity: 1, scale: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.01 }}
                            className={`relative group rounded-3xl overflow-hidden ${item.span} cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100`}
                            onClick={() => setSelectedImage(item)}
                        >
                            <img
                                src={item.src}
                                alt="Gallery Item"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Top Right Date */}
                            <div className="absolute top-4 right-4 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0">
                                <div className="bg-white/40 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/40 shadow-sm text-[10px] font-bold text-gray-800">
                                    {item.date}
                                </div>
                            </div>

                            {/* Minimal Text Section - Just text, no extra divs */}
                            <div className="absolute bottom-6 left-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                <h3 className="text-white text-lg font-bold drop-shadow-md mb-1 uppercase tracking-tight">
                                    {item.src.split('/').pop().split('.')[0].replace(/%20/g, ' ')}
                                </h3>
                                <p className="text-white/90 text-xs font-medium drop-shadow-md line-clamp-2 leading-relaxed">
                                    Capturing moments of innovation and cinematic excellence at NS Apps Innovations.
                                </p>
                            </div>

                            {/* Subtle Dark Gradient for Text Visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Modal / Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[600] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={24} />
                            </button>

                            <img
                                src={selectedImage.src}
                                alt="Gallery Preview"
                                className="max-h-[85vh] w-auto object-contain rounded-2xl shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
