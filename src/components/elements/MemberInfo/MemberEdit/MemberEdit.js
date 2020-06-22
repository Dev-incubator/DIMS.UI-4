/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import Form from '../../Form';

import { ReactComponent as FlagIcon } from '../../../../assets/icons/flag.svg';
import { ReactComponent as SkypeIcon } from '../../../../assets/icons/skype.svg';
import { ReactComponent as MobileIcon } from '../../../../assets/icons/Mobile.svg';
import { ReactComponent as AddressIcon } from '../../../../assets/icons/Address.svg';
import { ReactComponent as EnvelopeIcon } from '../../../../assets/icons/Envelope.svg';
import editMemberInputsAttributes from './editMemberInputsAttributes';
import FlexColumn from '../../FlexColumn';
import TextBadge from '../../TextBadge/TextBadge';
import inputsReducer, { updateAction } from '../../../../helpers/formHelpers/inputsReducer';

const MemberEdit = (props) => {
  const { handleClose, empty, onSubmit } = props;
  const [inputs, dispatch] = useReducer(inputsReducer, {});
  const setInputs = (data) => {
    dispatch(updateAction(data));
  };

  return (
    <Form
      className={`edit-member${empty ? ' empty' : ''}`}
      inputs={editMemberInputsAttributes(props)}
      onSubmit={onSubmit}
      onInputsUpdate={setInputs}
      submitButton={<Button content='Confirm' classMod='secondary' />}
    >
      <div className='member-info__header'>
        <p className='member-info__title'>
          <b>{inputs.firstName}</b>
          {inputs.lastName}
        </p>
        <TextBadge>{inputs.direction}</TextBadge>
        <div className='date-badge'>
          <FlagIcon className='icon-flag common-text-color' />
          {inputs.startDate}
        </div>
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
            {inputs.education}
          </div>
          <div>
            <span className='list-key'>University average score:</span>
            {inputs.universityAverageScore}
          </div>
          <div>
            <span className='list-key'>CT math score:</span>
            {inputs.mathScore}
          </div>
        </FlexColumn>
      </div>
      <>{empty || <Button content='Cancel' classMod='secondary' onClick={handleClose} />}</>
    </Form>
  );
};

MemberEdit.defaultProps = {
  id: null,
  empty: false,
};

MemberEdit.propTypes = {
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  direction: PropTypes.string,
  mobilePhone: PropTypes.string,
  skype: PropTypes.string,
  address: PropTypes.string,
  sex: PropTypes.string,
  birthDate: PropTypes.instanceOf(Date),
  education: PropTypes.string,
  universityAverageScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mathScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  empty: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
};

export default MemberEdit;
