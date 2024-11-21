import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-40 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img src="/assets/icons/Logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="ml-3 text-lg sm:text-xl font-bold text-gray-800">
            SIMS PPOB
          </span>
        </Link>

        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="lg:flex items-center gap-6 sm:gap-10 lg:gap-14 hidden">
          <Link
            to="/topup"
            className={`font-medium ${
              location.pathname === "/topup" ? "text-red-700 font-bold" : ""
            }`}
          >
            Top Up
          </Link>
          <Link
            to="/history"
            className={`font-medium ${
              location.pathname === "/history" ? "text-red-700 font-bold" : ""
            }`}
          >
            Transaction
          </Link>
          <Link
            to="/profile"
            className={`font-medium ${
              location.pathname === "/profile" ? "text-red-700 font-bold" : ""
            }`}
          >
            Akun
          </Link>
        </div>
      </div>

      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-white shadow-md py-4 px-6 absolute top-16 left-0 w-full`}
      >
        <div className="flex flex-col items-start gap-4">
          <Link
            to="/topup"
            className={`font-medium ${
              location.pathname === "/topup" ? "text-red-700 font-bold" : ""
            }`}
            onClick={toggleMenu}
          >
            Top Up
          </Link>
          <Link
            to="/history"
            className={`font-medium ${
              location.pathname === "/history" ? "text-red-700 font-bold" : ""
            }`}
            onClick={toggleMenu}
          >
            Transaction
          </Link>
          <Link
            to="/profile"
            className={`font-medium ${
              location.pathname === "/profile" ? "text-red-700 font-bold" : ""
            }`}
            onClick={toggleMenu}
          >
            Akun
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
