import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./autho";
export const store = configureStore({
  reducer: { adminuse: adminReducer },
});
