import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import productsData from "../data/products.json";

gsap.registerPlugin(ScrollTrigger);

const ProductSection = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const containerRef = useRef(null);

    // Use useLayoutEffect for GSAP to prevent FOUC and ensure DOM is ready
    React.useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal Scroll Animation
            const totalSections = productsData.length;

            const scrollTween = gsap.to(
                containerRef.current,
                {
                    xPercent: -100 * (totalSections - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: () => `+=${totalSections * 1500}`,
                        scrub: 1,
                        pin: true,
                        invalidateOnRefresh: true,
                    },
                }
            );

        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-gray-50 text-gray-900 overflow-hidden z-10">
            {/* Header Section */}
            <div className="absolute top-0 left-0 w-full z-20 p-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter uppercase text-gray-900">Our Products</h2>
                    <p className="text-sm text-gray-500 mt-1">Innovative Solutions</p>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div ref={triggerRef} className="h-screen w-full overflow-hidden relative">
                <div
                    ref={containerRef}
                    className="flex h-full w-[100vw]"
                >
                    {productsData.map((project, index) => (
                        <div
                            key={project.id}
                            className="w-[100vw] h-screen flex-shrink-0 flex items-center justify-center p-4 md:p-20 relative"
                        >
                            {/* Background Number - Subtle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-bold text-gray-200/40 pointer-events-none select-none z-0">
                                {index + 1}
                            </div>

                            {/* Content Wrapper */}
                            <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

                                {/* Left: Text Content */}
                                <div className="space-y-8 order-2 md:order-1">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full text-xs tracking-widest uppercase text-gray-500 bg-white/50 backdrop-blur-sm">
                                            <span className="w-2 h-2 rounded-full bg-black"></span>
                                            {project.category}
                                        </div>
                                        <h3 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900">
                                            {project.title}
                                        </h3>
                                        <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                                            {project.desc}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {project.tags.map((tag, i) => (
                                            <span key={`${tag}-${i}`} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-6 pt-4">
                                        <Link
                                            to={`/product/${project.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                        >
                                            View Details
                                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                                        </Link>
                                        <button className="p-4 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-gray-700">
                                            <Github className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Right: Image Card */}
                                <div className="order-1 md:order-2 relative group perspective-1000">
                                    <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-[1.02] bg-white">
                                        <img
                                            src={project.img}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4 text-sm font-mono text-gray-400">
                <span>SCROLL TO EXPLORE PRODUCTS</span>
                <div className="w-12 h-[1px] bg-gray-400" />
            </div>
        </section>
    );
};

export default ProductSection;
