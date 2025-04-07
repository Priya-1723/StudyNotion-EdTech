import {createSlice} from "@reduxjs/toolkit";


// It allows the application to retrieve and set the authentication token from local storage when the app loads, ensuring the user remains logged in after refreshing the page.
const initialState = {
    signupData : null,
    loading : false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            // Updates the token property in the state object with the value provided in value.payload
            state.token = value.payload
        },
    }
})

export const {setSignupData, setLoading, setToken} = authSlice.actions;
export  default authSlice.reducer;
