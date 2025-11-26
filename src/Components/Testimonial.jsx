import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import "swiper/css/pagination";


import "../App.css"; // Assuming you have some global styles


const testimonials = [
  {
    id: 1,
    name: 'Sri Pranav Kumar, IAS',

    company: 'Aburaya Fried Chicken',
    quote:
      "The best part is your customer service. It's so quick and friendly; it just made my life easier. If somebody asks me, I definitely recommend NS Apps Innovations.",
    image: '/Pranav.png',
    rating: 5, // optional
    date: '2025-09-12' // optional
  },
  {
    id: 2,
    name: 'Sri Vaibhav Srivastava, IAS',

    company: 'Bihar Eats',
    quote:
      "This platform boosted our outreach and streamlined our delivery channels in the best possible way!",
    image: '/vaibhav.png',
    rating: 5,
    date: '2025-10-05'
  },
  {
    id: 3,
    name: 'Sri Pranav Kumar, IAS',

    company: 'Aburaya Fried Chicken',
    quote:
      "The best part is your customer service. It's so quick and friendly; it just made my life easier. If somebody asks me, I definitely recommend NS Apps Innovations.",
    image: '/Pranav.png',
    rating: 5, // optional
    date: '2025-09-12' // optional
  },
  {
    id: 4,
    name: 'Sri Vaibhav Srivastava, IAS',

    company: 'Bihar Eats',
    quote:
      "This platform boosted our outreach and streamlined our delivery channels in the best possible way!",
    image: '/vaibhav.png',
    rating: 5,
    date: '2025-10-05'
  },
];




const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="bg-gray-100 py-16 relative overflow-x-hidden">
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        spaceBetween={30}

        slidesPerView={1.5}
        className="w-screen px-4"
        speed={500}
        breakpoints={{
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 1.5 },
        }}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {testimonials.map((t, i) => (
          <SwiperSlide
            key={i}
            className={`transition-opacity duration-500 ${i === activeIndex ? "opacity-100" : "opacity-50"
              }`}
          >
            <div
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col md:flex-row w-full relative isolate transition-all duration-500 hover:shadow-2xl"
            >
              {/* Blue Background Hover Effect */}
              <div className="absolute -top-10 -left-40 w-[30rem] h-[30rem] bg-[#1e1b4b] rounded-full transition-transform duration-1000 group-hover:duration-[5000ms] ease-in-out group-hover:scale-[35] z-0" />

              {/* Image Section */}
              <div className="relative w-full md:w-[400px] h-[400px] z-10 flex-shrink-0">
                <div className="relative h-full w-full">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-[500px] w-full object-cover rounded-3xl md:rounded-l-3xl md:rounded-r-none "
                  />
                  {/* Removed dark overlay, added text container */}
                  <div className="absolute bottom-6 left-6 text-white z-20">
                    <h3 className="text-lg font-semibold group-hover:text-white transition-colors duration-300">{t.name}</h3>
                    <p className="text-sm text-gray-200 group-hover:text-gray-300 transition-colors duration-300">{t.role}</p>
                  </div>
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between z-10 relative">
                <p className="text-2xl md:text-3xl font-semibold text-gray-900 group-hover:text-white mb-6 leading-snug transition-colors duration-300 group-hover:duration-[3000ms]">
                  {t.quote}
                </p>


              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCarousel;


