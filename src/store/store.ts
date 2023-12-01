import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { repositories } from './services/repositories';
import favoritesReducer from './slices/favoritesSlice';
import settingsReducer from './slices/settingsSlice';



export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    settings: settingsReducer,
    [repositories.reducerPath]: repositories.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(repositories.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

