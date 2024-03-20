import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../redux/actions/authSlice';
import { useDispatch } from 'react-redux';

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
    <div>
      home
      <button onClick={handleLogout}>
        Log Out
      </button>
      <ToastContainer />
    </div>
  );
}

export default Home;
