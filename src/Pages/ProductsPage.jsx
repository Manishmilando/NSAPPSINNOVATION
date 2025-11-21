import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import productsData from '../data/productsData.json';

gsap.registerPlugin(ScrollTrigger);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data fetching
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // In real scenario, you would fetch from API
        // const response = await fetch('/api/products');
        // const data = await response.json();
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products by category
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    // Animate cards on scroll
    if (!loading && filteredProducts.length > 0) {
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, [loading, filteredProducts]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleProductClick = (productId) => {
    navigate(`/projects/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
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
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Innovative software solutions designed to solve real-world problems
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

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-black text-white px-4 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <span className="text-xs text-gray-400">{product.year}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gray-700 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm font-semibold group-hover:translate-x-2 transition-transform">
                  View Details <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found in this category.</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-gray-50 rounded-2xl">
            <h3 className="text-4xl font-bold mb-2">{products.length}+</h3>
            <p className="text-gray-600">Total Products</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-2xl">
            <h3 className="text-4xl font-bold mb-2">{categories.length - 1}</h3>
            <p className="text-gray-600">Categories</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-2xl">
            <h3 className="text-4xl font-bold mb-2">100%</h3>
            <p className="text-gray-600">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
