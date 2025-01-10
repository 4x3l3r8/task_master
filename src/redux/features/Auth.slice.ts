import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: () => {
      //   Cookies.remove(import.meta.env.VITE_AUTH_COOKIE);
      return initialAuthState;
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  extraReducers: (_builder) => {
    // builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
    //   // the token should be encrypted for security
    //   // the cookie key shuld be in the .env
    //   //   Cookies.set(import.meta.env.VITE_AUTH_COOKIE, payload.data.token);
    //   state.token = payload.data.token;
    //   state.user = payload.data.userDetails;
    //   Routes.navigate("/dashboard");
    // });
    // builder.addMatcher(authApi.endpoints.login.matchRejected, (state, { payload }) => {
    //   toast({
    //     status: "error",
    //     title: "Failed to login",
    //     description: payload.data.message,
    //   });
    // });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
