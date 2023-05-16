import { createSlice } from '@reduxjs/toolkit';
import { UserSliceState } from 'lib/types/user';

const initialState: UserSliceState = {
  user: {
    id: -999,
    firstName: '',
    lastName: '',
    email: '',
    isLoggedIn: false,
    currentTab: '',
  },
  createNewTypeMode: false,
  createNewItemMode: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserState: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLoggedInStatus: (state, action) => {
      state.user.isLoggedIn = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.user.currentTab = action.payload;
    },
    setCreateNewTypeMode: (state, action) => {
      state.createNewTypeMode = action.payload;
    },
    setCreateNewItemMode: (state, action) => {
      state.createNewItemMode = action.payload;
    },
    resetUserState: (state) => {
      state.user = { ...initialState.user };
      state.createNewItemMode = false;
      state.createNewTypeMode = false;
    },
  },
});

export const {
  setUserState,
  setLoggedInStatus,
  setCurrentTab,
  setCreateNewTypeMode,
  setCreateNewItemMode,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
