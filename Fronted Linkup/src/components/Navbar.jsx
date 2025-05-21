import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-violet-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav items */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-white">LinkUp</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-1 text-violet-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/discover"
                className="border-violet-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium hover:border-violet-300 hover:text-violet-100 transition duration-150"
              >
                Discover
              </Link>
              <Link
                to="/matches"
                className="border-transparent text-violet-200 hover:border-violet-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
              >
                Matches
                <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-violet-700 bg-white rounded-full">
                  3
                </span>
              </Link>
              <Link
                to="/messages"
                className="border-transparent text-violet-200 hover:border-violet-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150"
              >
                Messages
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-1 rounded-full text-violet-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Premium badge */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-violet-800">
              Premium
            </span>

            {/* Profile dropdown */}
            <div className="ml-2 relative">
              <div>
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full border-2 border-white"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User profile"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-violet-200 hover:text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-violet-800`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/discover"
            className="bg-violet-700 border-violet-500 text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Discover
          </Link>
          <Link
            to="/matches"
            className="border-transparent text-violet-200 hover:bg-violet-700 hover:border-violet-300 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Matches
          </Link>
          <Link
            to="/messages"
            className="border-transparent text-violet-200 hover:bg-violet-700 hover:border-violet-300 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Messages
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-violet-900">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full border-2 border-white"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User profile"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">Jessica Smith</div>
              <div className="text-sm font-medium text-violet-200">Premium Member</div>
            </div>
            <button className="ml-auto flex-shrink-0 p-1 rounded-full text-violet-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          <div className="mt-3 space-y-1">
            <Link
              to="/profile"
              className="block px-4 py-2 text-base font-medium text-violet-200 hover:text-white hover:bg-violet-700"
            >
              Your Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-base font-medium text-violet-200 hover:text-white hover:bg-violet-700"
            >
              Settings
            </Link>
            <Link
              to="/logout"
              className="block px-4 py-2 text-base font-medium text-violet-200 hover:text-white hover:bg-violet-700"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;