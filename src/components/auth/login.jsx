import React, { useState } from "react";
import style from "../../assets/stylesheets/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { FidgetSpinner } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

useDispatch

const Login = () => {

  const status = useSelector((state) => state.auth.status.message);
  const loading = useSelector((state) => state.auth.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (email && password) {
          
        const response = await dispatch(loginUser({ email, password }));
          // Assuming userInfo is part of the response object
        if (response.error) {
          toast.error('Invalid email or password');
        } else {
            toast.success('Logged in successfully');
            setTimeout(() => {
              navigate('/');
            }, 1000);
            
        }
      } else {
        toast.error('Please fill in all fields');

  }

  }
  return (
    <>
    {loading && (
      <div className='flex flex-col absolute w-full h-full bg-white justify-center items-center'>
          <FidgetSpinner />
          <h4 className='font-bold'>Logging in ...</h4>
      </div>
  )}
    <div className={`${style.login_container} p-5 `}>
      <form
        className={`${style.login_form}  p-5 flex flex-col sm:w-1/2 md:w-1/3 space-y-10`}
        onSubmit={(e) => handleSubmit(e)}
      >
         <ToastContainer />
        <h1 className={`${style.form_title}`}>Login</h1>
        <label htmlFor="email">
          <input
            className="border rounded-md p-2 w-full"
            id="email"
            type="text"
            name="name"
            placeholder="Email.."
            onChange={(e) => setEmail(e.target.value)}
          />
           <small className='text-rose-500' id='email-error'></small>
        </label>


        <label htmlFor="password">
          <input
            className="border rounded-md p-2 w-full"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
           <small className='text-rose-500' id='password-error'></small>
        </label>

        <input
          className="border w-1/3 rounded-lg p-2 m-auto hover:bg-slate-800 hover:text-white font-bold text-lg"
          type="submit"
          value="Submit"
        />
      </form>

      <p className="text-center absolute">Don't have an account? <a href="/sign_up">Sign Up</a></p>
    </div>
    </>
  );
};

export default Login;
