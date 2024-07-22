import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: 0,
    tokenNum: 0,

};

//reducer stuff that i mostly understand?

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "dark";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.tokenNum = action.payload.tokens;
        },
        setLogout: (state) => {
            state.token = null;
            state.tokenNum = 0;
        },
        updateTokens: (state, action) => {
            state.user.tokenNum += action.payload;
        },
    },
});

export const { setMode, setLogin, setLogout, updateTokens } = authSlice.actions;
export default authSlice.reducer;
