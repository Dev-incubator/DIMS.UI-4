import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import AssignForm from './AssignForm';

function AssignButton(props) {
  const { buttonClassMod, children, buttonContent, ...assignFormProps } = props;
  console.log(assignFormProps);
  const modal = React.createRef();
  const showModal = (event) => {
    modal.current.handleShow();
  };
  return (
    <>
      <Modal ref={modal}>
        <AssignForm {...assignFormProps} />
      </Modal>
      <Button classMod={buttonClassMod} onClick={showModal} content={buttonContent}>
        {children}
      </Button>
    </>
  );
}

AssignButton.propTypes = {
  buttonClassMod: PropTypes.string,
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ...AssignForm.propTypes,
};

export default AssignButton;
