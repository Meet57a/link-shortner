import { createSlice } from "@reduxjs/toolkit";
import AuthType from "@/types/auth-type";
import {
  login,
  signup,
  getSession,
  setUser,
  logout,
  likeService,
} from "@/services/auth-services";
import LocalStore, { LocalStoreClear } from "@/lib/local-store";

const initialState: {
  isLoading: boolean;
  user: AuthType | null;
  token: string | null;
  data: any;
} = {
  isLoading: false,
  user: null,
  token: null,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signup builder
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        if (state.user) {
          state.user.isAuthenticated = false;
        }
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.user = action.payload.user;
        if (state.user) {
          state.user.isAuthenticated = true;
        }
        state.token = action.payload.token;
        if (state.user) {
          if (action.payload.status === true) {
            state.user.isAuthenticated = true;
            LocalStore(action.payload.user, action.payload.token);
          } else {
            state.user.isAuthenticated = false;
            LocalStore(
              { _id: "", email: "", isAuthenticated: false, name: "" },
              ""
            );
          }
        }
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
        if (state.user) {
          state.user.isAuthenticated = false;
        }
      });

    // login builder
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        if (state.user) {
          state.user.isAuthenticated = false;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (state.user) {
          if (action.payload.status === true) {
            state.user.isAuthenticated = true;
            LocalStore(action.payload.user, action.payload.token);
          } else {
            state.user.isAuthenticated = false;
            LocalStore(
              { _id: "", email: "", isAuthenticated: false, name: "" },
              ""
            );
          }
        }

        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        if (state.user) {
          state.user.isAuthenticated = false;
        }
      });

    // getSession builder
    builder
      .addCase(getSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.data = action.payload;

        if (state.user) {
          if (action.payload.status === true) {
            state.user.isAuthenticated = true;
            LocalStore(action.payload.data.user, action.payload.data.token);
          } else {
            state.user.isAuthenticated = false;
            LocalStoreClear();
          }
        }
        state.isLoading = false;
      })
      .addCase(getSession.rejected, (state) => {
        state.isLoading = false;
      });

    // setUser builder
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.user = action.payload;
      if (!state.user) {
        state.user = { _id: "", email: "", isAuthenticated: false, name: "" };
      }
    });

    // logout builder
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.data = action.payload;
        if (state.data.status === true) {
          state.user = { _id: "", email: "", isAuthenticated: false, name: "" };
          state.token = "";
          LocalStoreClear();
        } else if (state.data.status === false) {
          state.user = { _id: "", email: "", isAuthenticated: false, name: "" };
          state.token = "";
          LocalStoreClear();
        }
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      });

    // likeService builder
    builder
      .addCase(likeService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeService.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(likeService.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice;
