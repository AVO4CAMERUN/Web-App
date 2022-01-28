import service from './service'

// Function for login avo4cum
async function login (username, password) {
  const response = await service.genericRequest('http://localhost/api/v1/login', 'POST', { username, password })
  return response
}

// Function for login avo4cum
async function refresh () {
  const token = localStorage.getItem('refreshToken')

  const response = await service.genericRequest('http://localhost/api/v1/login', 'PUT', { token })
  const newToken = response.token

  // Save a new accessToken
  localStorage.setItem('accessToken', newToken)

  return newToken
}

// Function for logout avo4cum
async function logout () {
  const token = localStorage.getItem('refreshToken')
  return await service.genericRequest('http://localhost/api/v1/login', 'DELETE', { token })
}

export const loginService = {
  login,
  refresh,
  logout
}
