import { createSlice } from "@reduxjs/toolkit";
const initialState = [
    { id: "1", name: "abebeaw dejene" },
    { id: "2", name: "berhanu derge" },
    { id: "3", name: "abebeaw ayenew" },
    { id: "4", name: "adere beyene" },
];
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;