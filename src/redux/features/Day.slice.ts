import { createSlice } from "@reduxjs/toolkit";

const initialDayState = {
  date: new Date(),
};

const authSlice = createSlice({
  name: "day",
  initialState: initialDayState,
  reducers: {
    nextDay: (state) => {
      state.date.setDate(state.date.getDate() + 1);
    },
    previousDay: (state) => {
      state.date.setDate(state.date.getDate() - 1);
    },
    reset: () => {
      return initialDayState;
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  extraReducers: (_builder) => {},
});

export const { reset, nextDay, previousDay } = authSlice.actions;

export default authSlice.reducer;
