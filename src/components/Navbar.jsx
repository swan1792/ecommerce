import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { cart, setCart, token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile sidebar
  const [isProfileOpen, setIsProfileOpen] = useState(false); // desktop dropdown
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false); // mobile dropdown

  // Total quantity in cart
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Logout handler
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setCart([]);
    navigate("/login");
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    setIsMobileProfileOpen(false);
  };

  const isActiveLink = (path) => location.pathname === path;

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#profile-dropdown") && !e.target.closest("#profile-icon")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between py-5 font-medium relative px-4 sm:px-8 bg-white shadow">
      {/* Logo */}
      <img src={assets.logo} className="w-36" alt="Logo" />

      {/* Desktop Menu */}
      <ul className="hidden sm:flex text-sm text-gray-700 items-center gap-6">
        {["/", "/collection", "/about", "/contact"].map((path, i) => {
          const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-3 transition-all duration-300 ${isActive ? "scale-105 font-semibold text-black" : "hover:scale-105"
                }`
              }
            >
              <p>{labels[i]}</p>
            </NavLink>
          );
        })}

        {/* Desktop Profile / Login */}
        {token ? (
          <div className="relative flex items-center gap-1">
            <img
              id="profile-icon"
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Profile"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            <span
              className={`inline-block w-2 h-2 border-r-2 border-b-2 border-gray-700 rotate-45 cursor-pointer transition-transform ${isProfileOpen ? "rotate-225" : "rotate-45"
                }`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            ></span>

            {isProfileOpen && (
              <div
                id="profile-dropdown"
                className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg text-sm z-50"
              >
                <Link
                  to="/profile"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActiveLink("/profile") ? "font-bold" : ""
                    }`}
                  onClick={() => setIsProfileOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className={`block px-4 py-2 hover:bg-gray-100 ${isActiveLink("/orders") ? "font-bold" : ""
                    }`}
                  onClick={() => setIsProfileOpen(false)}
                >
                  Orders
                </Link>
                <p
                  onClick={handleLogout}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/login"
            className="px-3 py-2 font-semibold text-gray-700 hover:text-black"
          >
            Login
          </NavLink>
        )}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-4 relative">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer hidden sm:block"
          alt="Search"
        />

        {/* Cart Icon */}
        <Link to="/cart" className="relative hidden sm:block">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          {totalQuantity > 0 && (
            <p className="absolute -top-1 -right-2 w-4 h-4 text-center bg-red-500 text-white text-[8px] font-semibold rounded-full flex items-center justify-center">
              {totalQuantity}
            </p>
          )}
        </Link>

        {/* Mobile Hamburger */}
        <img
          src={assets.menu_icon}
          className="w-6 cursor-pointer sm:hidden"
          alt="Menu"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 sm:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform sm:hidden transition-transform duration-300 z-50 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img src={assets.logo} alt="Logo" className="w-28" />
          <button onClick={() => setIsMenuOpen(false)}>
            <img src={assets.back_icon} className="w-5" alt="Close" />
          </button>
        </div>

        <ul className="flex flex-col text-gray-700 text-base">
          {["/", "/collection", "/about", "/contact"].map((path, i) => {
            const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-4 border-b transition-all duration-300 ${isActive ? "bg-gray-100 font-semibold scale-105" : "hover:bg-gray-50 hover:scale-105"
                  }`
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}

          {/* Mobile Profile / Login */}
          {token ? (
            <div className="px-6 py-4 border-b">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
              >
                <span>PROFILE</span>
                <span
                  className={`inline-block w-2 h-2 border-r-2 border-b-2 border-gray-700 rotate-45 transition-transform ${isMobileProfileOpen ? "rotate-225" : "rotate-45"
                    }`}
                ></span>
              </div>
              {isMobileProfileOpen && (
                <div className="mt-2 ml-2 flex flex-col">
                  <Link
                    to="/profile"
                    className="px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <p
                    onClick={handleLogout}
                    className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 border-b hover:bg-gray-50 transition-all duration-300"
            >
              Login
            </NavLink>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
