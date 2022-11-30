import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feed: {}
}

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        setfeed: (state, action) => {
            state.feed = action.payload
        }
    }
})


export const { setFeed } = feedSlice.actions;

export const userFeed = (state) => state.feed.feed;

export default feedSlice.reducer;