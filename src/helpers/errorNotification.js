import notify from './notify';

export default function errorNotification(description, message) {
  notify('error', `${description} invalid input`, message);
}
