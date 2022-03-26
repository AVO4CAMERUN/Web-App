import service from './base.services'

// Function for subscribe
async function subscribe (idCourse, accessToken) {
  return await service.genericRequestWithAuth('subscribe', 'POST', { id_course: idCourse }, accessToken)
}

// Function for subscribe
async function getSubscriptionByFilter (filter, token) {
  return await service.genericRequestWithAuth(`subscribe${filter}`, 'GET', {}, token)
}

async function deleteSubscribtion (idCourse, accessToken) {
  return await service.genericRequestWithAuth('subscribe', 'DELETE', { id_course: idCourse }, accessToken)
}

// get iscrizioni
// Disiscrivere

export const subscribeService = {
  subscribe,
  getSubscriptionByFilter,
  deleteSubscribtion
}
