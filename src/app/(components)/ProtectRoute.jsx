"use client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const ProtectRoute = () => {
  const { openSignIn } = useClerk();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-indigo-200 via-white to-indigo-200 px-4 -mt-2">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-indigo-500 text-center mb-6">
        Please Login First
      </h1>
      <p className="text-center text-lg md:text-xl text-indigo-300 mb-8 max-w-lg">
        You need to be logged in to Add a  Product. Click the button below to
        sign in.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-indigo-500 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all duration-300 text-lg md:text-xl"
        >
          Home
        </button>
        <button
          onClick={openSignIn}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all duration-300 text-lg md:text-xl"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default ProtectRoute;



