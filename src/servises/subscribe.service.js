import service from './service'

// Function for subscribe
async function subscribe (idCourse) {
  const accessToken = localStorage.getItem('accessToken')
  return await service.genericRequestWithAuth('subscribe', 'POST', { id_course: idCourse }, accessToken)
}

// Function for subscribe
async function getSubscriptionByFilter (filter) {
  return await await service.genericRequest(`subscribe${filter}`, 'GET')
}

// get iscrizioni
// Disiscrivere

export const subscribeService = {
  subscribe,
  getSubscriptionByFilter
}
