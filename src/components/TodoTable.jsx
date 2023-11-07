import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoData, getTodoData } from "../redux/slice/todoSlice";

const TodoTable = (props) => {
  const { deleteStatus } = useSelector((state) => state.todo);
  const deleteDispatch = useDispatch();
  const [editTodoData, setEditTodoData] = React.useState();
  const getTodoDispatch = useDispatch();

  const editHandler = (row) => {
    setEditTodoData(row);
    // props.setEditTodoData(row)
    props.setTodo((prev) => ({
      ...prev,
      id: row.id,
      title: row.title,
      description: row.description,
    }));
    props.setEditbtn(true);
  };
  console.log(editTodoData, "editTodoData");
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Title", width: 120 },
    { field: "description", headerName: "Description", width: 120 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <Button variant="outlined" onClick={() => editHandler(params.row)}>
            Edit
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        console.log(params);

        return (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              deleteDispatch(deleteTodoData(params.row.id)) &&
                getTodoDispatch(getTodoData());
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {deleteStatus === "loading" ? (
        "Loading..."
      ) : (
        <DataGrid
          rows={props.todoList}
          columns={columns}
          pageSize={5}
          pageSizeOptions={[2, 5, 10]}
        />
      )}
    </div>
  );
};

export default TodoTable;
