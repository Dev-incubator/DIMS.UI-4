const roles = ['guest', 'member', 'admin', 'mentor'];

export default function checkRole(roleCandidate) {
  return roles.includes(roleCandidate);
}
