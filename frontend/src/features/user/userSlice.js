import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { addUserToLocalStorage, getUserFromLocalStorage } from "../../utils/localStorage";

// Login user
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        try {
            const response = await customFetch.post('/auth/login', user);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

// Register user
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        try {
            const response = await customFetch.post('/auth/register', user);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
        // Register User
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            const { user } = payload;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome ${user.name}`);
        })
        .addCase(registerUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            if (payload) {toast.error(payload);} else {toast.error('Something went wrong. Please try again later.');}
        })
        // Login User
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            const { user } = payload;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome back ${user.name}`);
        })
        .addCase(loginUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            if (payload) {toast.error(payload);} else {toast.error('Something went wrong. Please try again later.');}
        });
    },
});

export default userSlice.reducer;
