import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postsReducer from '../features/posts/postsSlice';
import feedReducer from '../features/feed/feedSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    feed: feedReducer
  },
});