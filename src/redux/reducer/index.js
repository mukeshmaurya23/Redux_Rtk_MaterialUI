import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "../slice/todoSlice";
import loginreducer from "../slice/loginSlice";
import { todoApi } from "../slice/todoQuerySlice";
const rootReducer = combineReducers({
  // here we will be adding reducers
  todo: todoReducer,
  login: loginreducer,
  [todoApi.reducerPath]: todoApi.reducer,
});

export default rootReducer;
