import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import dashboardSlice from "./features/dashboard/dashboardSlice";
import houseSlice from "./features/house/houseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardSlice,
    house: houseSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
