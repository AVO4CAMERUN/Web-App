import service from './base.services'

// Function for create lesson (POST)
async function createLessons () {
  return await service.genericRequest('lessons', 'POST', {})
}

// Function for get units by filter (GET)
async function getLessonsByFilter (filter = '') {
  return await service.genericRequestWithAuth(`lessons${filter}`, 'GET', {})
}

// Function for update course by id (PUT)
async function updateLessonsByID () {}

// Function for delete course by id (DELETE)
async function deleteLessonsByID () {}

export const lessonService = {
  createLessons,
  getLessonsByFilter,
  updateLessonsByID,
  deleteLessonsByID
}
