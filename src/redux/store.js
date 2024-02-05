import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/actions/authSlice';


export default configureStore({
    reducer: {
        auth: authReducer,
    },
});
