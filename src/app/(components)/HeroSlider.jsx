"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

const HeroSlider = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://next-store-ejp-backend.vercel.app/products")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full h-screen md:h-[95vh]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={2500}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full w-full">
        {Data.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">
              {/* Main Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-4000 ease-in-out"
                style={{
                  backgroundImage: `url(${slide.imageUrl})`,
                }}></div>
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8">
                <div className="flex flex-col-reverse md:flex-row gap-5 items-center w-full max-w-7xl mx-auto">
                  <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left items-center md:items-start">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fadeIn text-indigo-500 ">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-2xl mb-6 max-w-2xl drop-shadow-md animate-fadeIn delay-200 text-indigo-200">
                      {slide.shortDescription}
                    </p>
                    <Link
                      href={`/all-products/${slide._id}`}
                      className="w-fit bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-8 rounded-md transition-colors duration-200 text-center">
                      View Details
                    </Link>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="w-full max-w-[50vh] h-[50vh] relative rounded-lg overflow-hidden border-4 border-indigo-500 shadow-2xl">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover transition-transform duration-4000 ease-in-out"
                        sizes="(max-width: 768px) 100vw, 50vh"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-slide div.bg-cover {
          transform: scale(1.1);
          opacity: 0.8;
          transition: transform 4s ease-in-out, opacity 1.5s ease-in-out;
        }
        
        .swiper-slide-active div.bg-cover {
          transform: scale(1);
          opacity: 1;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
