import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Client from '../helpers/Client';
import MemberTaskCard from '../components/cards/TaskCards/MemberTaskCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import UserContext from '../helpers/UserContext';
import getNavItems from '../helpers/getNavItems';

class MemberTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: {}, taskSet: null, name: 'Name', members: [] };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    if (this.state.taskSet !== this.props.taskSet) {
      this.update();
    }
  }

  static async getName(userId) {
    return Client.getMember(userId);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.taskSet !== props.taskSet) {
      return { ...state, tasks: {}, name: 'Name' };
    }
  }

  async update() {
    let taskData;
    let { name } = this.state;
    const userId = this.props.match.params.id;
    let members;

    if (this.props.taskSet === 'user') {
      name = (await MemberTasksPage.getName(userId)).firstName;
      taskData = await Client.getUserTasks(userId);
    } else if (this.props.taskSet === 'all') {
      taskData = await Client.getTasks();
      members = Object.values(await Client.getMembers()).map((member) => {
        return { firstName: member.firstName, lastName: member.lastName };
      });
    }

    this.setState({ tasks: taskData, name, taskSet: this.props.taskSet, members });
  }

  static wrappedMemberTask = ({ collapsed, id, taskSet, members, edit, open, close, ...data }) => {
    const { taskID, taskName, taskDescription, state, taskStart, taskDeadline, assignedTo } = data;
    return (
      <UserContext.Consumer>
        {({ role }) => {
          return (
            <MemberTaskCard
              id={id}
              edit={edit}
              taskID={taskID}
              taskName={taskName}
              taskDescription={taskDescription}
              state={state}
              taskStart={taskStart}
              taskDeadline={taskDeadline}
              taskSet={taskSet}
              role={role}
              open={open}
              close={close}
              collapsed={collapsed}
              assignedTo={assignedTo}
              members={members}
            />
          );
        }}
      </UserContext.Consumer>
    );
  };

  static renderTask(id, data, taskSet, members, edit) {
    const WrappedMemberTask = MemberTasksPage.wrappedMemberTask;
    return <WrappedMemberTask id={id} taskSet={taskSet} members={members} edit={edit} {...data} />;
  }

  renderTasks() {
    const { tasks, members } = this.state;
    return Object.entries(tasks).map(({ 0: id, 1: data }) => {
      return MemberTasksPage.renderTask(id, data, this.props.taskSet, members, this.props.edit);
    });
  }

  render() {
    const { tasks, name } = this.state;
    const { taskSet } = this.props;

    return (
      <>
        <UserContext>
          {({ role, userID }) => {
            const title = role === 'member' || taskSet === 'all' ? 'Tasks' : `${name}'s tasks`;
            return (
              <>
                <Helmet>
                  <title>{title}</title>
                </Helmet>
                <Header role={role} title={title} navItems={getNavItems({ role, userID }, this.props.match.path)} />
              </>
            );
          }}
        </UserContext>
        <ContainerComponent>
          <div>
            {Object.keys(tasks).length ? (
              <CollapsableItemsList open={this.props.match.params.open} items={this.renderTasks()} />
            ) : (
              'No tasks'
            )}
          </div>
        </ContainerComponent>
      </>
    );
  }
}

MemberTasksPage.defaultProps = {
  edit: false,
};

MemberTasksPage.propTypes = {
  taskSet: PropTypes.string.isRequired,
  edit: PropTypes.bool,
};

export default withRouter(MemberTasksPage);
