import { ItemSafe } from './item';

// login
export type UserCredentials = {
  email: string;
  password: string;
};

// user register
export type UserRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// user register
export type UserRegisterError = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

// return type from server
export type UserSafe = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

// iron session user
export type UserSession = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// redux state
export type UserSliceState = {
  user: UserState;
  createNewTypeMode: boolean;
  createNewItemMode: boolean;
};

export type UserState = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isLoggedIn: boolean;
  currentTab: string;
};

export type UserReset = {
  email: string;
  confirmEmail: string;
  locationOrigin: string;
};
