import {jwtDecode} from 'jwt-decode';

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

   const token = localStorage.getItem('token');
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      userId = decoded.userId; // 👈 or whatever key your backend uses (maybe `_id`)
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // const navLinks = [
  //   { name: "Home", path: "/" },
  //   { name: "Create", path: "/create" },
  //   { name: "Profile", path: userId ? `/profile/${userId}` : "/login" },
  //   { name: isLoggedIn ? "Logout" : "Login", path: isLoggedIn ? "/logout" : "/login" },
  //   { name: !isLoggedIn && "Signup", path: "/signup" },
  // ].filter(Boolean);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Create", path: "/create" },
    { name: "Profile", path: `/profile/${userId}`},
    { name: "Signup", path: "/signup" },
    isLoggedIn
      ? { name: "Logout", action: handleLogout }
      : { name: "Login", path: "/login" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-lg border-b border-[#2a2a2a] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-[#FF385C] tracking-tight">
          CampusConnect<span className="text-white">Lite</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) =>
            link.action ? (
              <button
                key={link.name}
                onClick={link.action}
                className="text-white hover:text-[#FF385C] font-medium transition-colors"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium px-2 py-1 rounded transition-colors ${
                  location.pathname === link.path
                    ? "text-[#FF385C]"
                    : "text-white hover:text-[#FF385C]"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#1c1c1c] px-4 pb-4 space-y-2 shadow-inner border-t border-[#333]">
          {navLinks.map((link) =>
            link.action ? (
              <button
                key={link.name}
                onClick={() => {
                  link.action();
                  closeMenu();
                }}
                className="block w-full text-left text-white hover:text-[#FF385C] font-medium transition-colors"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={`block font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-[#FF385C]"
                    : "text-white hover:text-[#FF385C]"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
