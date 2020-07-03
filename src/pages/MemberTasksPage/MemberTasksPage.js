import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Client from '../../helpers/Client';
import CollapsibleItemsConditionalList from '../../components/lists/CollapsibleItemsConditionalList';
import ContainerComponent from '../../components/elements/ContainerComponent';
import Header from '../../components/elements/Header';
import Spinner from '../../components/elements/Spinner/Spinner';
import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import getNavItems from '../../helpers/getNavItems';
import Footer from '../../components/elements/Footer';
import WrappedMemberTask from './WrappedMemberTask';

class MemberTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: null, taskSet: null };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    const { taskSet } = this.state;
    const { taskSet: propsTaskSet } = this.props;
    if (taskSet !== propsTaskSet) {
      this.update();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.taskSet !== props.taskSet) {
      return { ...state, tasks: null, name: 'Name' };
    }
    return state;
  }

  async update() {
    let taskData;
    const { match } = this.props;
    const userId = match.params.id;

    const { taskSet } = this.props;

    if (taskSet === 'user') {
      taskData = await Client.getUserTasks(userId);
    } else if (taskSet === 'all') {
      taskData = await Client.getTasks();
    }

    this.setState({
      tasks: taskData,
      taskSet,
    });
  }

  renderTask(id, data, taskSet, edit, members, assignedTo) {
    const updateCallback = () => {
      this.update();
    };
    return (
      <WrappedMemberTask
        id={id}
        taskSet={taskSet}
        members={members}
        assignedTo={assignedTo}
        edit={edit}
        update={updateCallback}
        {...data}
      />
    );
  }

  renderTasks() {
    const { tasks } = this.state;
    const { taskSet, edit, assignedTasks, members } = this.props;
    return Object.entries(tasks).map(([id, data]) => {
      return this.renderTask(id, data, taskSet, edit, members, assignedTasks[id]);
    });
  }

  render() {
    const { tasks } = this.state;
    const { taskSet, name, match } = this.props;

    return (
      <>
        <UserContextConsumer>
          {({ role, userId }) => {
            const title = role === 'member' || taskSet === 'all' ? 'Tasks' : `${name}'s tasks`;
            return (
              <>
                <Helmet>
                  <title>{title}</title>
                </Helmet>
                <Header role={role} title={title} navItems={getNavItems({ role, userId }, match.path)} />
              </>
            );
          }}
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {tasks ? (
              <CollapsibleItemsConditionalList
                itemsPluralName='tasks'
                open={match.params.open}
                items={this.renderTasks()}
              />
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
  name: 'Name',
  taskSet: 'all',
};

MemberTasksPage.propTypes = {
  taskSet: PropTypes.string,
  edit: PropTypes.bool,
  name: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      open: PropTypes.string,
      id: PropTypes.string,
    }),
    path: PropTypes.string,
  }).isRequired,
  assignedTasks: PropTypes.objectOf(PropTypes.array).isRequired,
  members: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withRouter(
  connect(({ members, assignedTasks }, ownProps) => {
    const member = members[ownProps.match.params.id];
    return { name: member ? member.firstName : 'Name', members, assignedTasks };
  })(MemberTasksPage),
);
