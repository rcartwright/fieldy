import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './userAPI';

const initialState =
{
  status: 'idle',
  hasErrors: false,
  users: [],
  error: null
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state) => {
        state.users = [];
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.hasErrors = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'success';
        state.hasErrors = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'error';
        state.hasErrors = true;
        state.users = [];
        state.error = action.error.message;
      })
  },
})

export { fetchUsers };
export default userSlice.reducer;