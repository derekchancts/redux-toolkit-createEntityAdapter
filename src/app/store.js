import { configureStore } from '@reduxjs/toolkit';
import commentReducer from '../features/comments/commentsSlice'


export const store = configureStore({
  reducer: {
   comments: commentReducer
  },
});
