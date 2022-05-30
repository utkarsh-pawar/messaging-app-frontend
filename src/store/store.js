import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loadingSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
