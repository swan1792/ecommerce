import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      {/* Logo */}
      <img src={assets.logo} className="w-36" alt="Logo" />

      {/* Desktop Menu */}
      <ul className="hidden sm:flex text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, i) => {
          const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <NavLink
              key={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-3 ${
                  isActive ? "active-link" : ""
                }`
              }
              to={path}
            >
              <p>{labels[i]}</p>
              <hr className="hidden w-3/4 border-none h-[1.5px] bg-gray-700" />
            </NavLink>
          );
        })}
      </ul>

      {/* Icons + Hamburger */}
      <div className="flex items-center text-gray-700 gap-4 relative">
        {/* Search Icon */}
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer hidden sm:block"
          alt="Search Icon"
        />

        {/* Profile Dropdown (Desktop Only) */}
        <div className="hidden sm:block group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />
          <div className="group-hover:block hidden absolute drop-down-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-sm text-gray-700 rounded-lg shadow-lg">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative hidden sm:block">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <p className="absolute -top-1 -right-2 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-semibold">
            10
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          src={assets.menu_icon}
          className="w-6 cursor-pointer sm:hidden"
          alt="Menu"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 sm:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform sm:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <img src={assets.logo} alt="Logo" className="w-28" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col text-gray-700 text-base">
          {["/", "/collection", "/about", "/contact"].map((path, i) => {
            const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <NavLink
                key={path}
                className={({ isActive }) =>
                  `px-6 py-4 border-b ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
                to={path}
                onClick={() => setIsMenuOpen(false)} // close sidebar on click
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
