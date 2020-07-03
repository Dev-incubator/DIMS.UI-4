import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as MenuIcon } from '../../../assets/icons/menu.svg';

import Button from '../Button';
import Modal from '../Modal';

function Nav(props) {
  const { navItems, className } = props;
  const modal = React.createRef();

  const toggleModal = () => {
    modal.current.toggle();
  };

  function renderNavItems() {
    return navItems.map(({ id, link, active, content, button }) => (
      <li className='nav-item' key={id}>
        {button || (
          <Button link={link} classMod={`navItem${active ? '_active' : ''}`}>
            {content}
          </Button>
        )}
      </li>
    ));
  }

  return (
    <div className={className}>
      <Modal ref={modal} backface={false} className='nav-modal'>
        <nav className={className}>
          <ul className='list_no-type'>{renderNavItems()}</ul>
        </nav>
      </Modal>
      <Button classMod='invisible' onClick={toggleModal}>
        <MenuIcon className='icon-menu' />
      </Button>
    </div>
  );
}
Nav.defaultProps = {
  className: '',
  button: null,
};

Nav.propTypes = {
  className: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      link: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      active: PropTypes.bool.isRequired,
      button: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    }),
  ).isRequired,
};

export default Nav;
