import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Spline";
import AboutUs from "./Components/AboutUs";
import TestimonialCarousel from "./Components/Testimonial";
import Footer from "./Components/Footer";
import SplashScreen from "./Components/SplashScreen";
import Team from "./Components/Team";
import GetInTouchSection from "./Components/GetInTouchSection";
import ContactUs from "./Components/ContactUs";
import ServicesSection from "./Components/ServicesSection";
import ProductSection from "./Components/ProductSection";
import ExpandedAboutUs from "./Components/ExpandedAboutUs";
import ProductDetail from "./Components/ProductDetail";
import ServiceDetail from "./Components/ServiceDetail";
import CursorDot from "./Components/Cursor";
import AchievementSlider from "./Components/AchievementSlider";
import Gallery from "./Components/Gallery";
import Leaderboard from "./Components/Leaderboard";
import LeaderboardDisplay from "./Components/LeaderboardDisplay";
import EventPopup from "./Components/EventPopup";
// import VideoSection from "./Components/Videosection";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if we're NOT on the home page with a hash
    if (!pathname.includes("#")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("splashShown");
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("splashShown", "true");
  };

  return (
    <Router>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

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
                  <div className="relative w-full overflow-hidden">
                    <EventPopup />
                    <Hero />
                  </div>
                  {/* <VideoSection /> */}
                  <CursorDot />
                  <AboutUs />
                  <ServicesSection />
                  <AchievementSlider />
                  <ProductSection />
                  <TestimonialCarousel />
                  <GetInTouchSection />
                  <Team />
                  <ContactUs />
                  <Footer />
                </>
              }
            />

            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/expanded-about" element={<ExpandedAboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/bihardiwas" element={<LeaderboardDisplay />} />
            <Route path="/admin-leaderboard" element={<Leaderboard />} />

          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
