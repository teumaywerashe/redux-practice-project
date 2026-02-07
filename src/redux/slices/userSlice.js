import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = [];
// {
//     users: [],
//     status: 'idle',
//     error: null
// };
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
export const fetchUsers = createAsyncThunk("fetch/users", async() => {
    const response = await axios.get(USERS_URL);

    return response.data;
});
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});



export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;