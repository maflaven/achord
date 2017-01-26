var React = require('react');
var TrackActions = require('../actions/track_actions');
var TrackName = require('./TrackName');
var TrackSlider = require('./TrackSlider');


var TrackPlayer = React.createClass({
  getInitialState: function() {
    return {
      isPlaying: false,
      isPaused: false
    };
  },
  componentDidMount: function() {
    this.props.Track.bindStopCallback(this.setStopped);
  },
  componentDidUpdate: function() {
    // necessary to re-bind even though this.props.Track changes
    // might be ripe to refactor
    this.props.Track.bindStopCallback(this.setStopped);
  },
  render: function() {
    var playPauseText = this.state.isPlaying ? "Pause Playback" : "Play";

    return (
      <div className="track-player">
        <button onClick={this.handleClickPlayPause} className="play-pause-btn">
          {playPauseText}
        </button>

        <button onClick={this.handleClickStop} className="stop-btn"
         disabled={!this.state.isPlaying && !this.state.isPaused}>
          Stop Playback
        </button>

        <button onClick={this.handleClickDelete} className="delete-btn"
          disabled={!this.props.isTrackSaved}>
          Delete
        </button>

        <TrackName Track={this.props.Track} />

        <TrackSlider Track={this.props.Track} />
      </div>
    )
  },
  handleClickPlayPause: function() {
    if (this.state.isPlaying) {
      this.props.Track.pause();
      this.setState({
        isPlaying: false,
        isPaused: true
      });
    } else {
      this.props.Track.play();
      this.setState({
        isPlaying: true,
        isPaused: false
      });
    }
  },
  handleClickStop: function() {
    if (this.state.isPlaying || this.state.isPaused) {
      this.props.Track.stop()
      this.setStopped();
    }
  },
  setStopped: function() {
    this.setState({
      isPlaying: false,
      isPaused: false
    });
  },
  handleClickDelete: function() {
    TrackActions.removeTrack(this.props.Track.id);

    (typeof this.props.onTrackDelete === 'function') && this.props.onTrackDelete();
  }
});


module.exports = TrackPlayer;
