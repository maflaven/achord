var React = require('react');
var KeyStore = require('../stores/KeyStore');
var Track = require('../util/Track');
var TrackActions = require('../actions/track_actions');
var TrackPlayer = require('./TrackPlayer.jsx');


var Recorder = React.createClass({
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
    var canSave = !this.state.isRecording && this.state.Track !== null
      && !this.state.isTrackSaved;

    var trackPlayer;
    if (this.state.Track !== null && !this.state.isRecording) {
      trackPlayer = <TrackPlayer Track={this.state.Track} onTrackDelete={this.onTrackDelete} />;
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
    var track = new Track(null, null, this.setStopped);

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

    this.setState({ isTrackSaved: true });
  },
  onTrackDelete: function() {
    this.setState({
      Track: null,
      isTrackSaved: false
    });
  }
});


module.exports = Recorder;
