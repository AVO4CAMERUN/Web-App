import service from './base.services'

// Function for login avo4cum
async function login (username, password) {
  return await service.genericRequest('login', 'POST', { username, password })
}

// Function for login avo4cum da aggiustare
async function refresh () {
  const token = localStorage.getItem('refreshToken')

  const response = await service.genericRequest('login', 'PUT', { token })
  const newToken = response.token

  // Save a new accessToken
  localStorage.setItem('accessToken', newToken)

  return newToken
} // (importantissimo da fare richieta in automatico e se fallisce sloggare)

// Function for logout avo4cum
async function logout (refreshToken) {
  return await service.genericRequest('login', 'DELETE', { token: refreshToken })
}

export const loginService = {
  login,
  refresh,
  logout
}
