import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index";
import { todoApi } from "./slice/todoQuerySlice";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});
export default store;
