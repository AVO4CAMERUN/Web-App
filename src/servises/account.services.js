import service from './base.services'

// Function for create personal avo4cum
async function createAccount (name, surname, email, username, password) {
  return await service.genericRequest('account', 'POST', { name, surname, email, username, password })
}

// Function for get account by filter avo4cum
async function getFilterdAccount (query) {
  return await service.genericRequest(`account?${query}`, 'GET') // cambiare con query string
}

// Function for update personal account avo4cum
async function putAccount (putObj, accessToken) {
  return await service.genericRequestWithAuth('account', 'PUT', putObj, accessToken)
}

// Function for delete personal account avo4cum
async function deleteAccount () { // Authorization Bearer
  return await service.genericRequestWithAuth('account', 'DELETE', {}, 'token')
}

export const accountService = {
  createAccount,
  getFilterdAccount,
  putAccount,
  deleteAccount
}
