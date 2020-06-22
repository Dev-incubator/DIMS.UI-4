/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import checkboxValueSeparator from '../../../../../helpers/formHelpers/checkboxValueSeparator';
import compareObjects from '../../../../../helpers/compareObjects';

function CheckboxGroup(props) {
  function renderCheckbox(valueOption, { value: commonValue, id, type, name, onChange, attributes }) {
    //* 'valueOption' variable is 'value' property of current checkbox
    /*
     * 'commonValue' is value of checkbox group by name, means array or string
     * consists of values of checked checkboxes  */
    const values = checkboxValueSeparator(commonValue);

    const onChangeHandler = (event) => {
      if (type === 'checkbox') {
        const { checked, value } = event.target;
        if (checked) {
          values.push(value);
        } else {
          values.splice(values.indexOf(value), 1);
        }
        // eslint-disable-next-line no-param-reassign
        event.target.value = values;
      }
      onChange(event);
    };

    return (
      <div key={id + valueOption.value} className='form-group'>
        <input
          id={id + valueOption.value}
          name={name}
          type={type}
          className={`form-${type}${required ? ' required' : ''}`}
          value={valueOption.value}
          onChange={onChangeHandler}
          {...attributes}
          checked={values === valueOption.value || values.includes(valueOption.value)}
        />
        <label htmlFor={id + valueOption.value}>{valueOption.label}</label>
      </div>
    );
  }

  function renderCheckboxes() {
    return props.valueOptions.map((valueOption) => renderCheckbox(valueOption, props));
  }

  const { type, id, required } = props;

  return (
    <div id={id + type} className={`${type}-group`}>
      {renderCheckboxes()}
    </div>
  );
}

CheckboxGroup.defaultProps = {
  value: null,
  onInput: () => {},
  onChange: () => {},
  required: false,
  attributes: null,
  description: null,
};

CheckboxGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,

  // String of array for checkbox and string for radio
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

  // List of buttons values in group
  valueOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  description: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  attributes: PropTypes.objectOf(PropTypes.string),
};

export default React.memo(CheckboxGroup, compareObjects);
