import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { ReactComponent as TasksIcon } from '../../../assets/icons/Tasks.svg';
import { ReactComponent as ProgressIcon } from '../../../assets/icons/Progress.svg';
import { ReactComponent as SkypeIcon } from '../../../assets/icons/skype.svg';
import { ReactComponent as MobileIcon } from '../../../assets/icons/Mobile.svg';
import { ReactComponent as AddressIcon } from '../../../assets/icons/Address.svg';
import { ReactComponent as EnvelopeIcon } from '../../../assets/icons/Envelope.svg';

import TextBadge from '../TextBadge';
import DateBadge from '../DateBadge';
import Button from '../Button';
import MemberEdit from './MemberEdit';
import ButtonGroup from '../ButtonGroup';
import FlexColumn from '../FlexColumn';
import Client from '../../../helpers/Client';
import DialogButton from '../DialogButton';
import Spinner from '../Spinner';
import { deleteMember } from '../../../redux/actions/membersActions';
import editMemberHelper from '../../../helpers/editMemberHelper';
import dateTypes from '../../../helpers/dateTypes';
import CopyableText from '../CopyableText';

const MemberInfo = (props) => {
  const {
    id,
    edit,
    setEdit,
    handleClose,
    role,
    firstName,
    lastName,
    email,
    startDate,
    direction,
    mobilePhone,
    skype,
    address,
    sex,
    birthDate,
    education,
    universityAverageScore,
    mathScore,
  } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onEdit = (data) => {
    setLoading(true);

    return editMemberHelper(id, data, dispatch)
      .then((response) => {
        setLoading(false);
        handleClose();
        return response;
      })
      .catch((response) => {
        setLoading(false);
        return response;
      });
  };

  const onDelete = ({ dialogValue }) => {
    dispatch(deleteMember(dialogValue));
    return Client.deleteMember(dialogValue);
  };

  const openEditModal = () => setEdit(true);

  return (
    <>
      {!loading ? (
        <>
          {edit ? (
            <MemberEdit onSubmit={onEdit} {...props} />
          ) : (
            <>
              <div className='member-info__header'>
                <p className='member-info__title'>
                  <b>{firstName}</b>
                  {` ${lastName}`}
                </p>
                <div className='badges'>
                  <TextBadge>{direction}</TextBadge>
                  <DateBadge date={startDate} type={dateTypes.startDate} />
                </div>
              </div>
              <div className='member-info__body'>
                <div className='member-info__contacts'>
                  <a title={email} href={`mailto:${email}`}>
                    <EnvelopeIcon className='icon-envelope' />
                    <CopyableText>{email}</CopyableText>
                  </a>
                  <a title={skype} href={`skype:${skype}`}>
                    <SkypeIcon className='icon-skype' />
                    {skype}
                  </a>
                  <a title={mobilePhone} href={`tel:${mobilePhone.replace(/[\s()+]/, '')}`}>
                    <MobileIcon className='icon-mobile' />
                    <span>{mobilePhone}</span>
                  </a>
                </div>
                <div className='address'>
                  <p>
                    <AddressIcon className='icon-address' />
                    {address}
                  </p>
                </div>
                <hr />
              </div>
              <div className='member-info__additional-info'>
                <FlexColumn>
                  <div>
                    <span className='list-key'>Sex:</span>
                    <span>{sex}</span>
                  </div>
                  <div>
                    <span className='list-key'>Birth date:</span>
                    <DateBadge date={birthDate} />
                  </div>
                </FlexColumn>
                <FlexColumn>
                  <div>
                    <span className='list-key'>Education:</span>
                    <span>{education}</span>
                  </div>
                  <div>
                    <span className='list-key'>University average score:</span>
                    <span>{universityAverageScore}</span>
                  </div>
                  <div>
                    <span className='list-key'>CT math score:</span>
                    <span>{mathScore}</span>
                  </div>
                </FlexColumn>
              </div>
              <ButtonGroup>
                <ButtonGroup>
                  <Button classMod='primary' link={`/members/${id}/progress`}>
                    <ProgressIcon className='icon-progress' />
                    <span>Progress</span>
                  </Button>
                  <Button classMod='primary' link={`/members/${id}/tasks`}>
                    <TasksIcon className='icon-tasks' />
                    <span>Tasks</span>
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button classMod='ghost' onClick={handleClose}>
                    Close
                  </Button>
                  {role === 'admin' && (
                    <>
                      <DialogButton
                        buttonClassMod='secondary'
                        buttonContent='Delete'
                        message={
                          // eslint-disable-next-line react/jsx-wrap-multilines
                          <>
                            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                            Are you confident, you want to delete member <b>{firstName}</b> <b>{lastName}</b>?
                          </>
                        }
                        confirmButtonClassMod='error'
                        confirmButtonContent='Delete'
                        dialogValue={id}
                        onSubmit={onDelete}
                      />
                      <Button content='Edit' classMod='secondary' onClick={openEditModal} />
                    </>
                  )}
                </ButtonGroup>
              </ButtonGroup>
            </>
          )}
        </>
      ) : (
        <Spinner centered />
      )}
    </>
  );
};

MemberInfo.defaultProps = {
  edit: false,
};

MemberInfo.propTypes = {
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
  universityAverageScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  mathScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  role: PropTypes.string.isRequired,

  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  setEdit: PropTypes.func.isRequired,
};

export default MemberInfo;
