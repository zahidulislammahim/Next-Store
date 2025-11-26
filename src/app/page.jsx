"use client";

import HeroSlider from "./(components)/HeroSlider";
import ProtectRoute from "./(components)/ProtectRoute";
import Loading from "./(components)/Loading";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios("http://localhost:5000/recent-products").then((data) =>
      setData(data.data)
    );
  }, []);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
 const testimonials = [
  {
    id: 1,
    name: "MD Amdad Islam",
    avatar: "https://avatars.githubusercontent.com/u/195456266?v=4",
    text: "I found the exact product I was looking for through this website. The quality is excellent and the service was super fast. Really impressed!",
    rating: 5,
    role: "Customer",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "MD Zahidul Islam",
    avatar: "https://avatars.githubusercontent.com/u/92626624?v=4",
    text: "I upload my products here and they sell very quickly. The dashboard is easy to use and managing orders is simple and smooth.",
    rating: 5,
    role: "Seller",
    date: "2024-01-20",
  },
  {
    id: 3,
    name: "farey",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWnNIT08U5GfYeNE_LktWGiRk7FnWcllw98g&s",
    text: "Delivery was right on time and the packaging was great. The support team was very helpful. It's a great platform for selling products.",
    rating: 5,
    role: "Seller",
    date: "2024-01-25",
  }
];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!user) {
      const t = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(t);
    }
  }, [loading, user]);

  if (!user) {
    if (loading) {
      return <Loading></Loading>;
    }
  }
  return (
    <div className="-mt-2">
      <HeroSlider></HeroSlider>

      <div className="w-full bg-linear-to-br from-blue-20 to-indigo-50 py-5 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center max-w-8/12 mx-auto mb-10 ">
        <div className="bg-white  rounded-xl p-6 shadow-lg hover:shadow-2xl">
          <div className="text-3xl font-bold text-blue-600  mb-2">1500+</div>
          <div className="text-gray-600 ">Happy Customers</div>
        </div>
        <div className="bg-white  rounded-xl p-6 shadow-lg hover:shadow-2xl">
          <div className="text-3xl font-bold text-green-600  mb-2">10K+</div>
          <div className="text-gray-600 ">Products Sold</div>
        </div>
        <div className="bg-white  rounded-xl p-6 shadow-lg hover:shadow-2xl ">
          <div className="text-3xl font-bold text-purple-600  mb-2">95%</div>
          <div className="text-gray-600 ">Satisfaction Rate</div>
        </div>
      </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center mb-8 mt-5">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Recent Added <span className="text-indigo-600">Products</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-4">
            Check out the newest products added to our store!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
          {Data.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              {/* Image */}
              <div className="relative h-80 w-full bg-gray-200 overflow-hidden">
                <Image
                  src={item.imageUrl || "/placeholder.png"}
                  alt={item.title || "Product Image"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Category */}
                <span className="inline-flex items-center px-2.5 py-0.5 w-fit rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                  {item.category === "Other"
                    ? item.otherCategory
                    : item.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                {/* Short Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.shortDescription}
                </p>

                {/* Price */}
                <span className="text-2xl font-bold text-gray-900 mb-4">
                  ${item.price}
                </span>

                {/* Optional Meta */}
                {item.meta && (
                  <span className="text-sm text-green-600 font-medium mb-4">
                    {item.meta}
                  </span>
                )}

                {/* View Details Button */}
                <Link
                  href={`/all-products/${item._id}`}
                  className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <section className="py-20 bg-linear-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                What Our Users Say
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Real feedback from people who used our platform to buy and sell
                products.
              </p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-3 gap-10 grid-rows-1">
              {testimonials.map((t, index) => (
                <div
                  key={t.id}
                  className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl ${
                    index === activeTestimonial
                      ? "border-2 border-blue-500 scale-105"
                      : ""
                  }`}>
                  <div className="flex mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>


                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {t.text}
                  </p>


                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full  flex items-center justify-center text-white font-bold text-xl mr-4">
                      <Image
                        src={t.avatar || "/images/default-avatar.png"}
                        alt={t.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {t.name}
                        </h4>
                        <p> {t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="lg:hidden">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">

                <div className="flex justify-center mb-5">
                  {[...Array(testimonials[activeTestimonial].rating)].map(
                    (_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )
                  )}
                </div>


                <p className="text-gray-700 text-center text-lg mb-6 leading-relaxed">
                  {testimonials[activeTestimonial].text}
                </p>


                <div className="flex items-center justify-center mb-6">
                  <div className="w-14 h-14 rounded-full  flex items-center justify-center text-white font-bold text-xl mr-3">
                    <Image
                      src={
                        testimonials[activeTestimonial].avatar ||
                        "/images/default-avatar.png"
                      }
                      alt={testimonials[activeTestimonial].name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p> {testimonials[activeTestimonial].role}</p>
                  </div>
                </div>

   
                <div className="flex justify-center items-center space-x-4 mt-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-gray-200  hover:bg-gray-300  transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* Indicators */}
                  <div className="flex space-x-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`w-3 h-3 rounded-full transition ${
                          i === activeTestimonial
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-gray-200  hover:bg-gray-300  transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </section>
      </div>
    </div>
  );
}
