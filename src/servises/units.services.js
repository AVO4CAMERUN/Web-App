import store from '@/store/index'
import service from './base.services'

// Function for create course (POST)
async function createUnits (unitObj) {
  const token = store.state.login.accessToken
  const response = await service.genericRequestWithAuth('units', 'POST', unitObj, token)
  return response
}

// Function for get units by filter (GET)
async function getUnitsByFilter (filter = '') {
  const token = store.state.login.accessToken
  return await service.genericRequestWithAuth(`units?${filter}`, 'GET', {}, token)
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
