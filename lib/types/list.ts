import { ItemSafe } from './item';

export type list = {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
  passcode: string;
  createdAt: Date;
};

export type ListRegister = {
  name: string;
  description?: string;
  passcode: string;
  confirmPasscode: string;
};

export type ListJoinClient = {
  listId: string;
  passcode: string;
  confirmPasscode: string;
};

export type ListJoin = {
  listId: number;
  passcode: string;
  confirmPasscode: string;
};

// return type from server
export type ListSafe = {
  id: number;
  name: string;
  description?: string;
  ownerId: number;
  createdAt?: Date;
};

// type for redux state
export type ListSliceState = {
  list: ListSafe;
  lists: ListSafe[];
  item: ItemSafe;
  items: ItemSafe[];
  viewListItemMode: boolean;
};

export type UsersWithPermissionForList = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type CheckDataItem = {
  userId: number;
  isChecked: boolean;
};
