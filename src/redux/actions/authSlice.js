import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://127.0.0.1:3000/users';


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    // async (user) => {
    //     const response = await axios.post(`${BASE_URL}/sign_in`, user)
    //     return response.data
    // }
    async (user) => {
        const userObject = {
            user: {
                email: user.email,
                password: user.password
            }
        }
            const response = await fetch(`${BASE_URL}/sign_in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            })
            console.log(response)
            if (user.role === 'admin') {
                Cookies.set('admin_token', response.headers.get('Authorization'), { expires: 1 })
            } else {
                Cookies.set('user_token', response.headers.get('Authorization'), { expires: 1 })
            }
            const data = await response.json();
            
            return data
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        const response = await fetch(`${BASE_URL}/sign_out`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('admin_token') || Cookies.get('user_token')
            }
        })

        Cookies.remove('admin_token') || Cookies.remove('user_token')
        const data = await response.json();
        console.log(data)
        return data
    }
)


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user) => {
        const userObject = {
            user: {
                email: user.email,
                password: user.password,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role
            }
        }
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            })

            if (user.role === 'admin') {
                Cookies.set('admin_token', response.headers.get('Authorization'), { expires: 1 })
            } else {
                Cookies.set('user_token', response.headers.get('Authorization'), { expires: 1 })
            }
            
            console.log(response)
            console.log(response.headers.get('Authorization'))
            const data = await response.json();
            return data
                    
    }
)

const initialState = {
    user: null,
    status: 'idle',
    error: null,
    loading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.user = action.payload
                console.log(state)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
                state.status = 'loading'
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = action.payload
                state.user = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
}) 


export default authSlice.reducer;
