import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'faild'
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", () => {
    return new Promise((resolve, reject) => {
        axios
            .get(POSTS_URL)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err.message));
    });
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        content,
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
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })

    },
});

export const selectAllPost = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;