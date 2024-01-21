import { createslice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,

};

export const authSlice = createslice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.token = null;
            state.token = null;
        },
        setTokens: (state, action) => {
            if (state.user){
                state.user.tokens = action.payload.tokens;
            } else {
                console.error("This user has no tokens")
            }
        }
    },
});

export const { setMode, setLogin, setLogout, setTokens } = authSlice.actions;
export default authSlice.reducer;
