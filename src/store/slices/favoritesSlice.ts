import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Favorite {
  id: string;
}

type FavoritesState = Favorite[];

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as FavoritesState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      const duplicate = state.find(repo => repo.id === action.payload.id);
      if (!duplicate) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<{ id: string }>) => {
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
