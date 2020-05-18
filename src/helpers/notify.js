import React from 'react';
import toast from 'toasted-notes';
import Toast from '../components/elements/Toast';

export default function notify(type, title, message) {
  toast.notify(({ onClose }) => <Toast type={type} title={title} message={message} />, {
    position: 'top-right',
    duration: 3000,
  });
}
