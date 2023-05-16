import { createSlice } from '@reduxjs/toolkit';
import { ListSliceState } from 'lib/types/list';
import { Category, ItemSafe, ItemType, VisibilityLevel } from 'lib/types/item';

const initialState: ListSliceState = {
  list: {
    id: -999,
    name: '',
    description: '',
    ownerId: -999,
    createdAt: undefined,
  },
  lists: [],
  item: {
    id: -999,
    name: '',
    description: '',
    category: Category.LIST,
    categoryId: -999,
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
  viewListItemMode: false,
};

export const listSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {
    setCurrentList: (state, action) => {
      state.list = { ...action.payload };
    },
    setLists: (state, action) => {
      state.lists = [...action.payload];
    },
    setCurrentListAndLists: (state, action) => {
      if (action.payload.length) {
        state.lists = [...action.payload];
        const currentListExistsInLists = state.lists.find(
          (list) => list.id === state.list.id
        );
        if (currentListExistsInLists) {
          state.list = { ...currentListExistsInLists };
        } else {
          if (state.lists.length > 0) {
            state.list = { ...state.lists[0] };
          } else {
            state.list = initialState.list;
          }
        }
      } else {
        state.list = initialState.list;
        state.lists = initialState.lists;
      }
    },
    setCurrentListItem: (state, action) => {
      state.item = { ...action.payload };
    },
    setListItems: (state, action) => {
      state.items = [...action.payload];
    },
    setAdditionalListItems: (state, action) => {
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
    setViewListItemMode: (state, action) => {
      state.viewListItemMode = action.payload;
    },
    resetListState: (state) => {
      state.list = { ...initialState.list };
      state.lists = [];
      state.item = { ...initialState.item };
      state.items = [];
    },
    removeListItem: (state, action) => {
      state.items = [
        ...state.items.filter((item) => item.id !== action.payload),
      ];
      if (state.items.length) state.item = { ...state.items[0] };
      else {
        state.item = { ...initialState.item };
        state.items = [];
      }
    },
  },
});

export const {
  setCurrentList,
  setLists,
  setCurrentListAndLists,
  setCurrentListItem,
  setListItems,
  setAdditionalListItems,
  setViewListItemMode,
  resetListState,
  removeListItem,
} = listSlice.actions;

export default listSlice.reducer;
