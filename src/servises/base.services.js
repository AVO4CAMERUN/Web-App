// import store from '../store/index'

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
  // Return a parse JSON response in native JavaScript objects .json()
  return await fetch(`http://localhost/api/v1/${uri}`, optionRequest)
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
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(bodyObj) // Body
  }
  // Return a parse JSON response in native JavaScript objects .json()
  return await fetch(`http://localhost/api/v1/${uri}`, optionRequest)
  /* if (f?.status === 403) {
    store.dispatch('login/refresh')
  } */
  // return f
}

export default {
  genericRequest,
  genericRequestWithAuth
}
