import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFields = createAsyncThunk("users/fetchFields", async () => {
  const url = `http://192.168.99.100:4001/api/fields`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("responseJson", responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error("getMany error: ", error);
      return [];
    });

  return response;
});
