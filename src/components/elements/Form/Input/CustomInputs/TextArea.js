import React from 'react';
import PropTypes from 'prop-types';
import checkCharsCount from '../../../../../helpers/formHelpers/checkCharsCount';
import compareObjects from '../../../../../helpers/compareObjects';

function TextArea(props) {
  const {
    id,
    name,
    description,
    onInput,
    onChange,
    required,
    attributes,
    value,
    minSymbols,
    maxSymbols,
    onError,
  } = props;

  const onChangeHandler = (event) => {
    if (checkCharsCount(event.target.value, minSymbols, maxSymbols)) {
      onChange(event);
    } else {
      onError(event);
    }
  };

  return (
    <textarea
      id={id}
      className='form-textarea'
      name={name}
      onChange={onInput}
      onBlur={onChangeHandler}
      required={required && 'required'}
      {...attributes}
      value={value}
    >
      {description}
    </textarea>
  );
}

TextArea.defaultProps = {
  onInput: () => {},
  onChange: () => {},
  value: null,
  required: false,
  attributes: null,
  description: null,
  minSymbols: 0,
  maxSymbols: 0,
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string,
  minSymbols: PropTypes.number,
  maxSymbols: PropTypes.number,
  onError: PropTypes.func.isRequired,
};

export default React.memo(TextArea, compareObjects);
