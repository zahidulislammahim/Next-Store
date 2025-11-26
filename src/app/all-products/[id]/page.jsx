"use client";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import BackButton from "@/app/(components)/BackButton";
import { useParams } from "next/navigation";
import axios from "axios";
export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-linear-to-br from-gray-50 to-indigo-50">
      <main className="flex w-full flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-4xl flex-col gap-6">
          {/* Back Button */}
          <div className="flex justify-between items-center">
            <BackButton></BackButton>
            <div className="flex gap-4">
             
              <div className="flex items-center gap-1 bg-indigo-100 py-2 px-3 rounded-lg ">
                <FaClock className="text-indigo-500" />
                {product?.createdTime}
              </div>
              <div className="flex items-center gap-1 bg-indigo-100 py-2 px-3 rounded-lg ">
                <FaCalendarAlt className="text-indigo-500" />
                {product?.createdDate}
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-xl  shadow-2xl">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end min-h-100 sm:min-h-200"
              alt="Abstract gradient waves in blue and purple hues"
              style={{
                backgroundImage:
                  `url(${product?.imageUrl})`,
              }}></div>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4 ">
                <h1 className="text-3xl sm:text-4xl font-black tracking-[-0.033em] ">
                  {product?.title}
                </h1>
              </div>


              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-indigo-500  pt-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <p className="   font-semibold px-4 bg-indigo-400 rounded-lg py-1 text-center text-white">
                    Price
                  </p>
                  <p className=" text-base font-medium bg-indigo-50 px-5 rounded-lg py-1 text-center">
                    ${product?.price}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="  font-semibold px-4 bg-indigo-400 rounded-lg py-1 text-center text-white">
                    Category
                  </p>
                  <p className="text-base font-medium bg-indigo-50  px-5 rounded-lg py-1 text-center">
                    {product?.category === "Other" ? (product?.otherCategory) : (product?.category)}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="  font-semibold px-4 bg-indigo-400 rounded-lg py-1 text-center text-white">
                    Date Created
                  </p>
                  <p className="text-base font-medium bg-indigo-50  px-5 rounded-lg py-1 text-center">
                    {product?.createdDate}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="  font-semibold px-4 bg-indigo-400 rounded-lg py-1 text-center text-white">
                    Quantity
                  </p>
                  <p className="text-base font-medium bg-indigo-50  px-5 rounded-lg py-1 text-center">
                    {product?.stock}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="   font-semibold px-4 bg-indigo-400 rounded-lg py-1 text-center text-white">
                    Status
                  </p>
                  <p className=" text-base font-medium bg-indigo-50  px-5 rounded-lg py-1 text-center">
                    {product?.stock > 0 ? (
                        <span className="text-green-600 font-semibold">
                          In Stock 
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Stock Out
                        </span>
                      )}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-indigo-500 pt-6">
                <h2 className="text-xl font-bold  bg-indigo-400 text-white px-3 text-center py-2 rounded-lg">
                  Short Description
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                  {product?.shortDescription}
                </p>
              </div>
              <div className="mt-8 border-t border-indigo-500 pt-6">
                <h2 className="text-xl font-bold  bg-indigo-400 text-white px-3 text-center py-2 rounded-lg">
                  Full Description
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">
                 {product?.fullDescription}
                </p>
              </div>
              <div className="mt-8 border-t border-indigo-500 pt-6 flex">
                <div className="relative w-10 h-10 mr-2 items-center">
                  <Image
                    src={product?.userImage || "/default.jpg"}
                    alt={product?.userName || "User"}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="">
                  <div>
                    {product?.userName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {product?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
