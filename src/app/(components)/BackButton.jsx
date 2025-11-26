"use client";

import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center  gap-1 bg-indigo-500 hover:bg-indigo-600  py-2 px-4 text-white rounded-full"
    >
      <IoArrowBackCircle />
      <span className="truncate text-sm font-bold">Back</span>
    </button>
  );
}
