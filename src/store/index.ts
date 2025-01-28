'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import data from './data';

const rootReducer = combineReducers({
  data,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
