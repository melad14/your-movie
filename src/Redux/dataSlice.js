
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
  trendMov: undefined,
  loading: false,
};

export let  getTrend = createAsyncThunk(
  "movies/getTrend",
  async (mediaType) => {
    let { data } = await Axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=2acf94cbe57ef067709c1573363ddb3c`
    );
    return data.results;
  }
);

let movSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTrend.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTrend.fulfilled, (state, action) => {
      state.trendMov = action.payload;
      state.loading = false;
    });
    builder.addCase(getTrend.rejected, (state) => {
      state.loading = false;
    });
  },
});

let movreducer = movSlice.reducer;

export default movreducer;
