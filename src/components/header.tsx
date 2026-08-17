"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const prevScroll = useRef<number>(0);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 1,
    });
  }, []);

  useGSAP(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > prevScroll.current) {
        setScrolled(false);
        gsap.to(headerRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 1,
        });
      } else if (currentScroll === 0) {
        setScrolled(false);
        gsap.to(headerRef.current, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
        });
      } else {
        setScrolled(true);
        gsap.to(headerRef.current, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
        });
      }

      prevScroll.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const burgerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!burgerRef.current) {
      return;
    }

    gsap.to(burgerRef.current.children, {
      scaleX: 0.3,
      transformOrigin: "left center", // сжатие от левого края
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
      stagger: 0.3,
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className={`font-sans sticky top-0 z-50 shadow-sm border-b ${scrolled ? "bg-black/70 backdrop-blur-md" : "bg-foreground"}`}
    >
      <div className="w-fullcontainer mx-2.5 flex items-center justify-between py-3">
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition-all hover:scale-1.2 hover:-translate-y-2 duration-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-xs text-white">
              2
            </span>
          </button>

          <button className="p-2 text-gray-600 hover:text-indigo-600 transition-all hover:scale-1.2 hover:-translate-y-2 duration-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>

        <Link
          href="/"
          className="text-xl font-bold text-black hover:text-indigo-700 transition-colors"
        >
          ShopWave
        </Link>

        <div
          ref={burgerRef}
          className="flex flex-col gap-1 justify-center md:hidden h-full w-5 cursor-pointer"
        >
          <div className="w-full h-0.5 bg-black"></div>
          <div className="w-full h-0.5 bg-black"></div>
          <div className="w-full h-0.5 bg-black"></div>
        </div>
        <div className="md:flex items-center gap-4 hidden">
          <Link
            href="/login"
            className="text-gray-600 hover:text-indigo-600 transition-all hover:scale-1.2 hover:-translate-y-1 duration-300 cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:w-0 after:transition-all hover:after:w-full after:duration-300"
          >
            Войти
          </Link>
          <Link
            href="/register"
            className="text-gray-600 hover:text-indigo-600 transition-all hover:scale-1.2 hover:-translate-y-1 duration-300 cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:w-0 after:transition-all hover:after:w-full after:duration-300"
          >
            Регистрация
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
