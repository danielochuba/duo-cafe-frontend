import React from 'react'
import style from '../assets/stylesheets/login.module.css'

function Login() {
  return (
    <div className={`${style.login_container} p-5 text-center`}>
        <form className={`${style.login_form}  p-5 flex flex-col sm:w-1/2 md:w-1/3 space-y-10`}>
        <h1 className={`${style.login_title}`}>Login</h1>
            <label for='email'>
            <input className='border rounded-md p-2 w-full' id='email' type="text" name="name" placeholder='Email..'/>
            </label>
            
            
            <label for='password'>
              <input className='border rounded-md p-2 w-full' type="password" name="password" placeholder='Password' />
            </label>
            
           
            <input className='border w-1/3 rounded-lg p-2 m-auto' type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default Login