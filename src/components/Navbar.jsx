// import React from "react";
// import { assets } from "../assets/assets";
// import { NavLink, Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="flex items-center justify-between py-5 font-medium">
//       <img src={assets.logo} className="w-36" alt="" />
//       <ul className="hidden sm:flex text-sm text-gray-700">
//         <NavLink
//           className={({ isActive }) =>
//             `flex flex-col items-center gap-1 p-3 ${
//               isActive ? "active-link" : ""
//             }`
//           }
//           to="/"
//         >
//           <p>HOME</p>
//           <hr className="hidden w-3/4 border-none h-[1.5px] bg-gray-700" />
//         </NavLink>
//         <NavLink
//           className={({ isActive }) =>
//             `flex flex-col items-center gap-1 p-3 ${
//               isActive ? "active-link" : ""
//             }`
//           }
//           to="/collection"
//         >
//           <p>COLLECTION</p>
//           <hr className="hidden w-3/4 border-none h-[1.5px] bg-gray-700" />
//         </NavLink>

//         <NavLink
//           className={({ isActive }) =>
//             `flex flex-col items-center gap-1 p-3 ${
//               isActive ? "active-link" : ""
//             }`
//           }
//           to="/about"
//         >
//           <p>ABOUT</p>
//           <hr className="hidden w-3/4 border-none h-[1.5px] bg-gray-700" />
//         </NavLink>
//         <NavLink
//           className={({ isActive }) =>
//             `flex flex-col items-center gap-1 p-3 ${
//               isActive ? "active-link" : ""
//             }`
//           }
//           to="/contact"
//         >
//           <p>CONTACT</p>
//           <hr className="hidden w-3/4 border-none h-[1.5px] bg-gray-700" />
//         </NavLink>
//       </ul>

//       <div className="hidden sm:flex items-center text-gray-700 gap-4 relative">
//         <img
//           src={assets.search_icon}
//           className="w-5 cursor-pointer"
//           alt="Search Icon"
//         />
//         <div className="group relative">
//           <img
//             src={assets.profile_icon}
//             className="w-5 cursor-pointer"
//             alt="Profile"
//           />
//           <div className="group-hover:block hidden absolute drop-down-menu right-0 pt-4">
//             <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-sm text-gray-700 rounded-lg shadow-lg">
//               <p className="cursor-pointer hover:text-black">My Profile</p>
//               <p className="cursor-pointer hover:text-black">Orders</p>
//               <p className="cursor-pointer hover:text-black">Logout</p>
//             </div>
//           </div>
//         </div>

//         <Link to="/cart" className="relative">
//           <img src={assets.cart_icon} className="w-5" alt="Cart" />
//           <p className="absolute -top-1 -right-2 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-semibold">
//             10
//           </p>
//         </Link>
//         <img src={assets.menu_icon}  className="w-5 cursor-pointer sm:hidden" alt="" />
//       </div>
//     </div>
//   );
// };

// export default Navbar;

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
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg sm:hidden z-50">
          <ul className="flex flex-col items-center text-gray-700 text-sm py-4">
            {["/", "/collection", "/about", "/contact"].map((path, i) => {
              const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
              return (
                <NavLink
                  key={path}
                  className={({ isActive }) =>
                    `w-full text-center py-2 ${
                      isActive ? "bg-gray-200 font-semibold" : ""
                    }`
                  }
                  to={path}
                  onClick={() => setIsMenuOpen(false)} // close after click
                >
                  {labels[i]}
                </NavLink>
              );
            })}
          </ul>

          {/* Mobile Icons */}
          <div className="flex justify-center gap-6 py-3 border-t">
            <img src={assets.search_icon} className="w-5 cursor-pointer" alt="Search" />
            <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="Profile" />
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-5" alt="Cart" />
              <p className="absolute -top-1 -right-2 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-semibold">
                10
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
