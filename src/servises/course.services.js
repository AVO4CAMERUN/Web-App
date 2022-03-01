import service from './base.services'

// Function for create course (POST) // -----------------da fare
async function createCourse (name, email, description, imgCover, subject) {
  // name, email, description, img_cover, subject
  // const token = localStorage.getItem('refreshToken')

  const response = await service.genericRequest('courses', 'POST', { name, email, description, imgCover, subject })
  return response
}

// Function for get course by filter (GET)
async function getCoursesByFilter (filter = '') {
  return await service.genericRequest(`courses${filter}`, 'GET')
}

// Function for update course by id (PUT)
async function updateCourseByID () {}

// Function for delete course by id (DELETE)
async function deleteCourseByID () {}

export const coursesService = {
  createCourse,
  getCoursesByFilter,
  updateCourseByID,
  deleteCourseByID
}
