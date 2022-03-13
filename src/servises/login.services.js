import service from './base.services'

// Function for login avo4cum
async function login (username, password) {
  return await service.genericRequest('login', 'POST', { username, password })
}

// Function for login avo4cum da aggiustare
async function refresh (refreshToken) {
  return await service.genericRequest('login', 'PUT', { token: refreshToken })
}

// Function for logout avo4cum
async function logout (refreshToken) {
  return await service.genericRequest('login', 'DELETE', { token: refreshToken })
}

export const loginService = {
  login,
  refresh,
  logout
}
