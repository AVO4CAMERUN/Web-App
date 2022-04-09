import store from '@/store/index'

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
  return await fetch(`http://localhost/api/v1/${uri}`, optionRequest)
  // return await fetch(`http://api.avo4camerun.kirinsecurity.com:8081/${uri}`, optionRequest)
}

// Function for generic http requets with Authorization header
async function genericRequestWithAuth (uri, method, bodyObj, token) {
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
  // return await fetch(`http://api.avo4camerun.kirinsecurity.com:8081/api/v1/${uri}`, optionRequest)
  let res = await fetch(`http://localhost/api/v1/${uri}`, optionRequest)

  if (res.status === 401) {
    await store.dispatch('login/refresh')
    res = await fetch(`http://localhost/api/v1/${uri}`, optionRequest)
  }
  console.log(res)
  return res
}

export default {
  genericRequest,
  genericRequestWithAuth
}
