var React = require('react');
var KeyStore = require('../stores/KeyStore');
var ListenToMixin = require('../mixins/ListenToMixin');
var KeyListener = require('../util/KeyListener');
var Note = require('../util/Note');
var TONES = require('../constants/Tones');


var OrganKey = React.createClass({
  mixins: [ListenToMixin],
  getInitialState: function() {
    return { isPressed: this.isPressed() };
  },
  isPressed: function() {
    return !!KeyStore.pressedKeys()[this.props.noteName];
  },
  _pressChanged: function() {
    this.setState({ isPressed: this.isPressed() });
  },
  componentWillMount: function() {
    this.note = new Note(TONES[this.props.noteName]);
  },
  componentDidMount: function() {
    this.keyListener = new KeyListener(this.props.noteName);
    this.listenTo(KeyStore, this._pressChanged);
  },
  render: function() {
    if (this.state.isPressed) {
      this.note.start();
    } else {
      this.note.stop();
    }

    return (
      <li className="organKey">
        <span>{ this.state.isPressed ? "O" : "X" }</span>
      </li>
    )
  },
  componentWillUnmount: function() {
    this.keyListener.removeHandlers();
  }
});

module.exports = OrganKey;
