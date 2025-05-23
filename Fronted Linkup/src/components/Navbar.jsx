import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import axios from 'axios';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Implement your logout logic here
    console.log('User logged out');
    await axios.post('http://localhost:5000/logout', {}, { withCredentials: true }).then((response)=>{
      console.log(response.data);
      navigate('/login');
    }).catch((error)=>{
      console.log(error);
    }
    )
  }

  return (
    <nav className="bg-white border-b border-violet-100 shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand / Logo */}
          <div className="flex-shrink-0 text-violet-600 text-2xl font-bold tracking-tight">
            <Link to="/">Linkup</Link>
          </div>

          {/* Desktop Menu */}
         {isLoggedIn &&  <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-violet-600 transition">
              Home
            </Link>
            <Link to="/matches" className="text-gray-700 hover:text-violet-600 transition">
              Matches
            </Link>
            <Link to="/messages" className="text-gray-700 hover:text-violet-600 transition">
              Messages
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-violet-600 transition">
              Profile
            </Link>
            <Button
            onClick={
              handleLogout
            }
            className="bg-violet-600 text-white px-4 py-1 rounded hover:bg-violet-700 transition"
            >
              Log Out
            </Button>
          </div>}

          {/* Auth Buttons */}
          {!isLoggedIn && <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="text-violet-600 border border-violet-600 px-4 py-1 rounded hover:bg-violet-50 transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-violet-600 text-white px-4 py-1 rounded hover:bg-violet-700 transition"
            >
              Sign Up
            </Link>
          </div>}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-violet-600 hover:text-violet-800 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t border-violet-100">
      {isLoggedIn&&    <div>
           <Link to="/" className="block text-gray-700 hover:text-violet-600">
            Home
          </Link>
          <Link to="/matches" className="block text-gray-700 hover:text-violet-600">
            Matches
          </Link>
          <Link to="/messages" className="block text-gray-700 hover:text-violet-600">
            Messages
          </Link>
          <Link to="/profile" className="block text-gray-700 hover:text-violet-600">
            Profile
          </Link>
         
         </div>}
        {!isLoggedIn &&   <div className="pt-2 border-t border-gray-200">
            <Link to="/login" className="block text-violet-600 hover:text-violet-800">
              Log In
            </Link>
            <Link to="/signup" className="block text-violet-600 hover:text-violet-800">
              Sign Up
            </Link>
          </div>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
