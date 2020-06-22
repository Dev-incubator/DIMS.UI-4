/* eslint-disable camelcase */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import AssignForm from './AssignForm';
import checkboxValueSeparator from '../../../helpers/formHelpers/checkboxValueSeparator';
import setUsersForTask from '../../../helpers/setUsersForTask';

function AssignButton(props) {
  const { taskId, buttonClassMod, children, reload, buttonContent, members, assignedTo } = props;
  const modal = useRef({});
  const dispatch = useDispatch();

  const showModal = () => {
    modal.current.handleShow();
  };

  const closeModal = () => {
    modal.current.handleClose();
  };

  const assignUsers = ({ members: assignedMembers, members_default }) => {
    return setUsersForTask(
      dispatch,
      taskId,
      checkboxValueSeparator(assignedMembers),
      checkboxValueSeparator(members_default),
    ).then((res) => {
      closeModal();
      reload();
      return res;
    });
  };

  return (
    <>
      <Modal ref={modal}>
        <AssignForm onSubmit={assignUsers} taskId={taskId} members={members} assignedTo={assignedTo} />
      </Modal>
      <Button classMod={buttonClassMod} onClick={showModal} content={buttonContent}>
        {children}
      </Button>
    </>
  );
}

AssignButton.defaultProps = {
  buttonClassMod: null,
  buttonContent: null,
  children: null,
};

AssignButton.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  buttonClassMod: PropTypes.string,
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  reload: PropTypes.func.isRequired,
  assignedTo: PropTypes.arrayOf(PropTypes.string).isRequired,
  members: PropTypes.objectOf(PropTypes.object).isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default AssignButton;
