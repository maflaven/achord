var React = require('react'),
    KeyStore = require('../stores/KeyStore'),
    ListenToMixin = require('../mixins/ListenToMixin'),
    KeyListener = require('../util/KeyListener');
    Note = require('../util/Note');
    TONES = require('../constants/Tones');


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
