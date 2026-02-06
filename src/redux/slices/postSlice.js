import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = [{
        id: "1",
        title: "Learning fundamentals of Redux Toolkit",
        date: sub(new Date(), { minutes: 15 }).toISOString(),
        content: "this is the tutorial of the fundamental concept of the redux toolkit for the react library",
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    },
    {
        id: "2",
        title: "Learning advanced concept of Redux Toolkit",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        content: "this is the advanced concept of the redux toolkit for the react framework",
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    },
];

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
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
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                if (existingPost.reactions.reaction === 0) {
                    existingPost.reactions[reaction]++
                } else {
                    existingPost.reactions[reaction] === 0
                }
            }
        }
    },
});

export const selectAllPost = (state) => state.posts;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;