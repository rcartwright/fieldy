/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import { fetchOrganizations } from "./organizationAPI";

const initialState = {
  status: "idle",
  hasErrors: false,
  organizations: [],
  error: null
};

export const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    selectOrganization: (state) => {
      state.users = [];
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.status = "loading";
        state.hasErrors = false;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.status = "success";
        state.hasErrors = false;
        state.organizations = action.payload.data;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.status = "error";
        state.hasErrors = true;
        state.organizations = [];
        state.error = action.error.message;
      })
});

export { fetchOrganizations };

export default organizationSlice.reducer;
