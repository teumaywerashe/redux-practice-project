import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import { userReducer } from "./users/userSlice";
export const store = configureStore({
    reducer: { posts: postReducer, users: userReducer },

});