import service from './base.services'

// Function for create class
async function createClass (name, img, students, profs) {
  return await service.genericRequest('classes', 'POST', { name, img_cover: img, students, profs })
}

// Function for get class by filter
async function getClassesByFilter (filter) {
  return await service.genericRequest(`classes?${filter}`, 'GET') // cambiare con query string
}

// Function for update class
async function updateClassByID (putObj) {
  return await service.genericRequest('classes', 'PUT', putObj)
}

// Function for delete class
async function deleteClassByID () {
  // return await service.genericRequestWithAuth('classes', 'DELETE', {}, 'token')
}

export const classesService = {
  createClass,
  getClassesByFilter,
  updateClassByID,
  deleteClassByID
}
