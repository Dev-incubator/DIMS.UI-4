import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../../Button';
import TaskEdit from './TaskEdit';
import Modal from '../../Modal';

function TaskEditButton(props) {
  const modal = React.createRef();

  const { onSubmit, buttonContent, buttonClassMod, ...otherProps } = props;

  const openModal = (event) => {
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
      <Button classMod={buttonClassMod} onClick={openModal}>
        {props.children || buttonContent}
      </Button>
      <Modal ref={modal} show={props.show} className='task-edit' onClose={onClose}>
        <TaskEdit onSubmit={onSubmitHandler} {...otherProps} />
        <Button classMod='secondary' onClick={handleClose}>
          Cancel
        </Button>
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
