import { createSlice } from "@reduxjs/toolkit";
import { fetchLikes, setLikes, fetchLongUrl } from "@/services/fetch-service";
import { LocalStoreLikes } from "@/lib/local-store";

const initialState: {
  isLoading: boolean;
  fetcnLikesData: any;
  likes: number;

  lognUrlfetchData: any;
} = {
  isLoading: false,
  fetcnLikesData: null,
  likes: 0,
 
  lognUrlfetchData: null,
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
        state.fetcnLikesData = action.payload;
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

    builder.addCase(fetchLongUrl.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(fetchLongUrl.fulfilled, (state, action) => {
        state.lognUrlfetchData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLongUrl.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchSlice;
