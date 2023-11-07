import { ThemeProvider } from "@emotion/react";
import "./styles/global.css";
import theme from "./styles/theme";
import { Box, Typography } from "@mui/material";
import LoginPage from "./components/LoginPage";
import styled from "@emotion/styled";
import GoogleMap from "./components/GoogleMap";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import RouterApp from "./router";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { getTodoData } from "./redux/slice/todoSlice";
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <RouterApp />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
