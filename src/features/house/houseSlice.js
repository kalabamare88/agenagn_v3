import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backEndApi from "../../services/api";
const local = "http://localhost:5000";

export const addHouse = createAsyncThunk(
  "/addhouse",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/addhouse",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            "x-access-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log(response, "eqwfewfefwef");
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const addHouseImg = createAsyncThunk(
  "/uploadHouseImage",
  async (formData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          "x-access-token": JSON.parse(localStorage.getItem("token")),
        },
      };
      let resImage = await axios.post(
        "http://localhost:5000/uploadHouseImage",
        formData,
        config
      );
      return resImage;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const houseDetail = createAsyncThunk(
  "/admindetail",
  async (id, thunkAPI) => {
    try {
      const response = await backEndApi.get(`${local}/admindetail`, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("token")),
        },
        params: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editHouse = createAsyncThunk(
  "/edithouse",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${local}/edithouse`, {
        headers: {
          "content-type": "multipart/form-data",
          "x-access-token": JSON.parse(localStorage.getItem("token")),
        },
        params: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editHouseUpdate = createAsyncThunk(
  "/editHouseUpdate",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${local}/editHouseUpdate`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          "x-access-token": JSON.parse(localStorage.getItem("token")),
        },
      });
      console.log(thunkAPI.getState().house.houseUpdateLoading);
      console.log(response, "update House");

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  houseData: [],

  addHouseIsLoading: false,
  addHouseIsSuccess: false,
  addHouseIsFail: false,

  uploadImgIsLoading: false,
  uploadImgIsSuccess: false,
  uploadImgIsFail: false,

  houseDetailIsLoading: false,
  houseDetailIsSuccess: false,
  houseDetailIsFail: false,

  houseUpdateLoading: false,
  houseUpdateSuccess: false,
  houseUpdateFail: false,

  errorMessage: "",
};

const houseSlice = createSlice({
  name: "house",
  initialState,
  extraReducers: {
    [addHouse.pending]: (state) => {
      state.addHouseIsLoading = true;
    },
    [addHouse.fulfilled]: (state, { payload }) => {
      state.addHouseIsLoading = false;
      state.addHouseIsSuccess = true;
    },
    [addHouse.rejected]: (state, { payload }) => {
      state.addHouseIsFail = true;
      state.errorMessage = payload;
    },

    [addHouseImg.pending]: (state) => {
      state.uploadImgIsLoading = true;
    },
    [addHouseImg.fulfilled]: (state, { payload }) => {
      state.uploadImgIsLoading = false;
      state.uploadImgIsSuccess = true;
    },
    [addHouseImg.rejected]: (state, { payload }) => {
      state.uploadImgIsFail = true;
      state.errorMessage = payload;
    },

    [houseDetail.pending]: (state) => {
      state.houseDetailIsLoading = true;
    },
    [houseDetail.fulfilled]: (state, { payload }) => {
      state.houseDetailIsLoading = false;
      state.houseDetailIsSuccess = true;
      console.log(payload);
      state.houseData = payload.data;
    },
    [houseDetail.rejected]: (state, { payload }) => {
      state.houseDetailIsFail = true;
      state.errorMessage = payload;
    },

    //Edit house loading
    [editHouse.pending]: (state) => {
      state.houseDetailIsLoading = true;
    },
    [editHouse.fulfilled]: (state, { payload }) => {
      state.houseDetailIsLoading = false;
      state.houseDetailIsSuccess = true;
      console.log(payload);
      state.houseData = payload.data;
    },
    [editHouse.rejected]: (state, { payload }) => {
      state.houseDetailIsFail = true;
      state.errorMessage = payload;
    },

    //Edit house update
    [editHouseUpdate.pending]: (state) => {
      state.houseUpdateLoading = true;
      state.houseUpdateSuccess = false;
    },
    [editHouseUpdate.fulfilled]: (state, { payload }) => {
      state.houseUpdateLoading = false;
      state.houseUpdateSuccess = true;
      // state.houseData = [];
    },
    [editHouseUpdate.rejected]: (state, { payload }) => {
      state.houseUpdateFail = true;
      state.errorMessage = payload;
    },
  },
});

const { reducer } = houseSlice;
export default reducer;
