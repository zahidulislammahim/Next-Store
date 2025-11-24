"use client";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Footer = () => {
  const { user } = useUser();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/all-products" },
    ...(user ? [{ name: "Add Product", path: "/add-product" }] : []),
    ...(user ? [{ name: "Manage Product", path: "/manage-product" }] : []),
    { name: "Contact", path: "/contact" },
  ];
  return (
    <footer className="flex flex-col bg-indigo-500 items-center justify-around w-full py-16 text-sm text-gray-800/70">
      <div className="flex items-center gap-4 md:gap-8 ">
        {navLinks.map((link) => {
          return (
            <Link
              key={link.path}
              href={link.path}
              className="font-medium text-white transition-all hover:-translate-y-2 duration-300">
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-8 text-indigo-100">
        <a
          href="#"
          className="hover:-translate-y-2 transition-all duration-300">
          <FaFacebook size={30} />
        </a>
        <a
          href="#"
          className="hover:-translate-y-2 transition-all duration-300">
          <AiFillInstagram size={32} />
        </a>
        <a
          href="#"
          className="hover:-translate-y-2 transition-all duration-300">
          <FaLinkedin size={30} />
        </a>
        <a
          href="#"
          className="hover:-translate-y-2 transition-all duration-300">
          <FaXTwitter size={30} />
        </a>
        <a
          href="#"
          className="hover:-translate-y-2 transition-all duration-300">
          <BsGithub size={30} />
        </a>
      </div>
      <p className="mt-8 text-center text-white">
        Copyright © {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/zahidulislammahim"
          className="text-indigo-200 hover:underline">
          Zahidul Islam Mahim
        </a>
        . All rights reservered.
      </p>
    </footer>
  );
};

export default Footer;
