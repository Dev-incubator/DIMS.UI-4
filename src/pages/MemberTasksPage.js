import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Client from '../helpers/Client';
import MemberTaskCard from '../components/cards/TaskCards/MemberTaskCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import Spinner from '../components/elements/Spinner/Spinner';
import UserContextConsumer from '../helpers/UserContextConsumer';
import getNavItems from '../helpers/getNavItems';
import Footer from '../components/elements/Footer';

class MemberTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: null, taskSet: null, name: 'Name', members: [] };
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
      return { ...state, tasks: null, name: 'Name' };
    }
    return state;
  }

  async update() {
    let taskData;
    let { name } = this.state;
    const userId = this.props.match.params.id;
    let members;

    const { taskSet } = this.props;

    if (taskSet === 'user') {
      name = (await MemberTasksPage.getName(userId)).firstName;
      taskData = await Client.getUserTasks(userId);
    } else if (taskSet === 'all') {
      taskData = await Client.getTasks();
      members = Object.values(await Client.getMembers()).map((member) => {
        return { firstName: member.firstName, lastName: member.lastName };
      });
    }

    this.setState({ tasks: taskData, name, taskSet: this.props.taskSet, members });
  }

  wrappedMemberTask = ({ collapsed, id, taskSet, members, edit, open, close, ...data }) => {
    const { taskID, taskName, taskDescription, state, taskStart, taskDeadline, assignedTo } = data;
    return (
      <UserContextConsumer>
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
      </UserContextConsumer>
    );
  };

  renderTask(id, data, taskSet, members, edit) {
    const WrappedMemberTask = this.wrappedMemberTask;
    return <WrappedMemberTask id={id} taskSet={taskSet} members={members} edit={edit} {...data} />;
  }

  renderTasks() {
    const { tasks, members } = this.state;
    return Object.entries(tasks).map(({ 0: id, 1: data }) => {
      return this.renderTask(id, data, this.props.taskSet, members, this.props.edit);
    });
  }

  render() {
    const { tasks, name } = this.state;
    const { taskSet } = this.props;
    return (
      <>
        <UserContextConsumer>
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
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {tasks ? (
              <div>
                {Object.keys(tasks).length ? (
                  <CollapsableItemsList open={this.props.match.params.open} items={this.renderTasks()} />
                ) : (
                  'No tasks'
                )}
              </div>
            ) : (
              <Spinner centered />
            )}
          </ContainerComponent>
        </main>
        <Footer />
      </>
    );
  }
}

MemberTasksPage.defaultProps = {
  edit: false,
  taskSet: 'all',
};

MemberTasksPage.propTypes = {
  taskSet: PropTypes.string,
  edit: PropTypes.bool,
};

export default withRouter(MemberTasksPage);
