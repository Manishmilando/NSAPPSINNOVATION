import React, { useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Github, Globe, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import productsData from '../data/products.json';

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
    const { id } = useParams();
    const product = productsData.find(p => p.id === id);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Smooth Fade Up for Text
            tl.from(".animate-text", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            })
                .from(".animate-card", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.6")
                .from(".animate-image", {
                    scale: 0.95,
                    opacity: 0,
                    duration: 1.2,
                    ease: "expo.out"
                }, "-=0.8");

            // Parallax Effect
            gsap.utils.toArray('.parallax-image').forEach(img => {
                gsap.to(img, {
                    yPercent: -15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!product) return <div className="min-h-screen flex items-center justify-center text-xl font-medium text-gray-500">Product not found</div>;

    // Helper to determine bento grid classes based on index
    const getBentoClass = (index) => {
        // Pattern: Large, Small, Small, Wide, Small, Small...
        const pattern = [
            "md:col-span-2 md:row-span-2", // 0: Large
            "md:col-span-1 md:row-span-1", // 1: Small
            "md:col-span-1 md:row-span-1", // 2: Small
            "md:col-span-2 md:row-span-1", // 3: Wide
            "md:col-span-1 md:row-span-2", // 4: Tall
        ];
        return pattern[index % pattern.length] || "md:col-span-1 md:row-span-1";
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white relative overflow-hidden">

            {/* Linear Grid Background */}
            <div className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5
                }}
            />

            {/* Header Info */}
            <header className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 mb-6 animate-text shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            {product.category}
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-[0.9] animate-text text-gray-900">
                            {product.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl animate-text">
                            {product.desc}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 min-w-[240px] animate-text">
                        <div className="p-6 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Client</div>
                            <div className="text-lg font-bold text-gray-900">{product.client}</div>
                        </div>
                        <div className="p-6 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Date</div>
                            <div className="text-lg font-bold text-gray-900">{product.date}</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Image */}
            <section className="px-4 md:px-6 mb-32 relative z-10">
                <div className="max-w-[95vw] mx-auto h-[60vh] md:h-[85vh] rounded-[2.5rem] overflow-hidden shadow-2xl animate-image relative group">
                    <img
                        src={product.img}
                        alt={product.title}
                        className="w-full h-full object-cover parallax-image scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </section>

            {/* Content & Gallery */}
            <section className="max-w-7xl mx-auto px-6 pb-40 relative z-10">
                <div className="grid md:grid-cols-[1fr_2fr] gap-20">

                    {/* Sticky Sidebar */}
                    <div className="space-y-12 h-fit md:sticky md:top-32 animate-text">
                        <div className="p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag, i) => (
                                    <span key={i} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button className="w-full group flex items-center justify-between px-8 py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                <span>Visit Live Site</span>
                                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                            </button>
                            <button className="w-full group flex items-center justify-between px-8 py-5 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
                                <span>View Source</span>
                                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>

                    {/* Description & Gallery */}
                    <div className="space-y-24 animate-text">
                        <div className="prose prose-lg prose-gray max-w-none">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-gray-900"></span>
                                Project Overview
                            </h2>
                            <p className="text-xl leading-relaxed text-gray-600 font-light">
                                {product.fullDescription}
                            </p>
                        </div>

                        <div className="space-y-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-gray-900"></span>
                                Visual Assets
                            </h2>

                            {/* Bento Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                                {product.images && product.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group animate-card relative ${getBentoClass(i)}`}
                                    >
                                        <div className="w-full h-full overflow-hidden">
                                            <img
                                                src={img}
                                                alt={`Gallery ${i + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

                                            {/* Hover Overlay Info */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent text-white">
                                                <span className="text-sm font-bold tracking-wider uppercase">Asset 0{i + 1}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ProductDetail;
