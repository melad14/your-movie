import { configureStore } from "@reduxjs/toolkit";
import movreducer from "./dataSlice.js";

let store = configureStore({
  reducer: {
    mov: movreducer,
  },
});

export default store;
