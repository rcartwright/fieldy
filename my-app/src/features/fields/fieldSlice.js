/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import { fetchFields, createField } from "./fieldAPI";

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
      state.fields = [];
    },
    resetFields: (state) => {
      state.status = "idle";
      state.hasErrors = false;
      state.fields = [];
      state.error = null;
    }
  },
  extraReducers: (builder) =>
    builder
      // .addCase(fetchFields.idle, (state) => {
      //   state.status = "idle";
      //   state.hasErrors = false;
      //   state.fields = [];
      //   state.error = null;
      // })
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
const { resetFields } = fieldSlice.actions;
export { fetchFields, createField, resetFields };

export default fieldSlice.reducer;
