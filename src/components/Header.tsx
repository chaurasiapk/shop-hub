import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, User, Heart } from "lucide-react";

import { useCart } from "../context";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tracks mobile menu state
  const { itemCount } = useCart(); // Access cart item count from context
  const location = useLocation(); // Access current path

  // Toggle mobile menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation links
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Check if the current route is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center group">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-3 text-2xl font-bold bg-purple-600 bg-clip-text text-transparent">
                ShopHub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative font-medium text-base transition-colors duration-300 group ${
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions (Right Section) */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="hidden md:flex p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Search size={20} />
            </button>

            {/* Wishlist Icon */}
            <button className="hidden sm:flex p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Heart size={20} />
            </button>

            {/* User Profile Icon */}
            <button className="hidden sm:flex p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <User size={20} />
            </button>

            {/* Cart Icon with item count */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-6 space-y-1 bg-white border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
