import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Client from '../../helpers/Client';
import CollapsibleItemsConditionalList from '../../components/lists/CollapsibleItemsConditionalList';
import ContainerComponent from '../../components/elements/ContainerComponent';
import Header from '../../components/elements/Header';
import Spinner from '../../components/elements/Spinner';
import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import getNavItems from '../../helpers/getNavItems';
import Footer from '../../components/elements/Footer';
import WrappedMemberProgressCard from './WrappedMemberProgressCard';

class MemberProgressPage extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.state = { tasks: null, id: match.params.id };
  }

  async componentDidMount() {
    const { id } = this.state;
    const taskData = await Client.getUserProgress(id);
    this.setState({ tasks: taskData });
  }

  renderProgress() {
    const { tasks } = this.state;
    return Object.entries(tasks).map(([id, data]) => {
      return <WrappedMemberProgressCard id={id} {...data} />;
    });
  }

  render() {
    const { tasks } = this.state;
    const { match, name } = this.props;

    return (
      <>
        <Helmet>{`${name}'s progress`}</Helmet>
        <UserContextConsumer>
          {({ role, userId }) => {
            return (
              <Header role={role} title={`${name}'s progress`} navItems={getNavItems({ role, userId }, match.path)} />
            );
          }}
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {tasks ? (
              <CollapsibleItemsConditionalList itemsPluralName='progress' items={this.renderProgress()} />
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

MemberProgressPage.defaultProps = {
  name: 'Name',
};

MemberProgressPage.propTypes = {
  name: PropTypes.string,
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(
  connect(({ members }, ownProps) => {
    const member = members[ownProps.match.params.id];
    return { name: member ? member.firstName : 'Name' };
  })(MemberProgressPage),
);
