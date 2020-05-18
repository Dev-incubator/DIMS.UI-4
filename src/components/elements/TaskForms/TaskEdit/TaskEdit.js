import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import Button from '../../Button';
import taskEditInputsAttributes from './taskEditInputsAttributes';

class TaskEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { inputs: {} };
  }

  render() {
    const { taskName } = this.props;
    const { inputs } = this.state;
    return (
      <>
        <Form
          inputs={taskEditInputsAttributes(this.props)}
          onInputsUpdate={(inputsComponents) => this.setState({ inputs: inputsComponents })}
          submitButton={<Button content='Confirm' classMod='secondary' />}
        >
          <div className='task-edit__header'>
            <p className='task-edit__title'>{taskName}</p>
          </div>
          <div className='task-edit__body'>
            <div className='task-edit__description'>{inputs.taskDescription}</div>
            <div className='task-edit__dates'>
              {inputs.taskStart}
              {inputs.taskDeadline}
            </div>
            <div className='task-edit__members'>{inputs.members}</div>
          </div>
        </Form>
      </>
    );
  }
}

TaskEdit.defaultProps = {
  assignedTo: [],
  members: [],
};

TaskEdit.propTypes = {
  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      memberTaskID: PropTypes.string,
      userID: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
  members: PropTypes.arrayOf(PropTypes.object),
};

export default TaskEdit;
