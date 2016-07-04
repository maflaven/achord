var dispatcher = require('../dispatcher/dispatcher');

module.exports = {
  addTrack: function(track) {
    dispatcher.dispatch({
      actionType: "TRACK_ADD",
      track: track
    });
  },
  removeTrack: function(trackName) {
    dispatcher.dispatch({
      actionType: "TRACK_REMOVE",
      trackName: trackName
    });
  },
  updateTrackName: function(oldName, newName) {
    dispatcher.dispatch({
      actionType: "TRACK_NAME_UPDATE",
      oldName: oldName,
      newName: newName
    });
  }
};
