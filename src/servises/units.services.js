import service from './base.services'

// Function for create course (POST)
async function createUnits (unitObj) {
  return await service.genericRequestWithAuth('units', 'POST', unitObj)
}

// Function for get units by filter (GET)
async function getUnitsByFilter (filter = '') {
  return await service.genericRequestWithAuth(`units?${filter}`, 'GET', {})
}

// Function for update course by id (PUT)
async function updateUnitsByID (id, unitObj) {
  return await service.genericRequestWithAuth(`units/${id}`, 'PUT', unitObj)
}

// Function for delete course by id (DELETE)
async function deleteUnitsByID (id, courseID) {
  return await service.genericRequestWithAuth(`units/${id}`, 'DELETE', { id_course: courseID })
}

export const unitsService = {
  createUnits,
  getUnitsByFilter,
  updateUnitsByID,
  deleteUnitsByID
}
