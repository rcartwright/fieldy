import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFields = createAsyncThunk(
  "users/fetchFields",
  async (orgId) => {
    const url = `http://192.168.99.100:4001/api/organizations/${orgId}/fields`;

    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error("getMany error: ", error);
        return [];
      });

    return response;
  }
);

export const createField = createAsyncThunk(
  "fields/create",
  async (payload) => {
    console.log("INSIDE CREATEFIELD");
    console.log("the payload inside function", payload);
    const url = `http://192.168.99.100:4001/api/fields`;

    // eslint-disable-next-line
    const response = fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      method: "post",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log("inside json");
        return res.json();
      })
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error("getMany error: ", error);
        return [];
      });

    return response;
  }
);
