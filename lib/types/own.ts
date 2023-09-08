import { ItemSafe } from './item';

export type OwnSliceState = {
  item: ItemSafe;
  items: ItemSafe[];
  viewOwnItemMode: boolean;
};
