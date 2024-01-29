import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlicess";
import contentsReducer from "../slices/users/contentsSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    contents: contentsReducer,
  },
});

export default store;
