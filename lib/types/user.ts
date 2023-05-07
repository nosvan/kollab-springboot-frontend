import { ItemSafe } from "./item";

// login
export type UserCredentials = {
  email: string;
  password: string;
};

// user register
export type UserRegister = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

// return type from server
export type UserSafe = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  isLoggedIn: boolean;
}

// iron session user
export type UserSession = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

// redux state
export type UserSliceState = {
  user: UserState,
  createNewTypeMode: boolean,
  createNewItemMode: boolean,
}

export type UserState = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  isLoggedIn: boolean;
  currentTab: string;
}

export type UserReset = {
  email: string;
  confirm_email: string;
  locationOrigin: string;
}
