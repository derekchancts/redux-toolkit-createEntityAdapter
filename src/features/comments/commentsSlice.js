import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (_, { dispatch }) => {
    const { data } = await axios.get('http://jsonplaceholder.typicode.com/comments?_limit=10');
    console.log({ data })
    return data
    // dispatch(setAllComments(data))
  }
);


const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id
});


export const commentsSlice = createSlice({
  name: 'comments',
  // initialState: {},
  initialState: commentsAdapter.getInitialState({ loading: false }),
  reducers: {
    setAllComments: commentsAdapter.setAll,
  },
  extraReducers: {
    // [fetchComments.pending]: (state, action) => {
    //   state.status = 'loading'
    // },
    // [fetchComments.fulfilled]: (state, { payload }) => {
    //   state.list = payload;
    //   state.status = 'success'
    // },
    // [fetchComments.rejected]: (state, action) => {
    //   state.status = 'failed'
    // }
    [fetchComments.pending]: (state) => {
      state.loading = true
    },
    [fetchComments.fulfilled]: (state, { payload }) => {
      state.loading = false
      commentsAdapter.setAll(state, payload)
      // state.comments = payload;
    },
    [fetchComments.rejected]: (state) => {
      state.loading = false
    }
  }
});



export const commentSelectors = commentsAdapter.getSelectors(state => state.comments);

export const { 
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectById,
 } = commentSelectors;


export const { setAllComments } = commentsSlice.actions;

export default commentsSlice.reducer;