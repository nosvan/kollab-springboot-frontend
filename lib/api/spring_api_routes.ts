const host = 'http://localhost:8080';
const api = '/api';
const host_api = `${host}${api}`;
export const SpringApiRoutes = {
  LOGIN: host + '/login',
  REGISTER: host + '/register',
  LOGOUT: host + '/logout',
  USERS: host_api + '/users',
};

export const SpringItemApiRoutes = {
  ITEM_GET: host_api + '/item/get',
  ITEM_GET_PERMISSIONS: host_api + '/item/get-permissions',
  ITEM_GET_ALL_OWN: host_api + '/item/get-all-own',
  ITEM_CREATE: host_api + '/item/create',
  ITEM_DELETE: host_api + '/item/delete',
  ITEM_UPDATE: host_api + '/item/update',
};

export const SpringListApiRoutes = {
  LIST_GET: host_api + '/list/get',
  LIST_GET_USERS: host_api + '/list/get-users',
  LIST_GET_LISTS: host_api + '/list/get-lists',
  LIST_GET_ITEMS: host_api + '/list/get-items',
  LIST_GET_ALL_OWN: host_api + '/list/get-all-own',
  LIST_CREATE: host_api + '/list/create',
  LIST_DELETE: host_api + '/list/delete',
  LIST_UPDATE: host_api + '/list/update',
  LIST_JOIN: host_api + '/list/join',
  LIST_EDIT_PASSCODE: host_api + '/list/edit-passcode',
};
