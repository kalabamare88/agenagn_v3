import { palette } from "@mui/system";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backEndApi from "../../services/api";

export const getDashboardData = createAsyncThunk(
  "/dashboard",
  async (thunkAPI) => {
    try {
      const config = {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("token")),
        },
      };
      // thunkAPI.getState().house.houseUpdateLoading = false;
      const response = await backEndApi.get("/dashboard", config);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getFilterDashboardData = createAsyncThunk(
  "",
  async (param, thunkAPI) => {
    try {
      const config = {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("token")),
        },
        params: { filter: param },
      };
      const response = await backEndApi.get("/dashboard", config);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  filteringLoading: false,
  filteringSuccess: false,
  filteringError: false,
  errorMessage: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: {
    [getDashboardData.pending]: (state) => {
      state.isLoading = true;
    },
    [getDashboardData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload.data;
    },
    [getDashboardData.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },
    [getFilterDashboardData.pending]: (state) => {
      state.filteringLoading = true;
    },
    [getFilterDashboardData.fulfilled]: (state, { payload }) => {
      state.filteringLoading = false;
      state.filteringSuccess = true;
      state.data = payload.data;
    },
    [getFilterDashboardData.rejected]: (state, { payload }) => {
      state.filteringError = true;
      state.errorMessage = payload;
    },
  },
});

const { reducer } = dashboardSlice;
export default reducer;
