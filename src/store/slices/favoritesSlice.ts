import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Language = {
  name: string;
  color?: string;
};
interface Repository {
  name?: string;
  url?: string;
  rating?: number;
  id?: string;
  description?: string;
  languages?: Language[];
}

type FavoritesState = Repository[];

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as FavoritesState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Repository>) => {
      const duplicate = state.find(repo => repo.id === action.payload.id);
      if (!duplicate) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<Repository>) => {
      return state.filter(repo => repo.id !== action.payload.id);
    },
    addListFavorite: (state, action: PayloadAction<FavoritesState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addFavorite, removeFavorite, addListFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
