var React = require('react');
var KEYMAP = require('../constants/KeyMap');
var OrganKey = require('./OrganKey.jsx');
var Recorder = require('./Recorder.jsx');
var Jukebox = require('./Jukebox.jsx');


var Organ = React.createClass({
  generateKeys: function() {
    var keys = Object.keys(KEYMAP).map( function(noteName, i) {
      return (
        <OrganKey key={i} noteName={noteName} />
      )
    });

    return keys;
  },
  render: function() {
    return (
      <div className="organ">
        <ul className="keys">
          {this.generateKeys()}
        </ul>
        <Recorder />
        <Jukebox />
      </div>
    )
  }
});


module.exports = Organ;
