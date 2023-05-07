export const ApiRoutes = {
  RESET: '/api/account/reset',
  LOGIN: '/api/account/login',
  REGISTER: '/api/account/register',
  LOGOUT: '/api/account/logout',
};

export const OwnApiRoutes = {
  NEW_ITEM: '/api/own/item/new',
  GET_ITEMS: '/api/own/item/item',
  EDIT_ITEM: '/api/own/item/edit',
};

export const ListApiRoutes = {
  GET_LISTS: '/api/list/list',
  GET_ITEMS: '/api/list/item/item',
  NEW_ITEM: '/api/list/item/new',
  EDIT_ITEM: '/api/list/item/edit',
  JOIN_LIST: '/api/list/join',
  NEW_LIST: '/api/list/new',
  LIST_USERS: '/api/list/users',
  EDIT_PASSCODE: '/api/list/settings/passcode',
};

export const ItemApiRoutes = {
  GET_ITEM: '/api/item/item',
  GET_ITEM_PERMISSIONS: '/api/item/permissions',
  DELETE: '/api/list/item/remove',
  UPDATE_ACTIVE_STATUS: '/api/item/activestatus',
};
