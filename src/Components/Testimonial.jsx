import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";


const testimonials = [
  {
    id: 1,
    name: "Sri Pranav Kumar, IAS",
    role: "Secretary, Dept. of Home & Dept. Art & Culture, Govt. of Bihar",
    company: "(Former District Magistrate, Bhagalpur)",
    quote:
      "The applications developed by NS Apps Innovations LLP, including the Shravani Mela App and Samaksh App, were found to be effective in addressing their intended objectives. The Shravani Mela App facilitated convenience for pilgrims, while the Samaksh App contributed to improved school monitoring, resulting in a measurable increase in school opening punctuality to 96% within one year.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/gatishaktibihar.firebasestorage.app/o/biharfilm%2Fhome_secy.jpeg?alt=media&token=2f9b010e-0fed-4627-949d-a4779308a995",
    rating: 5,
  },
  {
    id: 2,
    name: "Sri Shekhar Anand, IAS",
    role: "DM & Collector, Shekhpura",
    company: "(Former DDC Rohtas)",
    quote:
      "Digital solutions developed under the leadership of Nishant Shekhar, such as the ASPIRE App and Kishanganj Hariyali App, demonstrated practical utility in administrative and field-level operations. The applications supported attendance monitoring, carbon footprint assessment, and environmentally focused initiatives, delivering positive and efficient outcomes.",
    image: "https://bsidc.in/images/Shekhar-Anand.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Sri Vaibhav Srivastava, IAS",
    role: "DM & Collector, Saran",
    company: "(Former Director, IPRD, Govt. of Bihar)",
    quote:
      "During Bihar Diwas 2025, Virtual Reality–based 3D video content was presented by NS Apps Innovations LLP using modern digital techniques. The work reflected effective use of immersive technology for public communication and demonstrated technical competence in content creation and presentation.",
    image: "/vaibhav sir.jpeg",
    rating: 5,
  },
  {
    id: 4,
    name: "Sri Deepak Kumar Mishra, IAS",
    role: "Municipal Commissioner",
    company: "Bihar Sharif (Nalanda)",
    quote:
      "Digital platforms developed by NS Apps Innovations LLP were utilised to support major sporting events in Nalanda district, including the Asia Women’s Hockey Championship 2024 and Khelo India Youth Games 2025. The applications assisted in live information dissemination, grievance handling, and accommodation coordination, contributing to smooth event management.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQECnJ4qGES5ng/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721880912111?e=1767830400&v=beta&t=clY3uxx2cJ1DmNDmy-a5uBeKL5I4ZdFhOqRBl-Nh0a0",
    rating: 5,
  },
];



const TestimonialCard = ({ t }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const maxLength = 150;
  const shouldTruncate = t.quote.length > maxLength;

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  return (
    <div className="group h-full bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col relative">
      <div className="absolute top-6 left-6 text-gray-100 group-hover:text-blue-50 transition-colors duration-300">
        <Quote className="w-10 h-10 md:w-12 md:h-12 fill-current opacity-90" />
      </div>

      <div className="flex-grow mb-8 pt-6 relative z-10">
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
          {isExpanded ? t.quote : `${t.quote.slice(0, maxLength)}${shouldTruncate ? "..." : ""}`}
        </p>
        {shouldTruncate && (
          <button
            onClick={toggleReadMore}
            className="text-gray-900 hover:text-gray-700 font-semibold text-xs mt-3 focus:outline-none inline-flex items-center"
          >
            {isExpanded ? "Show Less" : "Read More"}
            <span className="ml-1">{isExpanded ? "↑" : "→"}</span>
          </button>
        )}
      </div>

      <div className="absolute bottom-24 right-6 text-gray-100 group-hover:text-blue-50 transition-colors duration-300 rotate-180">
        <Quote className="w-10 h-10 md:w-12 md:h-12 fill-current opacity-90" />
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto relative z-10">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
          <img
            src={t.image}
            alt={t.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://ui-avatars.com/api/?name=" +
                t.name +
                "&background=random";
            }}
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-xs md:text-sm mb-1">
            {t.name}
          </h4>
          <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">
            {t.role}, {t.company}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialCarousel = () => {
  const swiperRef = useRef(null);

  return (
    <section className="bg-gray-50 py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-6 lg:px-8 xl:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-3 ">
              Testimonials
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Summarised from official appreciation and acknowledgements by government authorities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-gray-900 hover:border-gray-900 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 shadow-lg hover:shadow-xl border border-gray-900 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-gray-900 hover:border-gray-900"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-colors" />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          speed={800}
          watchSlidesProgress={false}
          watchSlidesVisibility={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 28,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="!pb-14 !pt-3"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="!h-auto !opacity-100">
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-slide {
          opacity: 1 !important;
        }
        
        .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
          width: 7px !important;
          height: 7px !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          background: #111827 !important;
          width: 28px !important;
          border-radius: 6px !important;
        }

        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;
