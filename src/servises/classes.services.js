import service from './base.services'

// Function for create class (POST)
async function createClass (classObj) {
  // const { name, img, students, profs } = classObj
  return await service.genericRequestWithAuth('classes', 'POST', classObj)
}

// Function for get class by filter (GET)
async function getClassesByFilter (filter) {
  return await service.genericRequestWithAuth(`classes?${filter}`, 'GET', {}) // cambiare con query string
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
  getClassesByFilter,
  updateClassByID,
  deleteClassByID
}
