import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ownReducer from './ownSlice';
import listReducer from './listSlice';

export const store = configureStore({
  reducer: {
    user_store: userReducer,
    list_store: listReducer,
    own_store: ownReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch   