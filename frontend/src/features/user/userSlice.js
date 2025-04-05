import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";

// Login user
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        try {
            const response = await customFetch.post('/auth/login/', user);
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
            const response = await customFetch.post('/auth/register/', user);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

// Update user
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.patch('/auth/updateUser/', user, {
        headers: {
          Authorization : `Bearer ${thunkAPI.getState().user.user.token}`
        }
      });
      return response.data;
    } catch (error) {
        if (error.response.status === 401) {
          thunkAPI.dispatch(logoutUser());
          return thunkAPI.rejectWithValue('Unauthorized. Logging out .....');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
    isLoading: false,
    isSideBarOpen: false,
    user: getUserFromLocalStorage(),
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      toggleSidebar: (state) => {
        state.isSideBarOpen = !state.isSideBarOpen;
      },
      logoutUser: (state) => {
        state.user = null;
        state.isSideBarOpen = false;
        removeUserFromLocalStorage();
      }
    },
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
        })
        // Update user
        .addCase(updateUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            const { user } = payload;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`User Updated`);
        })
        .addCase(updateUser.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            if (payload) {toast.error(payload);} else {toast.error('Something went wrong. Please try again later.');}
        });
    },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
