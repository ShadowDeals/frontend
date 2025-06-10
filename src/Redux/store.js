import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const bandSlice = createSlice({
    name: 'band',
    initialState: {
        bandId: null,
    },
    reducers: {
        setBandId: (state, action) => {
            state.bandId = action.payload;
        },
        clearBandId: (state) => {
            state.bandId = null;
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const { setBandId, clearBandId } = bandSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        band: bandSlice.reducer,
    },
});

export default store;
