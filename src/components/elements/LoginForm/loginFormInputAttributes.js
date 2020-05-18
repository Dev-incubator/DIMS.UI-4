import Validator from '../../../helpers/Validator';

export default function loginFormInputAttributes() {
  return [
    { type: 'text', name: 'userName', placeholder: 'Username', description: 'Username' },
    { type: 'password', name: 'password', placeholder: 'Password', description: 'Password' },
  ];
}
