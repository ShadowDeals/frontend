import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        accessExpiresAt: null,
        email: null,
        refreshToken: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.accessExpiresAt = action.payload.accessExpiresAt;
            state.email = action.payload.email;
            state.refreshToken = action.payload.refreshToken;
        },
        clearCredentials: (state) => {
            state.accessToken = null;
            state.accessExpiresAt = null;
            state.email = null;
            state.refreshToken = null;
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;
