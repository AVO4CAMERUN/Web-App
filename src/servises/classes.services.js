import store from '@/store/index'
import service from './base.services'

// Function for create class (POST)
async function createClass (classObj) {
  // const { name, img, students, profs } = classObj
  const token = store.state.login.accessToken
  return await service.genericRequestWithAuth('classes', 'POST', classObj, token)
}

// Function for get class by filter (GET)
async function getClassesByFilter (filter, token) {
  return await service.genericRequestWithAuth(`classes?${filter}`, 'GET', {}, token) // cambiare con query string
}

// Function for update class (PUT)
async function updateClassByID (putObj) {
  return await service.genericRequest('classes', 'PUT', putObj)
}

// Function for delete class (DELETE)
async function deleteClassByID (idClass) {
  const token = store.state.login.accessToken
  return await service.genericRequestWithAuth(`classes/${idClass}`, 'DELETE', {}, token)
}

export const classesService = {
  createClass,
  getClassesByFilter,
  updateClassByID,
  deleteClassByID
}
