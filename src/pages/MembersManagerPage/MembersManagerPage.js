import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CollapsibleItemsConditionalList from '../../components/lists/CollapsibleItemsConditionalList';
import ContainerComponent from '../../components/elements/ContainerComponent';
import Header from '../../components/elements/Header';
import Spinner from '../../components/elements/Spinner';
import getNavItems from '../../helpers/getNavItems';
import Footer from '../../components/elements/Footer';
import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import WrappedMemberCard from './WrappedMemberCard';
import filterMembers from '../../helpers/filterMembers';

class MembersManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterString: null };
  }

  setFilterString = (filterString) => {
    this.setState({ filterString });
  };

  renderMembers(filterString) {
    const { members } = this.props;

    if (!Object.keys(members).length) {
      return [];
    }

    let membersArray;
    if (filterString) {
      membersArray = Object.entries(members).filter(([id, data]) => {
        return filterMembers(data, filterString) ? [id, data] : null;
      });
    } else {
      membersArray = Object.entries(members);
    }

    const membersList = membersArray.map(([id, data]) => {
      return <WrappedMemberCard id={id} {...data} />;
    });

    return membersList;
  }

  render() {
    const {
      members,
      match: { path },
    } = this.props;
    const { filterString } = this.state;

    return (
      <>
        <Helmet>
          <title>Members</title>
        </Helmet>
        <UserContextConsumer>
          {({ role, userId }) => {
            return (
              <Header
                role={role}
                title='Members'
                filterFunction={this.setFilterString}
                navItems={getNavItems({ role, userId }, path)}
              />
            );
          }}
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {members ? (
              <CollapsibleItemsConditionalList itemsPluralName='members' items={this.renderMembers(filterString)} />
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

MembersManagerPage.propTypes = {
  members: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(
  connect((state) => {
    return { members: state.members };
  })(MembersManagerPage),
);
