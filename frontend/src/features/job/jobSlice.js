import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch  from '../../utils/axios';
import { logoutUser} from '../user/userSlice';
import { getUserFromLocalStorage } from '../../utils/localStorage';
// import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';


const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    try {
      const response = await customFetch.post('/jobs/', job, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
        }
      })

      thunkAPI.dispatch(clearValues());
      return response.data;

    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized');
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }

  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value;
    },
    clearValues: () => {
      return {
        ...initialState, jobLocation:getUserFromLocalStorage()?.location || ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
    // create Job
    .addCase(createJob.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(createJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success('Job created');
    })
    .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        if (payload) {toast.error(payload);} else {toast.error('Something went wrong. Please try again later.');}
    });
  }
});



export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
