import React from 'react';
import PropTypes from 'prop-types';
import checkboxValueSeparator from '../../../helpers/checkboxValueSeparator';

function CheckboxGroup(props) {
  function renderCheckbox(currentValue, { value: commonValue, id, type, name, onInput, attributes }) {
    //* 'value' variable is 'value' property of current checkbox
    /*
     * 'commonValue' is value of checkbox group by name, means array or string
     * consists of values of checked checkboxes  */
    const values = checkboxValueSeparator(commonValue);

    const onChange = (event) => {
      if (type === 'checkbox') {
        const { checked, value } = event;
        if (checked) {
          values.push(value);
        } else {
          values.splice(values.indexOf(value), 1);
        }
        event.target.value = values;
      }
      onInput(event);
    };
    return (
      <div key={currentValue} className='form-group'>
        <input
          id={id + currentValue}
          name={name}
          type={type}
          className={`form-${type}`}
          value={currentValue}
          onChange={onChange}
          {...attributes}
          checked={values === currentValue || values.includes(currentValue)}
        />
        <label htmlFor={id + currentValue}>{currentValue}</label>
      </div>
    );
  }

  function renderCheckboxes() {
    return props.valueOptions.map((value) => renderCheckbox(value, props));
  }

  const { type, id } = props;

  return (
    <div id={id + type} className={`${type}-group`}>
      {renderCheckboxes()}
    </div>
  );
}

CheckboxGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,

  // String of array for checkbox and string for radio
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

  // List of buttons values in group
  valueOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
};

export default CheckboxGroup;
