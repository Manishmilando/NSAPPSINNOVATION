import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Spline";
import AboutUs from "./Components/AboutUs";
import TestimonialCarousel from "./Components/Testimonial";
import Footer from "./Components/Footer";
import SplashScreen from "./Components/SplashScreen";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Team from "./Components/Team";
import GetInTouchSection from "./Components/GetInTouchSection";
import ContactUs from "./Components/ContactUs";
import ServicesSection from "./Components/ServicesSection";
import ProductSection from "./Components/ProductSection";
import ServiceSection from "./Components/ServiceSection";
import ProductDetail from "./Components/ProductDetail";
import ServiceDetail from "./Components/ServiceDetail";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if we're NOT on the home page with a hash
    if (!pathname.includes('#')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {!showSplash && (
        <>
          <ScrollToTop />
          <Navbar hideLogo={false} />
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <AboutUs />
                  <ServicesSection />
                  <ProductSection />
                  <ServiceSection />
                  <Team />
                  <GetInTouchSection />
                  <ContactUs />
                  <TestimonialCarousel />
                  <Footer />
                </>
              }
            />



            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
