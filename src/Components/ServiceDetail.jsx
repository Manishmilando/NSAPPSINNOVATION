import React, { useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowUpRight, CheckCircle, Terminal } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import servicesData from '../data/services.json';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = () => {
    const { id } = useParams();
    const service = servicesData.find(s => s.id === id);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

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

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!service) return <div className="min-h-screen flex items-center justify-center text-xl font-medium text-gray-500">Service not found</div>;

    // Helper to determine bento grid classes based on index
    const getBentoClass = (index) => {
        const pattern = [
            "md:col-span-2 md:row-span-2",
            "md:col-span-1 md:row-span-1",
            "md:col-span-1 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-1 md:row-span-2",
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

            {/* Header */}
            <header className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 mb-6 animate-text shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Service ID: {service.id}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-[0.9] animate-text text-gray-900">
                        {service.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed animate-text max-w-3xl">
                        {service.desc}
                    </p>
                </div>
            </header>

            {/* Main Image */}
            <section className="px-4 md:px-6 mb-32 relative z-10">
                <div className="max-w-[95vw] mx-auto h-[50vh] md:h-[75vh] rounded-[2.5rem] overflow-hidden shadow-2xl animate-image relative group">
                    <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-6 pb-40 relative z-10">
                <div className="grid md:grid-cols-[1fr_2fr] gap-20">

                    {/* Sidebar */}
                    <div className="space-y-12 h-fit md:sticky md:top-32 animate-text">
                        <div className="p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold mb-6 text-gray-900 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                                Deliverables
                            </h3>
                            <ul className="space-y-4">
                                {service.tags && service.tags.map((tag, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700 group">
                                        <div className="mt-0.5 p-1 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            <CheckCircle size={14} />
                                        </div>
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="w-full group flex items-center justify-between px-8 py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            <span>Start Project</span>
                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Main Info */}
                    <div className="space-y-24 animate-text">
                        <div className="prose prose-lg prose-gray max-w-none">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-gray-900"></span>
                                Service Overview
                            </h2>
                            <p className="text-xl leading-relaxed text-gray-600 font-light">
                                {service.fullDescription}
                            </p>
                        </div>

                        {/* Case Studies / Images */}
                        <div className="space-y-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-gray-900"></span>
                                Case Studies
                            </h2>

                            {/* Bento Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                                {service.images && service.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group animate-card relative ${getBentoClass(i)}`}
                                    >
                                        <div className="w-full h-full overflow-hidden">
                                            <img
                                                src={img}
                                                alt={`Case Study ${i + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

                                            {/* Hover Overlay Info */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent text-white">
                                                <span className="text-sm font-bold tracking-wider uppercase">Case 0{i + 1}</span>
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

export default ServiceDetail;
