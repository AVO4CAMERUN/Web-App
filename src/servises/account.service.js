import service from './service'

// Function for create personal avo4cum
async function createAccount (name, surname, email, username, password) {
  return await service.genericRequest('http://localhost/api/v1/account', 'POST', { name, surname, email, username, password })
}

// Function for get account by filter avo4cum
async function getFilterdAccount () {
  const uri = 'http://localhost/api/v1/account' // cambiare con query string
  return await service.genericRequest(uri, 'GET')
}

// Function for update personal account avo4cum
async function putAccount (putObj) {
  return await service.genericRequest('http://localhost/api/v1/account', 'PUT', putObj)
}

// Function for delete personal account avo4cum
async function deleteAccount () { // Authorization Bearer
  return await service.genericRequest('http://localhost/api/v1/account', 'DELETE')
}

export const accountService = {
  createAccount,
  getFilterdAccount,
  putAccount,
  deleteAccount
}
// prova1front
