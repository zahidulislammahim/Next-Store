"use client";

import BackButton from "./(components)/BackButton";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative w-[50vh] h-[50vh]">
        <Image
          src="/errorPage2.png"
          alt="404 Not Found"
          fill
          className="object-contain"
        />
      </div>
      <BackButton></BackButton>
    </div>
  );
}
