import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type SettingsState = {
  darkMode: Boolean;
};

const initialState = {
  darkMode: false,
} as SettingsState;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleDarkMode } = settingsSlice.actions;
export const darkmode = (state: RootState) => state.settings.darkMode;

export default settingsSlice.reducer;
