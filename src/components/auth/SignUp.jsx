import React, { useState } from 'react'

import style from '../../assets/stylesheets/signup.module.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/authSlice';

// ERROR MESSAGES //
const hasUpperCase = (str) => /[A-Z]/.test(str);
const first_name_required = 'Please enter your name';
const email_required = 'Please enter your email';
const EMAIL_INVALID = 'Please enter a correct email address format';
const EMAIL_INVALID_UPPERCASE = 'Please enter email address in lower case';

const SignUp = () => {

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        password: ''
    })

    // FUNCTIONS TO HANDLE INITIAL VALIDATON //
    const showMessage = (input, message, type) => {
        const msg = input.nextElementSibling;
        msg.innerText = message;
    
        input.className = type ? 'success' : 'error';
        return type;
    }
    const showError = (input, message) => {
        return showMessage(input, message, false);
    }
    const showSuccess = (input) => {
        return showMessage(input, '', true);
    }
    const hasValue = (input, message) => {
        if (input.value.trim() === '') {
        return showError(input, message);
        }
        return showSuccess(input);
    }

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

        // console.log(e.target.elements['email-input'].value);

        Object.entries(user).forEach(([key, value]) => {
            if (value === '') {
                const message = document.querySelector(`#${key}-error`);
                message.innerText = `Please Enter ${key }`;
                return
            } else {

            }
            console.log(key, value);
        });

       // await dispatch(registerUser(user))
    }

    const handleRoleRegistration = (role) => {
        const roleInfo = document.getElementById('role-error');
        if (role === 'admin') {
            roleInfo.innerText = '';
            
            setAdmin(true);

           
            
        } else if (role === 'user') {
            setAdmin(false);
            setUser({...user, role: role});
            roleInfo.innerText = '';
        } else {
            setAdmin(false);
            roleInfo.innerText = 'Select a role';
        }
}

    const handleAdminCodeVerification = (e) => {
        setAdminPasscode(e.target.value)
        const adminInfo = document.getElementById('admin-code-error');
        const ADMINCODE = 50326;
        if (adminPasscode !== ADMINCODE || adminPasscode === 0) {
            adminInfo.innerText = 'Invalid Admin code';
        } else {
            setUser({...user, role: role})
            adminInfo.innerText = 'yeah ✔';
   
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
            name="first_name"
            onChange={(e) => setUser({...user, first_name: e.target.value})}
            placeholder='First Name..'
          />
          <small className='text-white' id='first_name-error'></small>
        </label>

        <label for='last_name'>
          <input
            className='border rounded-md p-2 w-full' 
            id='last_name' 
            type="text" 
            name="last_name" 
            onChange={(e) => setUser({...user, last_name: e.target.value})}
            placeholder='Last Name..'
          />
          <small className='text-white' id='last_name-error'></small>
        </label>

        <label for='email'>
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
            <small className='text-white' id='email-error'></small>
        </label>
        
        <label for='role'>
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
            <small className='text-white' id='role-error'></small>
        </label>

        { admin && (<label for='admin_verification'>
            <input 
              className='border rounded-md p-2 w-full' 
              type="number"
              id='admin_verification'
              name="admin_verification" 
              onChange={(e) => handleAdminCodeVerification(e)}
              placeholder='Enter Admin authentication code...' 
            />
            <small className='text-white' id='admin-code-error'></small>
        </label>)}

        <label for='password'>
            <input 
              className='border rounded-md p-2 w-full' 
              type="password" 
              name="password_input"
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
