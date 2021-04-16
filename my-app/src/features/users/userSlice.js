import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { fetchUsers } from './userAPI';

const initialState = [
        {
            email: "some@email.com",
            id: "118d7017-93c1-4517-b014-81ca9c1416e6",
            is_active: true
        },
        {
            email: "some12345@email.com",
            id: "118d7017-93c1-4517-b014-81ca9c1416e6",
            is_active: true
        },
    ]

export const userSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getUsers: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
        state.users = [];
    },
  }
})

export const { fetchUsers } = userSlice.actions;

export const selectUsers = (state) => state.users;

export default userSlice.reducer;