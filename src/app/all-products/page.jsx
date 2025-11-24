"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useMemo, useEffect } from "react";

const Page = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios("http://localhost:5000/products").then((data) => setData(data.data));
  }, []);
  console.log(Data);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => ["All", ...new Set(Data.map((item) => item.category))],
    [Data]
  );

 const filteredData = useMemo(() => {
  const searchWords = search.toLowerCase().trim().split(/\s+/); // split by space

  return Data.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const text = `${item.title || ""} ${item.shortDescription || ""} ${item.fullDescription || ""}`.toLowerCase();

    const matchesSearch = searchWords.every((word) => text.includes(word));

    return matchesCategory && matchesSearch;
  });
}, [selectedCategory, search, Data]);

if(!Data){
  return <h1>loading</h1>
}

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Explore Our <span className="text-indigo-600">Collection</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover amazing products tailored just for you
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex-1 max-w-2xl">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-indigo-500"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-indigo-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search products..."
              />
            </div>
          </form>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full md:w-48 pl-3 pr-10 py-3 text-base border border-indigo-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-white ">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6">
          {filteredData.length !== 0 ? (
            filteredData.map((item, idx) => (
              <div
                key={idx}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-48 w-full max-w-md mx-auto bg-gray-200">
                  <Image
                    src={item.imageUrl || ""}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    loading="eager"
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.shortDescription}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${item.price}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm text-green-600 font-medium">
                      {item.meta}
                    </span>
                  </div>

                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24">
              <span className="text-5xl font-bold text-indigo-300">
                No Collection Found
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
