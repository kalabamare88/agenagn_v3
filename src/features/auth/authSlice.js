import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backEndApi from "../../services/api";
const local = "http://localhost:5000";

export const signupUser = createAsyncThunk(
  "/signUpUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${local}/signUpUser`, formData);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  `/loginUser`,
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${local}/loginUser`, formData);
      if (response.data !== "notUser") {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "admin",
          JSON.stringify({ isAdmin: response.data.isAdmin })
        );

        return response;
      } else {
        thunkAPI.getState();
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk("", async (thunkAPI) => {
  try {
    localStorage.clear();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

const initialState = {
  registerData: [],
  loginData: [],
  isRegisterFetching: false,
  isRegisterSuccess: false,
  isRegisterError: false,
  isLoginFetching: false,
  isLoginSuccess: false,
  isLoginError: false,
  registerErrorMessage: "",
  loginErrorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.isRegisterFetching = true;
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isRegisterFetching = false;
      state.isRegisterSuccess = true;
      state.registerData = payload;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isRegisterFetching = false;
      state.isRegisterError = true;
      state.registerErrorMessage = payload;
    },
    [loginUser.pending]: (state) => {
      state.isLoginFetching = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loginData = payload.data;
      state.isLoginFetching = false;
      state.isLoginSuccess = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoginFetching = false;
      state.isLoginError = true;
      state.loginErrorMessage = payload;
    },
    [logoutUser.pending]: (state) => {
      state.isLoginFetching = false;
    },
    [logoutUser.fulfilled]: (state) => {
      state.loginData = [];
      state.isLoginFetching = false;
      state.isLoginSuccess = false;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.isLoginError = true;
      state.loginErrorMessage = payload;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
