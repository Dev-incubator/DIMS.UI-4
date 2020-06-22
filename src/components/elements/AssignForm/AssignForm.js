/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import assignModalInputsAttributes from './assignModalInputsAttributes';
import Form from '../Form';
import Button from '../Button';

function AssignForm(props) {
  const { onSubmit } = props;
  return (
    <Form
      className='assign-form'
      inputs={assignModalInputsAttributes(props)}
      onSubmit={onSubmit}
      submitButton={<Button classMod='secondary'>Assign</Button>}
    />
  );
}

AssignForm.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  assignedTo: PropTypes.arrayOf(PropTypes.string).isRequired,
  members: PropTypes.objectOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AssignForm;
