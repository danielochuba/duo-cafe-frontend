import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../redux/actions/authSlice';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar';
import HeroImage from '../assets/images/hero.png';
import Offer from './Offer';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Empty dependency array ensures the effect runs only once after the component mounts

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logoutUser());
    toast.success('Logged out successful');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className='bg-[#F0EDE5]'>
      <Navbar />

      <section className="text-gray-600 body-font">

        <div className=" w-full h-64 md:h-96 lg:h-128 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HeroImage})`,
            // opacity: 0.7
          }}>
        </div>
        <h1 className="text-3xl font-bold text-center font-serif">Welcome to DUO Cafe</h1>
        <h2 className="text-2xl font-bold text-center">Awaken Your Senses, One Sip at a Time</h2>
        <p className="text-center">a place where the rich aroma of freshly brewed coffee mingles with the soothing ambiance of comfort.</p>
      </section>

          <section className="text-gray-600 body-font p-5">
            <h3 className="text-2xl font-bold text-center font-serif">Offers</h3>
            <Offer />
          </section>

      <div>

        home
        <button onClick={handleLogout}>
          Log Out
        </button>
        <ToastContainer />
      </div>

    </div>
  );
}

export default Home;
