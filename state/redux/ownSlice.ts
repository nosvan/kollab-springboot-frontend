import { createSlice } from '@reduxjs/toolkit';
import { ItemSafe, ItemType, VisibilityLevel } from 'lib/types/item';
import { OwnSliceState } from 'lib/types/own';

const initialState: OwnSliceState = {
  item: {
    id: -999,
    name: '',
    description: '',
    category: undefined,
    category_id: undefined,
    item_type: ItemType.GENERAL,
    date_tz_sensitive: undefined,
    date_tz_sensitive_end: undefined,
    time_sensitive_flag: false,
    date_range_flag: false,
    date_tz_insensitive: undefined,
    date_tz_insensitive_end: undefined,
    permission_level: VisibilityLevel.PUBLIC,
    created_by_id: -999,
    last_modified_by_id: -999,
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
        const itemFoundToRemove = action.payload.find(
          (itemToRemove: ItemSafe) => {
            return item.id === itemToRemove.id;
          }
        );
        return !itemFoundToRemove;
      });
      state.items = [...state.items, ...action.payload];
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
