import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const url = `http://192.168.99.100:4001/api/users`;
  // const url = `http://localhost:4001/api/users`;

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
});
