import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
const deleteTodoData = createAsyncThunk("todo/deleteTodoData", async (id) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/Todos/${id}`
  );
  enqueueSnackbar("Delete Todo Success", {
    variant: "success",
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    autoHideDuration: 1000,
  });
  return response.data;
});

const updateTodoData = createAsyncThunk("todo/updateTodoData", async (data) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_API_ENDPOINT}/Todos/${data.id}`,
    data
  );
  enqueueSnackbar("Update Todo Success", {
    variant: "success",
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    autoHideDuration: 1000,
  });
  return response.data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    status: "idle",
    deleteStatus: "idle",
    error: null,
  },
  reducers: {
    // addTodo: (state, action) => {
    //   state.todoList.push(action.payload);
    // },
    // deleteTodo: (state, action) => {
    //   state.todoList = state.todoList.filter(
    //     (todo) => todo.id !== action.payload
    //   );
    // },
    // updateTodo: (state, action) => {
    //   const { id, name } = action.payload;
    //   const existingTodo = state.todoList.find((todo) => todo.id === id);
    //   if (existingTodo) {
    //     existingTodo.name = name;
    //   }
    // },
  },
  extraReducers: {
    [addTodoData.pending]: (state) => {
      state.status = "loading";
    },
    [addTodoData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.todoList.unshift(action.payload);
    },
    [addTodoData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getTodoData.pending]: (state) => {
      state.status = "loading";
    },
    [getTodoData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.todoList = action.payload;
    },
    [getTodoData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteTodoData.pending]: (state) => {
      state.deleteStatus = "loading";
    },
    [deleteTodoData.fulfilled]: (state, action) => {
      state.deleteStatus = "succeeded";
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    [deleteTodoData.rejected]: (state, action) => {
      state.deleteStatus = "failed";
      state.error = action.error.message;
    },
    [updateTodoData.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateTodoData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const { id, title, description } = action.payload;
      const existingTodo = state.todoList.find((todo) => todo.id === id);

      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
      }
    },
    [updateTodoData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export { addTodoData, getTodoData, deleteTodoData, updateTodoData };

export default todoSlice.reducer;
