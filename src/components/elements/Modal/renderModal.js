import React from 'react';

export default function renderModal(show, className, style, children) {
  return (
    <article className={`modal ${show ? 'show' : ''} ${className || ''}`} style={style}>
      {children}
    </article>
  );
}
