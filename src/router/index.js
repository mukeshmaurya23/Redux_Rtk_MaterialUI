import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "../App";
import LoginPage from "../components/LoginPage";
import GoogleMap from "../components/GoogleMap";
import Home from "../components/Home";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import InfoPage from "../components/InfoPage";
import Todo from "../components/Todo";
import { useEffect, useState } from "react";
import { getTodoData } from "../redux/slice/todoSlice";
const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  height: "100vh",
}));
const RouterApp = () => {
  const isLogin = localStorage.getItem("tokenKey");
  console.log(isLogin, "isLogin");
  useEffect(() => {
    console.log(isLogin, "isLogin");
  }, [isLogin]);

  const PrivateRoute = ({ path, element }) => {
    return isLogin ? element : <Navigate to="/" />;
  };
  const todoDispatch = useDispatch();

  useEffect(() => {
    todoDispatch(getTodoData());
  }, [todoDispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          index: true,
          element: isLogin ? <InfoPage /> : <LoginPage />,
        },
        {
          path: "/todo",
          element: <PrivateRoute path="/todo" element={<Todo />} />,
        },
        {
          path: "/maps",
          element: (
            <Wrapper>
              <GoogleMap />
            </Wrapper>
          ),
        },
      ],
    },

    {
      path: "*",
      element: <div>Not Found</div>,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterApp;
