/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import Button from '../../Button';
import taskEditInputsAttributes from './taskEditInputsAttributes';
import Spinner from '../../Spinner';
import checkTaskDates from '../../../../helpers/checkTaskDates';
import errorNotification from '../../../../helpers/formHelpers/errorNotification';
import inputsReducer, { updateAction } from '../../../../helpers/formHelpers/inputsReducer';

const TaskEdit = (props) => {
  const { onSubmit, empty, handleClose } = props;
  const [inputs, dispatch] = useReducer(inputsReducer, {});
  const setInputs = (data) => {
    dispatch(updateAction(data));
  };

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = (data) => {
    setLoading(true);

    if (!checkTaskDates(data.taskStart, data.taskDeadline)) {
      setLoading(false);
      errorNotification('Task dates input', 'Deadline date is set before start date');
      return new Promise((resolve) => resolve());
    }

    return onSubmit(data)
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((response) => {
        setLoading(false);
        return response;
      });
  };

  return (
    <>
      {loading ? (
        <Spinner centered />
      ) : (
        <Form
          className={`task-edit${empty ? ' empty' : ''}`}
          inputs={taskEditInputsAttributes(props)}
          onInputsUpdate={setInputs}
          onSubmit={onSubmitHandler}
          submitButton={<Button content='Confirm' classMod='secondary' />}
        >
          <div className='task-edit__header'>
            <p className='task-edit__title'>{inputs.taskName}</p>
          </div>
          <div className='task-edit__body'>
            <div className='task-edit__description'>{inputs.taskDescription}</div>
            <div className='task-edit__dates'>
              {inputs.taskStart}
              {inputs.taskDeadline}
            </div>
            <div className='task-edit__members'>{inputs.members}</div>
          </div>
          <>
            {empty || (
              <Button classMod='secondary' onClick={handleClose}>
                Cancel
              </Button>
            )}
          </>
        </Form>
      )}
    </>
  );
};

TaskEdit.defaultProps = {
  assignedTo: [],
  members: [],
  empty: false,
};

TaskEdit.propTypes = {
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
  handleClose: PropTypes.func,
};

export default TaskEdit;
