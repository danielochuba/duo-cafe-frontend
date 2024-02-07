import React, { useState } from 'react'

import style from '../../assets/stylesheets/signup.module.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/authSlice';

const SignUp = () => {

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        password: ''
    })

    const [admin, setAdmin] = useState(false);
    const [adminPasscode, setAdminPasscode] = useState(0);

    const validatePasswordMatch = (password, confirmPassword) => {
        if (password === confirmPassword) {
            setUser({...user, password: password});
            document.getElementById('password-error').innerText = 'Passwords Matched ✔';
        } else {
            document.getElementById('password-error').innerText = 'Passwords do not match';
        }
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (re.test(email)) {
            setUser({...user, email: email})
        } else {
            document.getElementById('email-error').innerText = 'Invalid email';
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        await dispatch(registerUser(user))
    }

    const handleAdminRegistration = (role) => {
        const adminInfo = document.getElementById('admin-code-error');
        if (role === 'admin') {
        const ADMINCODE = 50326;
        setAdmin(true);

        if (adminPasscode !== ADMINCODE || adminPasscode === 0) {
            adminInfo.innerText = 'Invalid Admin code';
        } else {
            adminInfo.innerText = 'yeah ✔';
        }
           
    } else if (role === '') {
        setAdmin(false);
        adminInfo.innerText = 'Select a role';
    } else {
        setUser({...user, role: e.target.value})
        adminInfo.innerText = ' ✔';
    }
}

  return (
    <div className={`${style.signup_container}`}>
      
       
    <form className="flex flex-col sm:w-1/2 md:w-1/3 space-y-10" onSubmit={(e) => handleSubmit(e)}>
    <h1 className={`${style.form_title} text-center text-3xl font-bold `}>Sign Up</h1>
        <label for='first_name'>
          <input 
            className='border rounded-md p-2 w-full' 
            id='first_name' 
            type="text" 
            name="name"
            onChange={(e) => setUser({...user, first_name: e.target.value})}
            placeholder='First Name..'
          />
        </label>

        <label for='last_name'>
          <input
            className='border rounded-md p-2 w-full' 
            id='last_name' 
            type="text" 
            name="name" 
            onChange={(e) => setUser({...user, last_name: e.target.value})}
            placeholder='Last Name..'
          />
        </label>

        <label for='email'>
            <input
              className='border rounded-md p-2 w-full'
              id='email' 
              type="text" 
              name="name" 
              onChange={(e) => validateEmail(e.target.value)}
              placeholder='Email..'
            />
            <small className='text-red' id='email-error'></small>
        </label>
        
        <label for='role'>
            <select 
              className='border rounded-md p-2 w-full' 
              id='role' 
              name="role"
              onChange={(e) => handleAdminRegistration(e.target.value)}
            >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">Customer</option>
            </select>
        </label>

        { admin && (<label for='admin_verification'>
            <input 
              className='border rounded-md p-2 w-full' 
              type="number"
              id='admin_verification'
              name="admin_verification" 
              onChange={(e) => setAdminPasscode(e.target.value)}
              placeholder='Enter Admin authentication code...' 
            />
            <small className='text-white' id='admin-code-error'></small>
        </label>)}

        <label for='password'>
            <input 
              className='border rounded-md p-2 w-full' 
              type="password" 
              name="password"
              id='password' 
              onChange={(e) => setUser({...user, password: e.target.value})}
              placeholder='Password' 
            />
        </label>

        <label for='password_confirmation'>
            <input 
              className='border rounded-md p-2 w-full' 
              type="password" 
              name="password_confirmation" 
              id='password_confirmation'
              onChange={(e) => validatePasswordMatch(user.password, e.target.value)}
              placeholder='Confirm Password' 
            />
            <small className='text-red' id='password-error'></small>
        </label>

        <input 
          className='border w-1/3 rounded-lg p-2 m-auto hover:bg-slate-800 hover:text-white font-bold text-lg'
          type="submit"
          value="Submit"
        />
    </form>

    <p className="text-center absolute">Already have an account? <a href="/login">Login</a></p>
    
    </div>
  )
}

export default SignUp;
