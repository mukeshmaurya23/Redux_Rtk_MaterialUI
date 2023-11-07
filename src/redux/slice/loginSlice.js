import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: "",
    user: {},
  },
  reducers: {
    loginActions: (state, action) => {
      localStorage.setItem("tokenKey", action.payload.tokenKey);
      // state.user = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logOutActions: (state, action) => {
      localStorage.removeItem("tokenKey");
      localStorage.removeItem("userData");
    },
  },
});

export const { loginActions, logOutActions } = loginSlice.actions;

export default loginSlice.reducer;
