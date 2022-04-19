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

// Accept Invite by invite ID (GET)
async function acceptInviteByID (id) {
  return await service.genericRequestWithAuth(`invites/${id}`, 'GET', {})
}

// Accept Invite by invite ID (DELETE)
async function rejectInviteByID (id) {
  return await service.genericRequestWithAuth(`invites/${id}`, 'DELETE', {})
}

export const invitesServices = {
  createInvite,
  getInviteByEmail,
  acceptInviteByID,
  rejectInviteByID
}
