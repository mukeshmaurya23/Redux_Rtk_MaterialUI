import styled from "@emotion/styled";
import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoData, updateTodoData } from "../redux/slice/todoSlice";
import TodoTable from "./TodoTable";
import { useGetTodoListQuery } from "../redux/slice/todoQuerySlice";
const BgColor = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "100vh",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
}));
const TodoCard = styled(Paper)(({ theme }) => ({
  width: "500px",
  height: "350px",
  margin: "4rem auto",
  padding: "20px",
  "& .MuiTextField-root": {
    margin: "16px 0",
  },
}));
const TodoList = styled(Paper)(({ theme }) => ({
  width: "600px",

  margin: "2rem auto",
  padding: "20px",
  paddingTop: "10px",
}));
const Todo = () => {
  const [todo, setTodo] = React.useState({ title: "", description: "" });
  const [editbtn, setEditbtn] = React.useState(false);
  // const { todoList, status, error } = useSelector((state) => state.todo);
  const { data: todoList, isLoading, isError } = useGetTodoListQuery();

  console.log(todoList);
  console.log(todo, "todo");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.title || !todo.description)
      return enqueueSnackbar("Please fill all the fields", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    try {
      const todoData = {
        id: Math.floor(Math.random() * 1000),
        title: todo.title,
        description: todo.description,
      };

      dispatch(addTodoData(todoData));
    } catch (err) {
      enqueueSnackbar(err.messaage, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }

    setTodo({
      title: "",
      description: "",
    });
  };
  const updateDispatch = useDispatch();

  const editTodoList = (data) => {
    updateDispatch(updateTodoData(todo));
    setEditbtn(false);
    setTodo({
      title: "",
      description: "",
    });
  };
  if (isError) return <h1>{isError}</h1>;
  return (
    <BgColor>
      <TodoCard>
        <h1
          style={{
            fontSize: "20px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Todo App
        </h1>
        <label htmlFor="title">Title</label>
        <TextField
          id="title"
          variant="outlined"
          fullWidth
          placeholder="Enter Title"
          value={todo.title}
          onChange={(e) => {
            setTodo({
              ...todo,
              title: e.target.value,
            });
          }}
        />
        <label htmlFor="description">Description</label>
        <TextField
          id="description"
          variant="outlined"
          fullWidth
          placeholder="Enter Description"
          value={todo.description}
          onChange={(e) => {
            setTodo({
              ...todo,
              description: e.target.value,
            });
          }}
        />
        {!editbtn ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Add Todo
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={editTodoList}
          >
            Edit Todo
          </Button>
        )}
      </TodoCard>
      {isLoading ? (
        <Paper
          sx={{
            width: "600px",
            margin: "2rem auto",
          }}
        >
          <h1
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Loading...
          </h1>
        </Paper>
      ) : (
        <TodoList>
          <h1
            style={{
              fontSize: "20px",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Todo List
          </h1>
          <TodoTable
            todoList={todoList}
            setTodo={setTodo}
            setEditbtn={setEditbtn}
          />
        </TodoList>
      )}
    </BgColor>
  );
};

export default Todo;
