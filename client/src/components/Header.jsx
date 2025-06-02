import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo2.png'

export default function Header() {
  return (
    <header className="backdrop-blur-md bg-gray-400/20 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-15 rounded-xl shadow-lg transition-transform hover:scale-110 duration-300"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent tracking-wide animate-gradient-x">
            BoboEstate
          </span>
        </Link>
        {/* Search Bar */}
        <form className="flex items-center bg-white/80 border border-gray-200 rounded-xl shadow-md px-4 py-1 focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-200 mx-10 min-w-[300px]">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
          />
          <button type="submit" className="ml-2 text-gray-500 hover:text-blue-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
        {/* Menu */}
        <nav className="flex space-x-7">
          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600 transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium text-gray-700 hover:text-blue-600 transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </Link>
          <Link
            to="/signin"
            className="font-medium text-gray-700 hover:text-blue-600 transition px-3 py-1 rounded-lg bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 hover:from-blue-300 hover:to-purple-300 shadow hover:scale-105 duration-300"
          >
            Sign in
          </Link>
        </nav>
      </div>
      {/* 动态渐变动画，可选 */}
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 4s ease-in-out infinite;
          }
        `}
      </style>
    </header>
  )
}
