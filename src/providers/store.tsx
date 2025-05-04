import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import fetchSlice from "./slices/fetch-slice";
import urlSlice from "./slices/url-slice";


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    fetch: fetchSlice.reducer,
    url: urlSlice.reducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
