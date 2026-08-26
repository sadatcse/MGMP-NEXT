"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaAppleAlt } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import "../css/navbar.css";
import Logo from "../assets/logo.png";
import NutritionNowForm from './NutritionNowForm';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const user = false;
  const pathname = usePathname();

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/aboutus/about' },
    { name: 'Service', href: '/service' },
    { name: 'Team', href: '/trainers' },
    { name: 'Explore', href: '/explore' },
    { name: 'Contact Us', href: '/contactus' },
  ];

  const menu = (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              className={isActive ? "menu-link active" : "menu-link"}
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );

  const avatar = (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:rounded-lg hover:bg-transparent avatar">
          <div className="w-10 rounded-lg">
            <Image alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" width={40} height={40} />
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52 text-black">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  );

  const buttons = (
    <div className="flex items-center gap-2">
      {/* Nutrition Now Button */}
      <button
        onClick={() => setShowNutritionModal(true)}
        className="btn hidden sm:flex items-center gap-1.5 px-3.5 md:px-4 font-black text-xs uppercase tracking-wider text-black bg-custom-yellow hover:bg-yellow-400 rounded-md border-none poppins cursor-pointer shadow-md transition-all duration-200"
      >
        <FaAppleAlt className="text-red-600 text-sm" /> Nutrition Now
      </button>
      <button
        onClick={() => setShowNutritionModal(true)}
        className="flex sm:hidden items-center gap-1 py-2 px-2.5 text-[11px] font-black uppercase text-black bg-custom-yellow rounded-md border-none poppins cursor-pointer"
      >
        <FaAppleAlt className="text-red-600" /> Nutrition
      </button>

      {/* Join Now Button */}
      <Link href="/signup">
        <button 
          className="btn hidden md:block md:px-6 md:font-medium text-white bg-red-600 rounded-md border-none hover:text-red-600 hover:bg-white hover:border-red-600 poppins cursor-pointer"
        >
          Join Now
        </button>
        <button 
          className="block md:hidden py-2 px-3 text-xs md:text-sm md:font-medium text-white bg-red-600 rounded-md border-none poppins cursor-pointer"
        >
          Join Now
        </button>
      </Link>
    </div>
  );

  return (
    <div className="relative z-[100] w-full">
      <div className="navbar bg-custom-black px-4 md:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              onClick={handleDropdownToggle}
              className="z-[100] btn btn-ghost lg:hidden"
              aria-label="Toggle navigation menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#f4cb71">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="poppins menu menu-sm dropdown-content gap-1 bg-black/95 border border-gray-800 text-white rounded-box z-[100] mt-3 w-48 p-3 shadow-2xl backdrop-blur-md"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        className={isActive ? "text-red-500 font-bold bg-white/10" : "hover:text-red-500 hover:bg-white/5"}
                        href={link.href}
                        onClick={closeDropdown}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={() => {
                      closeDropdown();
                      setShowNutritionModal(true);
                    }}
                    className="text-custom-yellow font-bold hover:bg-white/10 flex items-center gap-2 w-full text-left py-2"
                  >
                    <FaAppleAlt className="text-red-500" /> Nutrition Now
                  </button>
                </li>
              </ul>
            )}
          </div>
          <Link href="/" className="z-[100] py-1 flex items-center focus:outline-none">
            <Image 
              className='h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-200 hover:scale-105' 
              src={Logo} 
              alt="Multigym Premium Logo" 
              priority
            />
          </Link>
        </div>
        <div className="flex navbar-end w-full justify-end z-[100]">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-6 font-medium text-sm flex mr-3 items-center poppins">
              {menu}
            </ul>
          </div>
          {user ? avatar : buttons}
        </div>
      </div>

      {/* Nutrition Now Modal */}
      {showNutritionModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowNutritionModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              title="Close"
            >
              <HiX size={20} />
            </button>
            <NutritionNowForm onClose={() => setShowNutritionModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
