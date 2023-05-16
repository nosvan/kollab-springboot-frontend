import { createSlice } from '@reduxjs/toolkit';
import { ItemSafe, ItemType, VisibilityLevel } from 'lib/types/item';
import { OwnSliceState } from 'lib/types/own';

const initialState: OwnSliceState = {
  item: {
    id: -999,
    name: '',
    description: '',
    category: undefined,
    categoryId: undefined,
    itemType: ItemType.GENERAL,
    dateTzSensitive: undefined,
    dateTzSensitiveEnd: undefined,
    timeSensitiveFlag: false,
    dateRangeFlag: false,
    dateTzInsensitive: undefined,
    dateTzInsensitiveEnd: undefined,
    permissionLevel: VisibilityLevel.PUBLIC,
    createdById: -999,
    lastModifiedById: -999,
    active: false,
  },
  items: [],
  viewOwnItemMode: false,
};

export const ownSlice = createSlice({
  name: 'class',
  initialState: initialState,
  reducers: {
    setCurrentOwnItem: (state, action) => {
      console.log('payload from store: ' + action.payload);
      state.item = action.payload;
    },
    setOwnItems: (state, action) => {
      state.items = action.payload;
    },
    setAdditionalOwnItems: (state, action) => {
      state.items = state.items.filter((item: ItemSafe) => {
        return item.id !== action.payload.id;
      });
      state.items.push(action.payload);
    },
    setViewOwnItemMode: (state, action) => {
      state.viewOwnItemMode = action.payload;
    },
    removeOwnItem: (state, action) => {
      state.items = [
        ...state.items.filter((item) => item.id !== action.payload),
      ];
      if (state.items.length) state.item = { ...state.items[0] };
      else {
        state.item = { ...initialState.item };
        state.items = [];
      }
    },
    resetOwnState: (state) => {
      state.item = { ...initialState.item };
      state.items = [];
    },
  },
});

export const {
  setCurrentOwnItem,
  setOwnItems,
  setAdditionalOwnItems,
  setViewOwnItemMode,
  resetOwnState,
  removeOwnItem,
} = ownSlice.actions;

export default ownSlice.reducer;
