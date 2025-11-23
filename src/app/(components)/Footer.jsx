import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-indigo-500 items-center justify-around w-full py-16 text-sm text-gray-800/70">
      <div className="flex items-center gap-8">
        <Link 
          href="/"
          className="font-medium text-white hover:text-indigo-900 transition-all hover:-translate-y-1  duration-300">
          Home
        </Link>
        <Link 
          href="/"
          className="font-medium text-white hover:text-indigo-900 transition-all hover:-translate-y-1  duration-300">
          About
        </Link>
        <Link 
          href="/"
          className="font-medium text-white hover:text-indigo-900 transition-all hover:-translate-y-1  duration-300">
          Services
        </Link>
        <Link 
          href="/"
          className="font-medium text-white hover:text-indigo-900 transition-all hover:-translate-y-1  duration-300">
          Contact
        </Link>
        <Link 
          href="/"
          className="font-medium text-white hover:text-indigo-900 transition-all hover:-translate-y-1  duration-300">
          Help
        </Link>
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
        <a href="https://github.com/zahidulislammahim" className="text-indigo-200 hover:underline">Zahidul Islam Mahim</a>. All rights reservered.
      </p>
    </footer>
  );
};

export default Footer;
