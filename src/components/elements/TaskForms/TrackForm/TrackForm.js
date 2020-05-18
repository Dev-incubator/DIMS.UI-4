import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import Button from '../../Button';
import TextBadge from '../../TextBadge';
import Validator from '../../../../helpers/Validator';
import trackFormInputsAttributes from './trackFormInputsAttributes';

class TrackForm extends React.Component {
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
          inputs={trackFormInputsAttributes(this.props)}
          onInputsUpdate={(inputsComponents) => this.setState({ inputs: inputsComponents })}
          submitButton={<Button content='Confirm' classMod='secondary' />}
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
      </>
    );
  }
}

TrackForm.defaultProps = {
  trackDate: new Date(),
  trackNote: '',
};

TrackForm.propTypes = {
  taskName: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date),
  trackNote: PropTypes.string,
};

export default TrackForm;
