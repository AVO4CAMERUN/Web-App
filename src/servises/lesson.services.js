import service from './base.services'

// Function for create lesson (POST)
async function createLessons (body) {
  return await service.genericRequestWithAuth('lessons', 'POST', body)
}

// Function for get units by filter (GET)
async function getLessonsByFilter (filter = '') {
  return await service.genericRequestWithAuth(`lessons?${filter}`, 'GET', {})
}

// Function for update course by id (PUT)
async function updateLessonsByID (filter, body) {
  return await service.genericRequestWithAuth(`lessons/${filter}`, 'PUT', body)
}

// Function for delete course by id (DELETE)
async function deleteLessonsByID (filter, obj) {
  return await service.genericRequestWithAuth(`lessons/${filter}`, 'DELETE', obj)
}

export const lessonService = {
  createLessons,
  getLessonsByFilter,
  updateLessonsByID,
  deleteLessonsByID
}
