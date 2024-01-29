import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: 0,

};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.user.tokens = action.payload.tokens;
        },
        setLogout: (state) => {
            state.token = null;
            state.token = null;
        },
    },
});

export const { setMode, setLogin, setLogout, setTokens } = authSlice.actions;
export default authSlice.reducer;
