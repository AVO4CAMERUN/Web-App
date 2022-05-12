import service from './base.services'

// Function for create personal avo4cum
async function createAccount (firstname, lastname, email, username, password) {
  return await service.genericRequest('account', 'POST', { firstname, lastname, email, username, password })
}

// Function for get account by filter avo4cum
async function getFilterdAccount (query) {
  return await service.genericRequestWithAuth(`account?${query}`, 'GET', {}) // cambiare con query string
}

// Function for update personal account avo4cum
async function putAccount (putObj) {
  return await service.genericRequestWithAuth('account', 'PUT', putObj)
}

// Function for delete personal account avo4cum
async function deleteAccount () { // Authorization Bearer
  return await service.genericRequestWithAuth('account', 'DELETE', {})
}

export const accountService = {
  createAccount,
  getFilterdAccount,
  putAccount,
  deleteAccount
}
