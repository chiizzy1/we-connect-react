import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        }
    }
})


export const { setPosts } = postsSlice.actions;

export const userPosts = (state) => state.posts.posts;

export default postsSlice.reducer;

