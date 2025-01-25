
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk("auth/signup", async (data: any) => {
  console.log(data);
  console.log(import.meta.env.VITE_URL);

  const response = await fetch(import.meta.env.VITE_URL + "/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const login = createAsyncThunk("auth/login", async (data: any) => {
  const response = await fetch(import.meta.env.VITE_URL + "/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const getSession = createAsyncThunk("auth/getSession", async () => {


  const token = localStorage.getItem("token");
  const response = await fetch(import.meta.env.VITE_URL + "/auth/session", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
});

export const setUser = createAsyncThunk("auth/setUser", async () => {
  const user = localStorage.getItem("user");
  return JSON.parse(user as string);
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(import.meta.env.VITE_URL + "/auth/sign-out", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
});

export const likeService = createAsyncThunk("likes/likeService", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(import.meta.env.VITE_URL + "/auth/likes", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });      
  return response.json();
});