import { createSlice } from "@reduxjs/toolkit";
import { fetchLikes, setLikes } from "@/services/fetch-service";
import { LocalStoreLikes } from "@/lib/local-store";

const initialState: {
  isLoading: boolean;
  data: any;
  likes: number;
} = {
  isLoading: false,
  data: null,
  likes: 0,
};

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.likes = action.payload.likes;
        LocalStoreLikes(action.payload.likes);
        state.isLoading = false;
      })
      .addCase(fetchLikes.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(setLikes.fulfilled, (state, action) => {
      state.likes = Number(action.payload);
    });
  },
});

export default fetchSlice;
