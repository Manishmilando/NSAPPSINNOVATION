import React, { useEffect } from 'react';
import { useSearchParams, Navigate, useLocation } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import ServicesPage from './ServicesPage';

const ExploreProjects = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const type = searchParams.get('type');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('ExploreProjects mounted:', { type, location });
  }, [type, location]);

  // Render appropriate component based on type
  if (type === 'product') {
    return <ProductsPage />;
  } else if (type === 'service') {
    return <ServicesPage />;
  }

  // Invalid type, redirect to products
  return <Navigate to="/projects/explore?type=product" replace />;
};

export default ExploreProjects;
