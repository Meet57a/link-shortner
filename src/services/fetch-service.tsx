import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLikes = createAsyncThunk("likes/fetchLikes", async () => {
  const response = await fetch(import.meta.env.VITE_URL + "/fetch/likes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
});

export const setLikes = createAsyncThunk("likes/setLikes", async () => {
  const likes = localStorage.getItem("likes");
  return likes;
});
