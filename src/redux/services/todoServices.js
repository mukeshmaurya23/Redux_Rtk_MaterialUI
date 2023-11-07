import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const addTodoData = createAsyncThunk("todo/addTodoData", async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/Todos`,
    data
  );
  enqueueSnackbar("Add Todo Success", {
    variant: "success",
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    autoHideDuration: 1000,
  });
  return response.data;
});

const getTodoData = createAsyncThunk("todo/getTodoData", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/Todos`
  );
  return response.data;
});

// const deleteTodoData = createAsyncThunk("todo/deleteTodoData", async (id) => {
//     const response = await axios.delete(
//         `${process.env.REACT_APP_API_ENDPOINT}/Todos/${id}`
//     );
//     enqueueSnackbar("Delete Todo Success", {
//         variant: "success",
//         anchorOrigin: {
//         vertical: "top",
//         horizontal: "right",
//         },
//         autoHideDuration: 1000,
//     });
//     return response.data;
//     }
// );
