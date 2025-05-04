import { createAsyncThunk } from "@reduxjs/toolkit";

export const createUrl = createAsyncThunk("url/create", async (data: any) => {
    const response = await fetch(import.meta.env.VITE_URL + "/url/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
});


export const fetchUrl = createAsyncThunk("url/fetch", async () => {
    const response = await fetch(import.meta.env.VITE_URL + "/fetch/url", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.json();
});

export const deleteUrl = createAsyncThunk("url/delete", async (id: string) => {
    const response = await fetch(import.meta.env.VITE_URL + "/url/delete/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.json();
});

export const clickUrl = createAsyncThunk("url/click", async (data: any) => {
    const response = await fetch(import.meta.env.VITE_URL + "/url/click", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify(data),
    });
    return response.json();
});