import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isAuth: false,
  user: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isAuth = true;
      state.user = action.payload.user;
      state.role = action.payload.role;

      localStorage.setItem("token", state.token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("role", state.role);
    },
    logout: (state) => {
      state.token = "";
      state.isAuth = false;
      state.user = null;
      state.role = null;

      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
