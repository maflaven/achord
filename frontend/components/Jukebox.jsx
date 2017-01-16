var React = require('react');
var ListenToMixin = require('../mixins/ListenToMixin');
var TrackPlayer = require('./TrackPlayer.jsx');
var TrackStore = require('../stores/TrackStore');
var Track = require('../util/Track');


var Jukebox = React.createClass({
  mixins: [ListenToMixin],
  getInitialState: function() {
    return {
      tracks: TrackStore.getAllTracks()
    };
  },
  _tracksChanged: function() {
    this.setState({ tracks: TrackStore.getAllTracks() });
  },
  componentDidMount: function() {
    this.listenTo(TrackStore, this._tracksChanged);
  },
  generateTrackPlayers: function() {
    return this.state.tracks.map( function(track, i) {
      console.log(track);
      return <TrackPlayer key={i} Track={track} isTrackSaved="true" />
    });
  },
  render: function() {
    return (
      <div className="jukebox">
        {this.generateTrackPlayers()}
      </div>
    );
  }
});


module.exports = Jukebox;
