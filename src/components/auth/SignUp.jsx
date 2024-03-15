import React, { useState, useRef } from 'react'
import { FidgetSpinner } from 'react-loader-spinner';

import style from '../../assets/stylesheets/signup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/actions/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logDOM } from '@testing-library/react';

const SignUp = () => {

    const loading = useSelector((state) => state.auth.loading);
    const userInfo = useSelector((state) => state.auth.user);
    
    const dispatch = useDispatch();
    const formRef = useRef(null);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        password: ''
    })

    const [admin, setAdmin] = useState(false);
    const [password, setPassword] = useState('')
    const [adminPasscode, setAdminPasscode] = useState('');
    const [isAdminCode, setIsAdminCode] = useState(false);
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);

    const validatePasswordMatch = (password, confirmPassword) => {
        const passwordInfo = document.getElementById('password-error');

        if (confirmPassword === '') {
            passwordInfo.innerText = '';
            setUser(
                {...user, password: ''}
            )
        } else if (password === confirmPassword) {
            setIsPasswordMatched(true);
            setUser({...user, password: password});
            passwordInfo.innerText = 'Passwords Matched ✔';
        } else if (password  === '' || password !== confirmPassword) {
            setIsPasswordMatched(false);
            passwordInfo.innerText = 'Passwords do not match..';
            setUser(
                {...user, password: ''}
            )
        } else {

        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const span =  document.getElementById('email-error');
        const isEmailValid = emailRegex.test(email);
        if (isEmailValid) {
            setUser({...user, email: email})
            span.innerText = '';
        } else if (email === '') {
            span.innerText = '';
        } else if (!isEmailValid) {
            span.innerText = 'Invalid email';
        } 
    }

    const handleEmail = (e) => {
        validateEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        const allInputHasValue = Object.entries(user).every(([key, value]) => {
            const message = document.querySelector(`#${key}-error`);
            if (value === '') {
                message.innerText = `Please Enter ${key }`;
                return false
            }
            message.innerText = '';
            return true;
        });

        if (allInputHasValue) {
            try {

            const response = await dispatch(registerUser(user))
            if (!response.payload.status.errors) {
                toast.success('Sign up successful');
                navigate('/login');
            }


        } catch (error) {
            console.log('Error logging in:', response.payload.status.errors);
            toast.error('An error occurred while logging in. Please try again later.');
        }

    }
}

    const handleRoleRegistration = (role) => {
        const roleInfo = document.getElementById('role-error');
        if (role === 'admin') {
            roleInfo.innerText = '';
            setUser({...user, role: ''})
            setAdmin(true);
        } else if (role === 'user') {
            setAdmin(false);
            setUser({...user, role: role});
            roleInfo.innerText = '';
        } else {
            setAdmin(false);
            roleInfo.innerText = 'Please Select a role';
        }
}

    const handleAdminCodeVerification = (code) => {
        
        setAdminPasscode(prevPasscode => {
            const newPasscode = Number(code);
            const ADMINCODE = 50326;
    
            if (newPasscode === ADMINCODE) {
                setUser({...user, role: 'admin'});
                setIsAdminCode(true)
                document.getElementById('admin-code-error').innerText = 'yeah ✔';
            } else {
                setUser({...user, role: ''});
                setIsAdminCode(false)
                document.getElementById('admin-code-error').innerText = 'Invalid Admin code';
            }
            return newPasscode;
        });
    }

  return (
    <>
    
    {loading && (
        <div className='flex flex-col absolute w-full h-full bg-white justify-center items-center'>
            <FidgetSpinner />
            <h4 className='font-bold'>Signing up</h4>
        </div>
    )}
    <div className={`${style.signup_container}`}>
      
    <ToastContainer />
    <form className={`${style.form} flex opacity-100 flex-col sm:w-full md:w-full space-y-10`} ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        
    <h1 className={`${style.form_title} text-center text-3xl font-bold `}>Sign Up</h1>
        <label htmlFor='first_name'>
          <input 
            className='border rounded-md p-2 w-full' 
            id='first_name' 
            type="text" 
            name="first_name"
            onChange={(e) => setUser({...user, first_name: e.target.value})}
            placeholder='First Name..'
          />
          <small className='text-rose-500' id='first_name-error'></small>
        </label>

        <label htmlFor='last_name'>
          <input
            className='border rounded-md p-2 w-full' 
            id='last_name' 
            type="text" 
            name="last_name" 
            onChange={(e) => setUser({...user, last_name: e.target.value})}
            placeholder='Last Name..'
          />
          <small className='text-rose-500' id='last_name-error'></small>
        </label>

        <label htmlFor='email'>
            <input
              className='border rounded-md p-2 w-full'
              id='email' 
              type="email" 
              name="email_input" 
              onChange={(e) => {
               setUser({...user, email: e.target.value})
               handleEmail(e)
            }}
            placeholder='Email..'
            />
            <small className='text-rose-500' id='email-error'></small>
        </label>
        
        <label htmlFor='role'>
            <select 
              className='border rounded-md p-2 w-full' 
              id='role' 
              name="role_input"
              onChange={(e) => handleRoleRegistration(e.target.value)}
            >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">Customer</option>
            </select>
            <small className='text-rose-500' id='role-error'></small>
        </label>

        { admin && (<label htmlFor='admin_verification'>
            <input 
              className='border rounded-md p-2 w-full' 
              type="text"
              id='admin_verification'
              name="admin_verification" 
              onChange={(e) => handleAdminCodeVerification(e.target.value)}
              placeholder='Enter Admin authentication code...' 
            />
            <small className={isAdminCode ? 'text-emerald-400' : 'text-rose-500'} id='admin-code-error'></small>
        </label>)}

        <label htmlFor='password'>
            <input 
              className='border rounded-md p-2 w-full' 
              type="password" 
              name="password_input"
              id='password' 
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password' 
            />
        </label>

        <label htmlFor='password_confirmation'>
            <input 
              className='border rounded-md p-2 w-full' 
              type="password" 
              name="password_confirmation" 
              id='password_confirmation'
              onChange={(e) => validatePasswordMatch(password, e.target.value)}
              placeholder='Confirm Password' 
            />
            <small className={isPasswordMatched ? 'text-emerald-400' : 'text-rose-500'} id='password-error'></small>
        </label>

        <input 
          className='border w-1/3 rounded-lg p-2 m-auto hover:bg-slate-800 hover:text-white font-bold text-lg'
          type="submit"
          value="Submit"
        />
    </form>

    <p className="text-center absolute">Already have an account? <a href="/login">Login</a></p>
    
    </div>
            </>
  )
}

export default SignUp;
