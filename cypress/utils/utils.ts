const login = () => {
  const headers = new Headers();
  headers.append('Content', 'application/x-www-form-urlencoded');
  headers.append('Accept-Encoding', 'gzip:deflate');
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  cy.request({
    url: Cypress.env('login_url'),
    method: 'POST',
    headers,
    body: {
      email: Cypress.env('email'),
      password: Cypress.env('password'),
    },
  });
  cy.log('logged in');
};

const getState = () => {
  cy.window().its('store').invoke('getState');
  cy.log('got state');
};

export { login, getState };
