import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

function Nav(props) {
  const { navItems, className } = props;

  function renderNavItems() {
    return navItems.map((el) => (
      <li className='nav-item' key={el.id}>
        <Button link={el.link} classMod={`navItem${el.active ? '_active' : ''}`}>
          {el.content}
        </Button>
      </li>
    ));
  }

  return (
    <nav className={className}>
      <ul className='list_no-type'>{renderNavItems()}</ul>
    </nav>
  );
}
Nav.defaultProps = {
  className: '',
};

Nav.propTypes = {
  className: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      link: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default Nav;
