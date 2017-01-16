var dispatcher = require('../dispatcher/dispatcher');

module.exports = {
  addTrack: function(track) {
    dispatcher.dispatch({
      actionType: "TRACK_ADD",
      track: track
    });
  },
  removeTrack: function(trackId) {
    dispatcher.dispatch({
      actionType: "TRACK_REMOVE",
      trackId: trackId
    });
  },
  updateTrack: function(options) {
    dispatcher.dispatch({
      actionType: "TRACK_UPDATE",
      options: options
    });
  }
};
