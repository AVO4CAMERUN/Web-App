import service from './base.services'

// Function for create course (POST)
async function createCourse (courseObj) {
  // const { name, description, img_cover: imgCover, subject } = courseObj
  return await service.genericRequestWithAuth('courses', 'POST', courseObj)
}

// Function for get course by filter (GET)
async function getCoursesSubject () {
  return await service.genericRequest('courses/subject', 'GET', {})
}
// Function for get course by filter (GET)
async function getCoursesByFilter (filter = '') {
  return await service.genericRequestWithAuth(`courses${filter}`, 'GET', {})
}

// Function for update course by id (PUT)
async function updateCourseByID () {}

// Function for delete course by id (DELETE)
async function deleteCourseByID (idCourse) {
  return await service.genericRequestWithAuth(`courses/${idCourse}`, 'DELETE', {})
}

export const coursesService = {
  createCourse,
  getCoursesByFilter,
  getCoursesSubject,
  updateCourseByID,
  deleteCourseByID
}
