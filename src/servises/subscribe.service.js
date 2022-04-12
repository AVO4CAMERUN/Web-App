import service from './base.services'

// Function for subscribe
async function postSubscription (idCourse) {
  return await service.genericRequestWithAuth('subscribe', 'POST', { id_course: idCourse })
}

// Function for subscribe
async function getSubscriptionByFilter (filter) {
  return await service.genericRequestWithAuth(`subscribe${filter}`, 'GET', {})
}

async function deleteSubscribtion (idCourse) {
  return await service.genericRequestWithAuth('subscribe', 'DELETE', { id_course: idCourse })
}

export const subscribeService = {
  postSubscription,
  getSubscriptionByFilter,
  deleteSubscribtion
}
