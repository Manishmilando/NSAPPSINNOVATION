import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import "swiper/css/pagination";


import "../App.css"; // Assuming you have some global styles


const testimonials = [
  {
    name: 'Sri Pranav Kumar, IAS',
    role: 'Owner of Aburaya Fried Chicken',
    quote:
      '“The best part is your customer service. It’s so quick and friendly; it just made my life easier. If somebody asks me, I recommend Owner.”',
    image: '/Pranav.png',
    sales: '+$300,000',
    savings: '$100,000',
  },
  {
    name: ' Sri Vaibhav Srivastava, IAS',
    role: 'Founder of Bihar Eats',
    quote:
      '“This platform boosted our outreach and streamlined our delivery channels in the best possible way!”',
    image: '/vaibhav.png',
    sales: '+$200,000',
    savings: '$80,000',
  },
  {
    name: 'Sri Pranav Kumar, IAS',
    role: 'Owner of Aburaya Fried Chicken',
    quote:
      '“The best part is your customer service. It’s so quick and friendly; it just made my life easier. If somebody asks me, I recommend Owner.”',
    image: '/Pranav.png',
    sales: '+$300,000',
    savings: '$100,000',
  },
  {
    name: 'Sri,Vaibhav Srivastava, IAS',
    role: 'Founder of Bihar Eats',
    quote:
      '“This platform boosted our outreach and streamlined our delivery channels in the best possible way!”',
    image: '/vaibhav.png',
    sales: '+$200,000',
    savings: '$80,000',
  },
  
];



const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="bg-gray-100 py-16 relative overflow-x-hidden">
      <Swiper
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        centeredSlides
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
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1e1b4b] rounded-full transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[35] z-0" />

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
                <p className="text-2xl md:text-3xl font-semibold text-gray-900 group-hover:text-white mb-6 leading-snug transition-colors duration-300">
                  {t.quote}
                </p>
                <div className="flex flex-wrap items-center gap-8 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-black group-hover:text-white transition-colors duration-300">{t.sales}</div>
                    <div className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">Online sales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-black group-hover:text-white transition-colors duration-300">{t.savings}</div>
                    <div className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">Delivery fees saved</div>
                  </div>
                </div>
                <button className="bg-gray-100 text-gray-900 group-hover:bg-white group-hover:text-[#1e1b4b] font-medium px-5 py-3 rounded-xl text-sm w-fit transition-all duration-300 shadow-sm">
                  See {t.name.split(' ')[0]}'s story →
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCarousel;


