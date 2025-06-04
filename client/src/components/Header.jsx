import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Home, Mail, User, Lock, Menu, X, Search } from 'lucide-react'
import { useSelector } from 'react-redux'
import logo from '../assets/images/logo2.png'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector(state => state.user);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 shadow-lg overflow-hidden">
        {/* 渐变背景层 - 使用更丰富的渐变效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 opacity-95 animate-gradient-bg"></div>
        {/* 第二层渐变 - 添加深度 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent"></div>
        {/* 毛玻璃效果层 */}
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        {/* 底部边框渐变 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>

        <div className="relative max-w-7xl mx-auto h-full">
          <div className="flex items-center justify-between h-full px-4 sm:px-6">
            {/* Logo - 移动端和桌面端都显示 */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <img
                src={logo}
                alt="logo"
                className="h-8 sm:h-10 w-auto rounded-xl shadow-lg transition-transform hover:scale-110 duration-300"
              />
              <span className="hidden sm:block text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent tracking-wide animate-gradient-x">
                BoboEstate
              </span>
            </Link>

            {/* 搜索框 - 移动端居中，桌面端靠左 */}
            <form className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4 lg:mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md pl-4 pr-10 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 flex items-center text-gray-500 hover:text-blue-600 transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* 桌面端导航菜单 */}
            <nav className="hidden sm:flex items-center space-x-4 lg:space-x-7">
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
              {user ? (
                <Link to="/profile" className="flex items-center">
                  <img
                    src={user.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="font-medium text-gray-700 hover:text-blue-600 transition px-4 py-2 rounded-lg bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 hover:from-blue-300 hover:to-purple-300 shadow hover:scale-105 duration-300"
                >
                  Sign in
                </Link>
              )}
            </nav>

            {/* 移动端菜单按钮 */}
            <button
              className="sm:hidden flex-shrink-0 p-2 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 移动端下拉菜单 - 独立于header，使用固定定位 */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-white shadow-lg transform transition-transform duration-300 ease-in-out sm:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        {/* <nav className="flex flex-col p-4 space-y-2">
          <Link
            to="/"
            className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={user.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="profile"
                className="w-6 h-6 rounded-full object-cover mr-3 border border-gray-300"
              />
              Profile
            </Link>
          ) : (
            <Link
              to="/signin"
              className="block px-4 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-center shadow-md transition-all hover:shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
          )}
        </nav> */}
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            to="/"
            className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors text-center active:scale-95 active:bg-blue-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors text-center active:scale-95 active:bg-blue-100"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="flex items-center justify-center px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors text-center active:scale-95 active:bg-blue-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={user.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="profile"
                className="w-6 h-6 rounded-full object-cover mr-3 border border-gray-300"
              />
              Profile
            </Link>
          ) : (
            <Link
              to="/signin"
              className="block px-4 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-center shadow-md transition-all hover:shadow-lg active:scale-95 active:bg-blue-600/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
          )}
        </nav>

      </div>

      {/* 遮罩层 - 点击关闭菜单 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 动态渐变动画 */}
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 4s ease-in-out infinite;
          }
          .animate-gradient-bg {
            background-size: 200% 200%;
            animation: gradient-shift 8s ease infinite;
          }
        `}
      </style>
    </>
  )
}
