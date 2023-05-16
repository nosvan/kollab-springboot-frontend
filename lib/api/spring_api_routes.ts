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
  ITEM_GET_ALL_OWN: host_api + '/item/getallown',
  ITEM_CREATE: host_api + '/item/create',
  ITEM_DELETE: host_api + '/item/delete',
  ITEM_UPDATE: host_api + '/item/update',
};
