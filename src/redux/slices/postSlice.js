import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = [{
        id: "1",
        title: "Learning fundamentals of Redux Toolkit",
        content: "this is the tutorial of the fundamental concept of the redux toolkit for the react library",
    },
    {
        id: "2",
        title: "Learning advanced concept of Redux Toolkit",
        content: "this is the advanced concept of the redux toolkit for the react framework",
    }, {
        id: "3",
        title: "Learning fundamentals of Redux Toolkit",
        content: "this is the tutorial of the fundamental concept of the redux toolkit for the react library",
    },
    {
        id: "4",
        title: "Learning advanced concept of Redux Toolkit",
        content: "this is the advanced concept of the redux toolkit for the react framework",
    },
    {
        id: "5",
        title: "Learning fundamentals of Redux Toolkit",
        content: "this is the tutorial of the fundamental concept of the redux toolkit for the react library",
    },
    {
        id: "6",
        title: "Learning advanced concept of Redux Toolkit",
        content: "this is the advanced concept of the redux toolkit for the react framework",
    },
];


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        content,
                        title
                    }
                }
            }


        }
    }
})


export const selectAllPost = (state) => state.posts

export const { postAdded } = postSlice.actions

export default postSlice.reducer