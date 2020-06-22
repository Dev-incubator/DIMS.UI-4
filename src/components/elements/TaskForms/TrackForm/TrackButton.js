import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import Modal from '../../Modal';
import TrackForm from './TrackForm';

function TrackButton(props) {
  const modal = React.createRef();
  const { buttonContent, buttonClassMod, children, onSubmit, ...trackFormProps } = props;

  const showModal = () => {
    modal.current.handleShow();
  };

  const handleClose = () => {
    modal.current.handleClose();
  };

  const onSubmitHandler = (data) => {
    return onSubmit(data)
      .then((res) => {
        handleClose();
        return res;
      })
      .then((res) => {
        return res;
      });
  };

  return (
    <>
      <Modal ref={modal} className='track-create'>
        <TrackForm {...trackFormProps} onSubmit={onSubmitHandler} />
      </Modal>
      <Button classMod={buttonClassMod} onClick={showModal}>
        {children || buttonContent}
      </Button>
    </>
  );
}

TrackButton.defaultProps = {
  buttonContent: null,
};

TrackButton.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  buttonClassMod: PropTypes.string.isRequired,
  ...TrackForm.propTypes,
  onSubmit: PropTypes.func.isRequired,
};

export default TrackButton;
