import React from 'react'

import style from '../assets/stylesheets/signup.module.css'

function SignUp() {
  return (
    <div className={`${style.signup_container}`}>
      
       
    <form className="flex flex-col sm:w-1/2 md:w-1/3 space-y-10">
    <h1 className={`${style.form_title} text-center text-3xl font-bold `}>Sign Up</h1>
        <label for='first_name'>
        <input className='border rounded-md p-2 w-full' id='first_name' type="text" name="name" placeholder='First Name..'/>
        </label>
        <label for='last_name'>
        <input className='border rounded-md p-2 w-full' id='last_name' type="text" name="name" placeholder='Last Name..'/>
        </label>
        <label for='email'>
            <input className='border rounded-md p-2 w-full' id='email' type="text" name="name" placeholder='Email..'/>
        </label>

        # select role

        <label for='role'>
            <select className='border rounded-md p-2 w-full' id='role' name="role">
                <option value="admin">Admin</option>
                <option value="user">Customer</option>
            </select>
        </label>
        <label for='password'>
            <input className='border rounded-md p-2 w-full' type="password" name="password" placeholder='Password' />
        </label>
        <label for='password'>
            <input className='border rounded-md p-2 w-full' type="password" name="password" placeholder='Confirm Password' />
        </label>

        <input className='border w-1/3 rounded-lg p-2 m-auto hover:bg-slate-800 hover:text-white font-bold text-lg' type="submit" value="Submit" />
    </form>
    <p className="text-center absolute">Already have an account? <a href="/login">Login</a></p>
    


    </div>
  )
}

export default SignUp