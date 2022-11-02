import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.user = action.payload
        },
        setUserLogout: (state) => {
            state.user = {}
        }
    }
})


export const { setUserLogin, setUserLogout } = userSlice.actions;

export const loggedUser = (state) => state.user.user;

export default userSlice.reducer;

