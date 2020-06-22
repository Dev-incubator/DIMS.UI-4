/* eslint-disable react/no-unused-prop-types */
import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import Button from '../../Button';
import TextBadge from '../../TextBadge';
import trackFormInputsAttributes from './trackFormInputsAttributes';
import Spinner from '../../Spinner';
import inputsReducer, { updateAction } from '../../../../helpers/formHelpers/inputsReducer';

const TrackForm = (props) => {
  const { taskName, onSubmit } = props;
  const [inputs, dispatch] = useReducer(inputsReducer, {});
  const setInputs = (data) => {
    dispatch(updateAction(data));
  };

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = (data) => {
    setLoading(true);
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
      {!loading ? (
        <Form
          inputs={trackFormInputsAttributes(props)}
          onInputsUpdate={setInputs}
          submitButton={<Button content='Confirm' classMod='secondary' />}
          onSubmit={onSubmitHandler}
        >
          <div className='task-edit__header'>
            <p className='task-edit__title'>{taskName}</p>
            <TextBadge>Track</TextBadge>
          </div>
          <div className='task-edit__body'>
            <div className='task-edit__dates'>{inputs.trackDate}</div>
            <div
              className='task-edit__description'
              style={{
                width: '100%',
              }}
            >
              {inputs.trackNote}
            </div>
          </div>
        </Form>
      ) : (
        <Spinner centered />
      )}
    </>
  );
};
TrackForm.defaultProps = {
  trackDate: new Date(),
  trackNote: '',
};

TrackForm.propTypes = {
  taskName: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date),
  trackNote: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default TrackForm;
