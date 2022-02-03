import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (_, { dispatch }) => {
    // const { data } = await axios.get('http://jsonplaceholder.typicode.com/comments?_limit=10');
    const { data } = await axios.get('http://localhost:4000/comments');
    console.log({ data })

    const comments = data.map(({ id, body }) => ({ id, body })) 
    const tags = data.reduce((prev, curr) => [...prev, curr.tags], []).flat();  // create a new array with just the "tags"
    const likes = data.reduce((prev, curr) => [...prev, curr.likes], []).flat();  // create a new array with just the "likes"

    console.log({ comments, tags, likes})

    return { comments, likes, tags }
    // return data
    // dispatch(setAllComments(data))
  } 
);


export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (id) => {
    // await axios.delete(`http://jsonplaceholder.typicode.com/comments/${id}`);
    await axios.delete(`http://localhost:4000/comments/${id}`);
    return id;   // returns the id if there's no error, which then can be used under "deleteComment.fulfilled"
  }
);


export const patchComment = createAsyncThunk(
  'comments/patchComment',
  async ({ id, newData }) => {
    // console.log({ id, newData })
    // await axios.patch(`http://jsonplaceholder.typicode.com/comments/${id}`, {
    await axios.patch(`http://localhost:4000/comments/${id}`, {
      newData
    });
    // return data; 
    return { id, changes: newData }
  }
);


const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id
});

const likesAdapter = createEntityAdapter({
  selectId: (like) => like.id
});

const tagsAdapter = createEntityAdapter({
  selectId: (tag) => tag.id
});



export const commentsSlice = createSlice({
  name: 'comments',
  // initialState: {},
  initialState: commentsAdapter.getInitialState({ 
    loading: false,
    likes: likesAdapter.getInitialState(),
    tags: tagsAdapter.getInitialState()
  }),
  reducers: {
    setAllComments: commentsAdapter.setAll,
    setOneComments: commentsAdapter.removeOne,
    setManyComments: commentsAdapter.addMany,
    updateOneComment: commentsAdapter.updateOne,
    removeLikes(state) {
      likesAdapter.removeAll(state.likes, {})
    },
    removeTagById: (state, { payload: tagId }) => {
      tagsAdapter.removeOne(state.tags, tagId)
    }
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
    [fetchComments.rejected]: (state) => {
      state.loading = false
    },
    [fetchComments.fulfilled]: (state, { payload }) => {
      state.loading = false
      commentsAdapter.setAll(state, payload.comments)
      tagsAdapter.setAll(state.tags, payload.tags)
      likesAdapter.setAll(state.likes, payload.likes)
      // state.comments = payload;
    },

    [deleteComment.pending](state) {
      state.loading = true
    },
    [deleteComment.rejected](state) {
      state.loading = false
    },
    [deleteComment.fulfilled](state, { payload: id }) {
      state.loading = false
      commentsAdapter.removeOne(state, id)
    },

    [patchComment.pending](state) {
      state.loading = true
    },
    [patchComment.fulfilled](state, { payload }) {
      state.loading = false
      commentsAdapter.updateOne(state, { id: payload.id, changes: payload.changes })
    },
    [patchComment.rejected](state) {
      state.loading = false
    },
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


export const { 
  setAllComments, 
  setOneComments,  
  setManyComments,
  updateOneComment,
  removeLikes,
  removeTagById
} = commentsSlice.actions;


export default commentsSlice.reducer;