import service from './base.services'

// Create Invite (POST)
async function createInvite (inviteObj) {
  // const { classId, users } = inviteObj
  return await service.genericRequestWithAuth('invites', 'POST', inviteObj)
}

// Function for get class by filter (GET)
async function getInviteByEmail (filter) {
  // return await service.genericRequestWithAuth(`invites?${filter}`, 'GET', {}) // cambiare con query string
}

// Function for update class (PUT)
async function acceptInviteByID (id, putObj) {
  // return await service.genericRequestWithAuth(`invites/${id}`, 'PUT', putObj)
}

// Function for delete class (DELETE)
async function rejectInviteByID (idClass) {
  // return await service.genericRequestWithAuth(`invites/${idClass}`, 'DELETE', {})
}

export const invitesServices = {
  createInvite,
  getInviteByEmail,
  acceptInviteByID,
  rejectInviteByID
}
