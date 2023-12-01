import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  menuOpened: boolean;
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    menuOpened: true
  } as SettingsState,
  reducers: {
    menuToggle: (state) => {
      state.menuOpened = !state.menuOpened;
    }
  },
});

export const { menuToggle } = settingsSlice.actions;

export default settingsSlice.reducer;
