import React, { useRef, useLayoutEffect, useState } from "react";
import { ArrowUpRight, Github, Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import productsData from "../data/products.json";

gsap.registerPlugin(ScrollTrigger);

// Dummy products to ensure we have at least 5 cards initially
const initialDummyProducts = [
    { id: 'd1', title: 'Neon Nexus', category: 'Cyberpunk UI', desc: 'Futuristic dashboard interface.', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', tags: ['UI', 'React'] }
];

// Additional products shown when "View More" is clicked
const moreDummyProducts = [
    { id: 'd2', title: 'Zenith', category: 'Wellness App', desc: 'Meditation and focus tracking.', img: 'https://images.unsplash.com/photo-1515023115689-589c33041697?auto=format&fit=crop&w=800&q=80', tags: ['Mobile', 'Flutter'] },
    { id: 'd3', title: 'Apex', category: 'Fitness Tracker', desc: 'High performance workout analytics.', img: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80', tags: ['Data', 'D3.js'] },
    { id: 'd4', title: 'Echo', category: 'Audio Stream', desc: 'Lossless audio streaming platform.', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', tags: ['Audio', 'WebRTC'] },
    { id: 'd5', title: 'Nova', category: 'Space Exploration', desc: 'Interactive solar system map.', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', tags: ['WebGL', 'Three.js'] }
];

const ProductSection = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const containerRef = useRef(null);
    const [favorites, setFavorites] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".product-card-item");
            // Calculate total width of all cards + gaps
            // We can estimate or measure. Let's use a scroll based on container width
            const totalWidth = containerRef.current.scrollWidth;
            const windowWidth = window.innerWidth;

            // Only scroll if content is wider than screen
            if (totalWidth > windowWidth) {
                gsap.to(containerRef.current, {
                    x: () => -(containerRef.current.scrollWidth - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        scrub: 1,
                        // Adjust duration based on number of cards
                        end: () => "+=" + (containerRef.current.scrollWidth - window.innerWidth),
                        invalidateOnRefresh: true,
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isExpanded, productsData]); // Re-run when expanded

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    // Combine data based on state
    // Initial: productsData + initialDummyProducts (to make 5)
    // Expanded: productsData + initialDummyProducts + moreDummyProducts
    const visibleProducts = isExpanded
        ? [...productsData, ...initialDummyProducts, ...moreDummyProducts]
        : [...productsData, ...initialDummyProducts];

    // Extended offsets for more cards
    const cardOffsets = ['mt-0', 'mt-8', 'mt-4', 'mt-12', 'mt-2', 'mt-10', 'mt-6', 'mt-14', 'mt-4', 'mt-8'];

    return (
        <section ref={sectionRef} className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-gray-900 overflow-hidden h-screen flex flex-col justify-center ">
            {/* Header Section - Fixed */}
            <div className="absolute top-0 left-0 w-full z-20 p-4 md:p-6 pointer-events-none">
                <div className="max-w-2xl">
                    <div className="inline-block pl-10">
                        <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-wide text-gray-800 border-b-2 border-gray-800 inline-block pb-1">
                            Projects
                        </h2>
                        
                    </div>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div ref={triggerRef} className="w-full flex items-center pl-8 md:pl-12 pt-16">
                <div ref={containerRef} className="flex flex-nowrap gap-8 items-center">
                    {visibleProducts.map((project, index) => (
                        <div
                            key={project.id}
                            className={`product-card-item w-[280px] md:w-[320px] flex-shrink-0 ${cardOffsets[index % cardOffsets.length]}`}
                        >
                            {/* Card Container */}
                            <div className="w-full relative">
                                {/* Main Card */}
                                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:-translate-y-2">
                                    {/* Image Container */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img
                                            src={project.img}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                        />
                                        {/* Image Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

                                        {/* Category Badge on Image */}
                                        <div className="absolute top-3 left-3">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] tracking-wide uppercase font-bold text-gray-800 shadow-lg">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                                                {project.category}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-4 space-y-2.5">
                                        {/* Title */}
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-1">
                                                {project.title}
                                            </h3>
                                            <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide font-medium">
                                                {project.category}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                            {project.desc}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {project.tags.slice(0, 2).map((tag, i) => (
                                                <span
                                                    key={`${tag}-${i}`}
                                                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[10px] font-medium hover:bg-gray-200 transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 2 && (
                                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[10px] font-medium">
                                                    +{project.tags.length - 2}
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 pt-2">
                                            <Link
                                                to={`/product/${project.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex-1 flex items-center justify-center gap-1 px-3 py-2.5 bg-gray-900 text-white rounded-xl font-semibold text-xs hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                            >
                                                Explore
                                                <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                                            </Link>
                                            <button
                                                onClick={() => toggleFavorite(project.id)}
                                                className={`p-2.5 border-2 rounded-xl transition-all ${favorites.includes(project.id)
                                                    ? 'bg-red-50 border-red-300 text-red-500'
                                                    : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500'
                                                    }`}
                                            >
                                                <Heart
                                                    className="w-3.5 h-3.5"
                                                    fill={favorites.includes(project.id) ? 'currentColor' : 'none'}
                                                />
                                            </button>
                                            <button className="p-2.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700">
                                                <Github className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Number Indicator */}
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-3xl font-black text-gray-300/40">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* View More Button Card */}
                    {!isExpanded && (
                        <div className="product-card-item w-[300px] md:w-[350px] flex-shrink-0 h-[500px] flex items-center justify-center">
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="group flex flex-col items-center gap-4 p-8 rounded-full hover:bg-gray-200/50 transition-all duration-300"
                            >
                                <div className="w-20 h-20 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                                    <Plus className="w-8 h-8" />
                                </div>
                                <span className="text-lg font-bold text-gray-900 tracking-tight uppercase">View More Works</span>
                            </button>
                        </div>
                    )}

                    {/* Spacer for end of scroll */}
                    <div className="w-[10vw] flex-shrink-0"></div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
