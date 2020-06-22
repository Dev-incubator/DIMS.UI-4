import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

function CreateInput(props) {
  const { id } = props;
  return <Input key={id} {...props} />;
}

CreateInput.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CreateInput;
