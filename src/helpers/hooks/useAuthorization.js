import { useState } from 'react';
import checkRole from '../checkRole';
import notify from '../formHelpers/notify';

export default function useAuthorization({ role: defaultRole, userId: defaultId }) {
  const [user, setUser] = useState({ role: defaultRole, userId: defaultId });

  function authorize(role, userId) {
    if (!role && !userId) {
      const currentUser = JSON.parse(localStorage.getItem('userInfo'));
      if (!currentUser) {
        localStorage.removeItem('authToken');
        return;
      }
      setUser(currentUser);
    }

    if (checkRole(role)) {
      localStorage.setItem('userInfo', JSON.stringify({ role, userId }));
      setUser({ role, userId });
    } else {
      notify('error', 'Invalid role');
    }
  }

  function logOut() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('authToken');
    setUser({ role: defaultRole, userId: defaultId });
  }

  return [user, authorize, logOut];
}
