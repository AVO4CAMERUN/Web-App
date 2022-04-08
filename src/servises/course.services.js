import service from './base.services'
import store from '@/store/index'

// Function for create course (POST)
async function createCourse (courseObj) {
  // const { name, description, img_cover: imgCover, subject } = courseObj
  const token = store.state.login.accessToken
  return await service.genericRequestWithAuth('courses', 'POST', courseObj, token)
}

// Function for get course by filter (GET)
async function getCoursesSubject () {
  return await service.genericRequest('courses/subject', 'GET', {})
}
// Function for get course by filter (GET)
async function getCoursesByFilter (filter = '', token) {
  return await service.genericRequestWithAuth(`courses${filter}`, 'GET', {}, token)
}

// Function for update course by id (PUT)
async function updateCourseByID () {}

// Function for delete course by id (DELETE)
async function deleteCourseByID (idCourse) {
  const token = store.state.login.accessToken
  return await service.genericRequestWithAuth(`courses/${idCourse}`, 'DELETE', {}, token)
}

export const coursesService = {
  createCourse,
  getCoursesByFilter,
  getCoursesSubject,
  updateCourseByID,
  deleteCourseByID
}
