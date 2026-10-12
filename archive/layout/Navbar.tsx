"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-6 py-6 transition-all duration-500 md:px-12 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-500 ${
          scrolled
            ? "rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl"
            : ""
        }`}
      >
        <Link
          href="/"
          data-cursor
          className="text-sm font-medium tracking-[-0.02em]"
        >
          KP<span className="text-white/30">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor
              className="text-xs uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          data-cursor
          className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:border-white/40 hover:bg-white hover:text-black"
        >
          Let&apos;s talk
        </a>
      </nav>
    </header>
  );
}