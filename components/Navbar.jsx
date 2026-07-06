"use client"

import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home",       href: "/"           },
    { name: "AI Calling", href: "/ai-calling" },
    { name: "Services",   href: "/#services"  },
    { name: "Projects",   href: "/#projects"  },
    { name: "Contact",    href: "/#contact"   },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <div className="w-52 font-bold text-white tracking-tight">
          <img src='/images/cygnuz-logo.png' className="w-full h-auto max-h-20 object-contain object-left" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-slate-400 hover:text-slate-100 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white focus:outline-none"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 pb-4">
          <ul className="flex flex-col space-y-1 pt-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-slate-400 hover:text-slate-100 text-sm font-medium transition-colors duration-200 block py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
