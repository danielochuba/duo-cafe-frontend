
import React, { useState } from 'react';
import style from './../assets/stylesheets/navbar.module.css';
import cart from './../assets/images/cart.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#4A2C21] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
          <h1 className={` ${style.nav_logo} text-lg font-bold items-center flex p-1`}><span className=''>DUO</span> Cafe</h1>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">Services</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
              <li><a href="#" className="text-white hover:text-gray-300"><img src={cart} alt='cart' /> </a></li>
            </ul>
          </div>
          <div className="md:hidden">
            <button className=" bg-amber-950 text-white focus:outline-none" onClick={toggleMenu}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Conditionally render the navbar items based on isOpen state */}
        {isOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col mt-4 space-y-2">
              <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">Services</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
              <li><a href="#" className="text-white hover:text-gray-300"><img src={cart} alt='cart' /> </a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
