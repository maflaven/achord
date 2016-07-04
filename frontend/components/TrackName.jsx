var React = require('react');
var TrackActions = require('../actions/track_actions');
var KeyActions = require('../actions/key_actions');


var TrackName = React.createClass({
  getInitialState: function() {
    return {
      name: "",
      isSaved: false,
      isInputFocused: false
    };
  },
  render: function() {
    var trackNameDisplayClass = this.state.isInputFocused ?
      "hidden" : "track-name-display";
    var buttonClass = this.state.isSaved && this.state.name.length > 0 ?
      "hidden" : "save-name-btn";

    return (
      <div className="track-name-container">
        <input ref="nameInput" onInput={this.onInput} onFocus={this.disableKeyListeners}
          type="text" className="track-name-input" onBlur={this.onBlur} hidden={!this.state.isInputFocused}
          value={this.state.name} />

        <span onClick={this.onClickName} className={trackNameDisplayClass}>
          {this.state.name}
        </span>

        <button onClick={this.onClickSave} className={buttonClass}>
          Save Name
        </button>
      </div>
    );
  },
  disableKeyListeners: function(e) {
    KeyActions.listenerPressesDisable();
  },
  enableKeyListeners: function(e) {
    KeyActions.listenerPressesEnable()
  },
  onInput: function(e) {
    var newValue = this.refs.nameInput.value;
    var isSaved = newValue === this.props.Track.name;

    this.setState({
      name: newValue,
      isSaved: isSaved
    });
  },
  onClickName: function() {
    this.setState({ isInputFocused: true });
  },
  onClickSave: function() {
    if (this.state.isSaved) return;

    TrackActions.updateTrackName(this.props.Track.name, this.state.name);

    this.setState({ isSaved: true });
  },
  componentWillUnmount: function() {
    this.enableKeyListeners();
  }
});


module.exports = TrackName;
