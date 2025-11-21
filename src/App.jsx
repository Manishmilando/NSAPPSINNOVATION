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
import Projects from "./Components/ProjectSection";
import ExploreProjects from './Pages/ExploreProjects';
import ProductsPage from './Pages/ProductsPage';
import ServicesPage from './Pages/ServicesPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if we're NOT on the home page with a hash
    if (!pathname.includes('#')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

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
                  <Projects />
                  <Team />
                  <GetInTouchSection />
                  <ContactUs />
                  <TestimonialCarousel />
                  <Footer />
                </>
              }
            />

            {/* Projects Routes - MUST be before other routes */}
            <Route path="/projects/explore" element={<ExploreProjects />} />
            <Route path="/projects/products" element={<ProductsPage />} />
            <Route path="/projects/services" element={<ServicesPage />} />

            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
