import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../../Button';
import TaskEdit from './TaskEdit';
import Modal from '../../Modal';

function TaskEditButton(props) {
  const modal = React.createRef();

  const openModal = (event) => {
    props.history.push(`/tasks/${props.taskID}/edit`);
    modal.current.handleShow();
  };

  const onClose = () => {
    props.history.goBack();
  };
  return (
    <>
      <Button classMod={props.buttonClassMod} onClick={openModal}>
        {props.children || props.buttonContent}
      </Button>
      <Modal ref={modal} show={props.show} className='task-edit' onClose={onClose}>
        <TaskEdit {...props} />
      </Modal>
    </>
  );
}

TaskEditButton.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  ...TaskEdit.propTypes,
};

export default withRouter(TaskEditButton);
