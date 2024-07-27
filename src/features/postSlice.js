// src/slices/postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../services/postService";

export const fetchPosts = createAsyncThunk("posts/fetchAll", async (params) => {
  const response = await postService.getAll(params);
  return response.data;
});

export const fetchPost = createAsyncThunk(
  "posts/fetch",
  async ({ id, headers }) => {
    const response = await postService.get(id, headers);
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ data, headers }) => {
    const response = await postService.create(data, headers);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data, headers }) => {
    const response = await postService.update(id, data, headers);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async ({ id, headers }) => {
    await postService.remove(id, headers);
    return id;
  }
);
export const fetchCommentsByPostId = createAsyncThunk(
  "posts/fetchComments",
  async (postId) => {
    const response = await postService.getCommentsByPostId(postId);
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,
    status: "idle",
    error: null,
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((t) => t.id !== action.payload);
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export const postReducer = postSlice.reducer;
export default postSlice.reducer;
