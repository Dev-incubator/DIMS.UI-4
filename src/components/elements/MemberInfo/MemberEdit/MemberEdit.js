import React from 'react';
import PropTypes from 'prop-types';

import Validator from '../../../../helpers/Validator';
import Button from '../../Button';
import Form from '../../Form';

import { ReactComponent as FlagIcon } from '../../../../assets/icons/flag.svg';
import { ReactComponent as SkypeIcon } from '../../../../assets/icons/skype.svg';
import { ReactComponent as MobileIcon } from '../../../../assets/icons/Mobile.svg';
import { ReactComponent as AddressIcon } from '../../../../assets/icons/Address.svg';
import { ReactComponent as EnvelopeIcon } from '../../../../assets/icons/Envelope.svg';
import editMemberInputsAttributes from './editMemberInputsAttributes';
import FlexColumn from '../../FlexColumn';

class MemberEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputs: {} };
  }

  render() {
    const { handleClose } = this.props;

    const { inputs } = this.state;

    return (
      <Form
        className='edit-member'
        inputs={editMemberInputsAttributes(this.props)}
        onInputsUpdate={(inputsComponents) => this.setState({ inputs: inputsComponents })}
        submitButton={<Button content='Confirm' classMod='secondary' />}
      >
        <div className='member-info__header'>
          <p className='member-info__title'>
            <b>{inputs.firstName}</b>
            {inputs.lastName}
          </p>
          <div className='date-badge'>
            <FlagIcon className='icon-flag common-text-color' />
            {inputs.startDate}
          </div>
          <div className='direction-badge'>{inputs.direction}</div>
        </div>
        <div className='member-info__body'>
          <div className='member-info__contacts'>
            <span>
              <EnvelopeIcon className='icon-envelope' />
              <span>{inputs.email}</span>
            </span>
            <span>
              <SkypeIcon className='icon-skype' />
              {inputs.skype}
            </span>
            <span>
              <MobileIcon className='icon-mobile' />
              <span>{inputs.mobilePhone}</span>
            </span>
          </div>
          <div>
            <p className='address'>
              <AddressIcon className='icon-address' />
              {inputs.address}
            </p>
            <hr />
          </div>
        </div>
        <div className='member-info__additional-info'>
          <FlexColumn>
            <div>
              <span className='list-key'>Sex:</span>
              <span>{inputs.sex}</span>
            </div>
            <div>
              <span className='list-key'>Birth date:</span>
              {inputs.birthDate}
            </div>
          </FlexColumn>
          <FlexColumn>
            <div>
              <span className='list-key'>Education:</span>
              <span>{inputs.education}</span>
            </div>
            <div>
              <span className='list-key'>University average score:</span>
              <span>{inputs.universityAverageScore}</span>
            </div>
            <div>
              <span className='list-key'>CT math score:</span>
              <span>{inputs.mathScore}</span>
            </div>
          </FlexColumn>
        </div>
        <Button content='Cancel' classMod='secondary' onClick={handleClose} />
      </Form>
    );
  }
}

MemberEdit.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  mobilePhone: PropTypes.string.isRequired,
  skype: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  education: PropTypes.string.isRequired,
  universityAverageScore: PropTypes.number.isRequired,
  mathScore: PropTypes.number.isRequired,

  handleClose: PropTypes.func,
};

export default MemberEdit;
