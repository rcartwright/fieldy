/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import { fetchFields } from "./fieldAPI";

const initialState = {
  status: "idle",
  hasErrors: false,
  fields: [],
  error: null
};

export const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    selectField: (state) => {
      state.users = [];
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFields.pending, (state) => {
        state.status = "loading";
        state.hasErrors = false;
      })
      .addCase(fetchFields.fulfilled, (state, action) => {
        state.status = "success";
        state.hasErrors = false;
        state.fields = action.payload.data;
      })
      .addCase(fetchFields.rejected, (state, action) => {
        state.status = "error";
        state.hasErrors = true;
        state.fields = [];
        state.error = action.error.message;
      })
});

export { fetchFields };

export default fieldSlice.reducer;
