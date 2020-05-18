import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Client from '../helpers/Client';
import TaskTrackCard from '../components/cards/TaskCards/TaskTrackCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import UserContext from '../helpers/UserContext';
import getNavItems from '../helpers/getNavItems';

class MemberTracksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: {} };
  }

  async componentDidMount() {
    const tracksData = await Client.getTracks(this.props.match.params.id);
    this.setState({
      tracks: tracksData,
    });
  }

  renderTracks() {
    const { tracks } = this.state;
    if (!Object.keys(tracks).length) {
      return [];
    }

    return Object.entries(tracks).map(({ 0: id, 1: data }) => {
      return MemberTracksPage.renderTaskTrack(id, data);
    });
  }

  static renderTaskTrack(id, data) {
    const { memberTaskID, taskName, trackNote, trackDate } = data;
    return (
      <TaskTrackCard
        id={id}
        memberTaskID={memberTaskID}
        taskName={taskName}
        trackNote={trackNote}
        trackDate={trackDate}
      />
    );
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Task tracks</title>
        </Helmet>
        <UserContext>
          {({ role, userID }) => {
            return (
              <Header role={role} title='Task tracks' navItems={getNavItems({ role, userID }, this.props.match.path)} />
            );
          }}
        </UserContext>
        <ContainerComponent>
          <div>
            {Object.keys(this.state.tracks).length ? <CollapsableItemsList items={this.renderTracks()} /> : 'No tracks'}
          </div>
        </ContainerComponent>
      </>
    );
  }
}

export default withRouter(MemberTracksPage);
