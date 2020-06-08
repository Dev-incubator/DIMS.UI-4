import { matchPath } from 'react-router-dom';

const NavItems = {
  admin: [
    { id: 'Members', content: 'Members', link: '/members' },
    { id: 'Tasks', content: 'Tasks', link: '/tasks' },
    { id: 'New member', content: 'New member', link: '/members/new' },
    { id: 'New task', content: 'New task', link: '/tasks/new' },
  ],
  mentor: [
    { id: 'Members', content: 'Members', link: '/members' },
    { id: 'Tasks', content: 'Tasks', link: '/tasks' },
    { id: 'New task', content: 'New task', link: '/tasks/new' },
  ],
  member: [
    { id: 'Tasks', content: 'Tasks', link: '/members/:userId/tasks' },
    { id: 'Tracks', content: 'Tracks', link: '/members/:userId/tracks' },
  ],
  guest: [{ id: 'Login', content: 'Log In', link: '/login' }],
};

export default function getNavItems({ role, userId }, currentPath) {
  return NavItems[role].map((item) => {
    const itemCopy = { ...item };
    itemCopy.active = !!matchPath(currentPath, {
      path: itemCopy.link,
      exact: true,
      strict: false,
    });
    itemCopy.link = itemCopy.link.replace(':userId', userId);
    return itemCopy;
  });
}
