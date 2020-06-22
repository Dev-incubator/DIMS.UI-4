/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../../Button';
import TaskEdit from './TaskEdit';
import Modal from '../../Modal';

function TaskEditButton(props) {
  const modal = React.createRef();

  const { onSubmit, buttonContent, buttonClassMod, reload, children, show, ...otherProps } = props;

  const openModal = () => {
    props.history.push(`/tasks/id${props.taskId}/edit`);
    modal.current.handleShow();
  };

  const onClose = () => {
    props.history.goBack();
  };

  const handleClose = () => {
    modal.current.handleClose();
  };

  const onSubmitHandler = (data) => {
    return onSubmit(data).then((res) => {
      reload();
      onClose();
      handleClose();
      return res;
    });
  };

  return (
    <>
      <Button classMod={buttonClassMod} onClick={openModal}>
        {children || buttonContent}
      </Button>
      <Modal ref={modal} show={show} onClose={onClose} className='task-edit-modal'>
        <TaskEdit onSubmit={onSubmitHandler} {...otherProps} handleClose={handleClose} />
      </Modal>
    </>
  );
}

TaskEditButton.defaultProps = {
  empty: false,
  show: false,
};

TaskEditButton.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  taskName: PropTypes.string,
  taskDescription: PropTypes.string,
  taskStart: PropTypes.instanceOf(Date),
  taskDeadline: PropTypes.instanceOf(Date),
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      memberTaskId: PropTypes.string,
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
  members: PropTypes.objectOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
  empty: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  show: PropTypes.bool,
};

export default withRouter(TaskEditButton);
