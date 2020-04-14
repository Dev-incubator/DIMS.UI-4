import React from 'react';
import PropTypes from 'prop-types';
import CheckboxGroup from './CheckboxGroup';
import Select from './Select';
import TextArea from './TextArea';
import InputMask from './InputMask';

function Input(props) {
  const {
    id,
    type,
    name,
    description,
    onChange,
    onInput,
    required,
    label,
    attributes,
    value,
    byCharValidator,
    validator,
    valueOptions,
    minSymbols,
    maxSymbols,
    mask,
    maskType,
  } = props;

  function renderLabel(input) {
    return label ? (
      <div className='form-group'>
        <label className='form-label' htmlFor={id}>
          {label}
        </label>
        {input}
      </div>
    ) : (
      input
    );
  }

  function renderMask(input) {
    if (mask && mask !== '') {
      return InputMask(input, mask, !byCharValidator, maskType);
    }
    return input;
  }

  function renderInput() {
    if (type === 'checkbox' || type === 'radio') {
      return renderLabel(
        <CheckboxGroup
          id={id}
          type={type}
          name={name}
          description={description}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onInput={(e) => onInput(e.target.name, e.target.value)}
          required={required}
          label={label}
          attributes={attributes}
          value={value}
          byCharValidator={byCharValidator}
          validator={validator}
          valueOptions={valueOptions}
        />,
      );
    }
    if (type === 'select') {
      return renderLabel(
        <Select
          id={id}
          type={type}
          name={name}
          description={description}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onInput={(e) => onInput(e.target.name, e.target.value)}
          required={required}
          attributes={attributes}
          value={value}
          byCharValidator={byCharValidator}
          validator={validator}
          valueOptions={valueOptions}
        />,
      );
    }
    if (type === 'textarea') {
      return renderLabel(
        <TextArea
          id={id}
          name={name}
          description={description}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onInput={(e) => onInput(e.target.name, e.target.value)}
          required={required}
          attributes={attributes}
          value={value}
          minSymbols={minSymbols}
          maxSymbols={maxSymbols}
        />,
      );
    }

    const onKeyPress = (e) => {
      if (!byCharValidator(e.target.value + e.key)) {
        e.preventDefault();
      }
    };

    const onBlur = (e) => {
      if (!e.target.value) {
        return;
      }
      if (!validator(e.target.value)) {
        alert('Bad input'); //TODO temp
      }
      onChange(e.target.name, e.target.value);
    };

    const onInputHandler = (e) => {
      onInput(e.target.name, e.target.value);
    };

    return renderLabel(
      <input
        id={id}
        type={type}
        name={name}
        className='form-control'
        placeholder={description}
        required={required ? 'required' : null}
        onKeyPress={onKeyPress}
        onInput={onInputHandler}
        onBlur={onBlur}
        {...attributes}
        value={value}
      />,
    );
  }

  return renderInput();
}

Input.defaultProps = {
  onInput: () => {},
  onChange: () => {},
  required: false,
  label: false,
  attributes: [],
  value: '',
  byCharValidator: () => true,
  validator: () => true,
  minSymbols: 0,
  maxSymbols: 1000,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  label: PropTypes.string,
  attributes: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.any,
  valueOptions: PropTypes.arrayOf(PropTypes.string),
  minSymbols: PropTypes.number,
  maxSymbols: PropTypes.number,
  mask: PropTypes.string,
  maskType: PropTypes.string,

  byCharValidator: PropTypes.func,
  validator: PropTypes.func,
};

export default Input;
