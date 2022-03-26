import service from './base.services'

// Function for create course (POST)
async function createUnits (name, email, description, imgCover, subject) {
  // name, email, description, img_cover, subject
  // const token = localStorage.getItem('refreshToken')

  const response = await service.genericRequest('lessons', 'POST', { name, email, description, imgCover, subject })
  return response
}

// Function for get units by filter (GET)
async function getUnitsByFilter (filter = '', token) {
  return await service.genericRequestWithAuth(`units${filter}`, 'GET', {}, token)
}

// Function for update course by id (PUT)
async function updateUnitsByID () {}

// Function for delete course by id (DELETE)
async function deleteUnitsByID () {}

export const unitsService = {
  createUnits,
  getUnitsByFilter,
  updateUnitsByID,
  deleteUnitsByID
}
