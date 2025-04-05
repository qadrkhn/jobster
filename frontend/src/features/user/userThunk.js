import customFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";


export const userUpdateThunk = async (user, thunkAPI) => {
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
};

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.post('/auth/login/', user);
    return response.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const response = await customFetch.post('/auth/register/', user);
    return response.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
