import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000/users';


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (user) => {
        const response = await axios.post(`${BASE_URL}/login`, user)
        return response.data
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
    }
}) 


export default authSlice.reducer;
