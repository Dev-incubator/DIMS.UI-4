import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import Modal from '../../Modal';
import TrackForm from './TrackForm';

function TrackButton(props) {
  const modal = React.createRef();

  const showModal = () => {
    modal.current.handleShow();
  };

  const { buttonContent, buttonClassMod, children, ...trackFromProps } = props;

  return (
    <>
      <Modal ref={modal} className='track-create'>
        <TrackForm {...trackFromProps} />
      </Modal>
      <Button classMod={buttonClassMod} onClick={showModal}>
        {children || buttonContent}
      </Button>
    </>
  );
}

TrackButton.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  ...TrackForm.propTypes,
};

export default TrackButton;
