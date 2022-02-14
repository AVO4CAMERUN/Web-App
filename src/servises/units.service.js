import service from './service'

// Function for create course (POST) // -----------------da fare
async function createUnits (name, email, description, imgCover, subject) {
  // name, email, description, img_cover, subject
  // const token = localStorage.getItem('refreshToken')

  const response = await service.genericRequest('lessons', 'POST', { name, email, description, imgCover, subject })
  return response
}

// Function for get units by filter (GET)
async function getUnitsByFilter (filter = '') {
  return await service.genericRequest(`units${filter}`, 'GET')
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
