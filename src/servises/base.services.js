import store from '@/store/index'

const baseURIAPI = 'https://api.avo4camerun.kirinsecurity.com/api/v1/'

// Function for generic http requets => return a obj or err
async function genericRequest (uri, method, bodyObj) {
  // Option for http request
  const optionRequest = {
    method, // GET, POST, PUT, DELETE, etc.
    mode: 'cors', // Safety policy
    headers: { // Headers
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(bodyObj) // Body
  }
  if (method === 'GET') delete optionRequest.body

  // Return a parse JSON response in native JavaScript objects .json()
  return await fetch((baseURIAPI + uri), optionRequest)
  // return await fetch(`http://api.avo4camerun.kirinsecurity.com:8081/${uri}`, optionRequest)
}

// Function for generic http requets with Authorization header
async function genericRequestWithAuth (uri, method, bodyObj) {
  // Option for http request
  const optionRequest = {
    method, // GET, POST, PUT, DELETE, etc.
    mode: 'cors', // Safety policy
    headers: { // Headers
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${store.state.login.accessToken}`
    },
    body: JSON.stringify(bodyObj) // Body
  }

  if (method === 'GET') delete optionRequest.body

  // Return a parse JSON response in native JavaScript objects .json()
  let res = await fetch((baseURIAPI + uri), optionRequest)

  // refreshToken expired refresh
  if (res.status === 401) {
    await store.dispatch('login/refresh')
    optionRequest.headers.Authorization = `Bearer ${store.state.login.accessToken}`
    res = await fetch((baseURIAPI + uri), optionRequest)
  }
  return res
}

export default {
  genericRequest,
  genericRequestWithAuth
}
