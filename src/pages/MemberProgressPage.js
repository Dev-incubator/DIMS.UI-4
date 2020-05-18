import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Client from '../helpers/Client';
import MemberProgressCard from '../components/cards/TaskCards/MemberProgressCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import UserContext from '../helpers/UserContext';
import getNavItems from '../helpers/getNavItems';

class MemberProgressPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: {}, id: this.props.match.params.id };
  }

  async componentDidMount() {
    const taskData = await Client.getUserProgress(this.state.id);
    this.setState({ tasks: taskData });
  }

  static WrappedMemberProgressCard({ id, taskID, taskName, trackNote, trackDate, collapsed, open, close }) {
    return (
      <UserContext.Consumer>
        {({ role }) => {
          return (
            <MemberProgressCard
              id={id}
              taskID={taskID}
              taskName={taskName}
              trackNote={trackNote}
              trackDate={trackDate}
              collapsed={collapsed}
              open={open}
              close={close}
              role={role}
            />
          );
        }}
      </UserContext.Consumer>
    );
  }

  static renderProgressCard(id, data) {
    const WrappedMemberProgressCard = MemberProgressPage.WrappedMemberProgressCard;
    return <WrappedMemberProgressCard id={id} {...data} />;
  }

  renderProgress() {
    const { tasks } = this.state;
    return Object.entries(tasks).map(({ 0: id, 1: data }) => {
      return MemberProgressPage.renderProgressCard(id, data);
    });
  }

  render() {
    const { tasks } = this.state;
    const anytask = Object.values(tasks)[0] || {};

    return (
      <>
        <Helmet>{`${anytask.userName || 'Name'}'s progress`}</Helmet>
        <UserContext>
          {({ role, userID }) => {
            return (
              <Header
                role={role}
                title={`${anytask.userName || 'Name'}'s progress`}
                navItems={getNavItems({ role, userID }, this.props.match.path)}
              />
            );
          }}
        </UserContext>
        <ContainerComponent>
          <div>{Object.keys(tasks).length ? <CollapsableItemsList items={this.renderProgress()} /> : 'No tasks'}</div>
        </ContainerComponent>
      </>
    );
  }
}

export default withRouter(MemberProgressPage);
