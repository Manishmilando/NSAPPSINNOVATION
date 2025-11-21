import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import servicesData from '../data/servicesData.json';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data fetching
    const fetchServices = async () => {
      setLoading(true);
      try {
        // In real scenario, you would fetch from API
        // const response = await fetch('/api/services');
        // const data = await response.json();
        
        setServices(servicesData);
        setFilteredServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Filter services by category
    if (selectedCategory === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter(service => service.category === selectedCategory)
      );
    }
  }, [selectedCategory, services]);

  useEffect(() => {
    // Animate cards on scroll
    if (!loading && filteredServices.length > 0) {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, [loading, filteredServices]);

  const categories = ['all', ...new Set(services.map(s => s.category))];

  const handleServiceClick = (serviceId) => {
    navigate(`/projects/service/${serviceId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white text-black py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-gray-600 hover:text-black transition-colors flex items-center gap-2 mx-auto"
          >
            <span>←</span> Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professional services to bring your digital vision to life
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black border border-gray-300 hover:border-gray-400'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="service-card group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {service.featured && (
                  <div className="absolute top-4 right-4 bg-black text-white px-4 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-xs font-semibold text-black">
                    {service.deliveryTime}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gray-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm font-semibold group-hover:translate-x-2 transition-transform">
                  Learn More <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No services found in this category.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-black text-white rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your business goals
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-10 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
