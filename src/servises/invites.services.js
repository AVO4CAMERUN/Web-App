import service from './base.services'

// Create Invite (POST)
async function createInvite (inviteObj) {
  // const { classId, users } = inviteObj
  return await service.genericRequestWithAuth('invites', 'POST', inviteObj)
}

// Function for get invites by email (by token) (GET)
async function getInviteByEmail () {
  return await service.genericRequestWithAuth('invites', 'GET', {})
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
