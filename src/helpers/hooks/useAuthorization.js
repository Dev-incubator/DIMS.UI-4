import { useState } from 'react';
import checkRole from '../checkRole';

export default function useAuthorization({ role: defaultRole, userId: defaultId }) {
  const [user, setUser] = useState({ role: defaultRole, userId: defaultId });

  function authorize(role, userId) {
    if (!role || !userId) {
      setUser(JSON.parse(localStorage.getItem('userInfo')));
    }
    if (checkRole(role)) {
      localStorage.setItem('userInfo', JSON.stringify({ role, userId }));
      setUser({ role, userId });
    }
  }

  function logOut() {
    localStorage.removeItem('userInfo');
    setUser({ role: defaultRole, userId: defaultId });
  }

  return [user, authorize, logOut];
}
