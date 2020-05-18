import React from 'react';
import PropTypes from 'prop-types';
import assignModalInputsAttributes from './assignModalInputsAttributes';
import Form from '../Form/Form';
import Button from '../Button/Button';

function AssignForm(props) {
  console.log(props);
  return (
    <Form
      className='assign-form'
      inputs={assignModalInputsAttributes(props)}
      submitButton={<Button classMod='secondary'>Assign</Button>}
    />
  );
}

AssignForm.propTypes = {
  assignedTo: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
};

export default AssignForm;
