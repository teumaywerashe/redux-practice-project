import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'faild'
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async() => {
    const response = await axios.get(POSTS_URL);
    let count = 1;
    const postsWithExtras = response.data.map((post) => ({
        ...post,
        date: post.date || sub(new Date(), { seconds: count++ }).toISOString(),
        reactions: post.reactions || {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    }));

    return postsWithExtras;
});

export const addNewPost = createAsyncThunk("/post/addNewPost", async(data) => {
    const response = await axios.post(POSTS_URL, data);
    return response.data;
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        body,
                        title,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        },
                    },
                };
            },
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost) {
                if (existingPost.reactions[reaction] === 0) {
                    existingPost.reactions[reaction]++;
                } else {
                    existingPost.reactions[reaction]--;
                }
            }
        },
    },
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
                state.error = action.payload;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                };
                console.log(action.payload);
                state.posts.push(action.payload);
            });
    },
});

export const selectAllPost = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getError = (state) => state.posts.error;

export const selectSinglePost = (state, postId) => state.posts.posts.find(post => post.id.toString() === postId.toString())

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;