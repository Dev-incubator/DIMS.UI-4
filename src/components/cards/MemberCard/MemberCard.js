import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../elements/Button';
import CollapsedMemberCard from './CollapsedMemberCard';
import MemberInfo from '../../elements/MemberInfo';
import Modal from '../../elements/Modal';

import { ReactComponent as ProgressIcon } from '../../../assets/icons/Progress.svg';
import { ReactComponent as TasksIcon } from '../../../assets/icons/Tasks.svg';

class MemberCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { edit: false };

    this.modal = React.createRef();
  }

  closeEditModal = () => {
    this.setState({ edit: false });
    this.modal.current.handleClose();
  };

  showEditModal = () => {
    this.modal.current.handleShow();
    this.setState({ edit: true });
  };

  showModal = () => {
    this.modal.current.handleShow();
  };

  editModal = (bool) => this.setState({ edit: !!bool });

  render() {
    const {
      id,
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
      role,
      collapsed,
      open,
      close,
    } = this.props;

    const onClick = (collapsed) => {
      collapsed ? open(id) : close(id);
    };

    return (
      <>
        <article className={`member-card${!collapsed ? '_open' : ''}`}>
          <CollapsedMemberCard
            firstName={firstName}
            lastName={lastName}
            birthDate={birthDate}
            direction={direction}
            startDate={startDate}
            onClick={onClick}
            collapsed={collapsed}
          />
          {collapsed || (
            <div className='member-card__body'>
              <Button classMod='primary' link={`/members/${id}/progress`}>
                <ProgressIcon className='icon-progress' />
                <span>Progress</span>
              </Button>
              <Button classMod='primary' link={`/members/${id}/tasks`}>
                <TasksIcon className='icon-tasks' />
                <span>Tasks</span>
              </Button>
              {role === 'admin' && (
                <>
                  <Button content='Delete' classMod='secondary' />
                  <Button content='Edit' classMod='secondary' onClick={this.showEditModal} />
                </>
              )}
              <Button content='More info' classMod='ghost' onClick={this.showModal} />
            </div>
          )}
        </article>
        <Modal ref={this.modal} className='member-info'>
          <MemberInfo
            edit={this.state.edit}
            setEdit={this.editModal}
            id={id}
            firstName={firstName}
            lastName={lastName}
            birthDate={birthDate}
            direction={direction}
            startDate={startDate}
            email={email}
            mobilePhone={mobilePhone}
            skype={skype}
            address={address}
            sex={sex}
            education={education}
            universityAverageScore={universityAverageScore}
            mathScore={mathScore}
            handleClose={this.closeEditModal}
          />
        </Modal>
      </>
    );
  }
}

const { handleClose, edit, setEdit, ...memberInfoPTypes } = MemberInfo.propTypes;

MemberCard.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  ...memberInfoPTypes,
};

export default MemberCard;
