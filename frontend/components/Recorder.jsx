var React = require('react');
var ListenToMixin = require('../mixins/ListenToMixin');
var KeyStore = require('../stores/KeyStore');
var Track = require('../util/Track');
var TrackActions = require('../actions/track_actions');
var TrackPlayer = require('./TrackPlayer.jsx');
var TrackStore = require('../stores/TrackStore');


var Recorder = React.createClass({
  mixins: [ListenToMixin],
  getInitialState: function() {
    return {
      isRecording: false,
      Track: null,
      isTrackSaved: false
    };
  },
  render: function() {
    var recordText = this.state.isRecording ? "Stop Recording" : "Start Recording";
    var saveText = this.state.isTrackSaved ? "Saved" : "Save Track";
    var canSave = !this.state.isRecording && this.state.Track !== null;

    var trackPlayer;
    if (this.state.Track !== null && !this.state.isRecording) {
      trackPlayer = <TrackPlayer Track={this.state.Track}
        onTrackClear={this.onTrackClear}
        isTrackSaved={this.state.isTrackSaved} />;
    }

    return (
      <div className="recorder">
        <button onClick={this.handleClickRecord} className="record-btn">
          {recordText}
        </button>
        <button onClick={this.handleClickSave} className="save-btn" disabled={!canSave}>
          {saveText}
        </button>
        {trackPlayer}
      </div>
    );
  },
  handleClickRecord: function() {
    if (this.state.isRecording) {
      this.onStopRecord();
    } else {
      this.onRecord();
    }
  },
  onRecord: function() {
    var track = new Track();

    track.startRecording();

    this.listener = KeyStore.addListener(track.addNotes.bind(track));

    this.setState({
      isRecording: true,
      Track: track
    });
  },
  onStopRecord: function() {
    this.setState({ isRecording: false });

    this.state.Track.stopRecording();

    this.listener.remove();
  },
  handleClickSave: function() {
    TrackActions.addTrack(this.state.Track);

    this.onTrackClear();
  },
  onTrackClear: function() {
    this.setState({
      Track: null,
      isTrackSaved: false
    });
  }
});


module.exports = Recorder;
