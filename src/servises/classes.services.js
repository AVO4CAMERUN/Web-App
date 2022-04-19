import service from './base.services'

// Function for create class (POST)
async function createClass (classObj) {
  // const { name, img, students, profs } = classObj
  return await service.genericRequestWithAuth('classes', 'POST', classObj)
}

// Get my classes (GET)
async function getMyClasses () {
  return await service.genericRequestWithAuth('classes', 'GET', {}) // cambiare con query string
}

// Get class by id
async function getClassByID (id) {
  return await service.genericRequestWithAuth(`classes/${id}`, 'GET', {})
}

// Function for update class (PUT)
async function updateClassByID (id, putObj) {
  return await service.genericRequestWithAuth(`classes/${id}`, 'PUT', putObj)
}

// Function for delete class (DELETE)
async function deleteClassByID (idClass) {
  return await service.genericRequestWithAuth(`classes/${idClass}`, 'DELETE', {})
}

export const classesService = {
  createClass,
  getClassByID,
  getMyClasses,
  updateClassByID,
  deleteClassByID
}
