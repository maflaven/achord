var $ = require('jquery');
var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');


var TrackStore = new Store(Dispatcher);


var tracks = {};


var addTrack = function(track) {
  if (tracks[track.name]) {
    throw new Error('Invalid track. "' + track.name + '" already exists.');
    return;
  }

  tracks[track.name] = track.roll;
  TrackStore.__emitChange();
};


var removeTrack = function(trackName) {
  if (!tracks[trackName]) {
    throw new Error('Invalid track. "' + track.name + '" doesn\'t exist.');
    return;
  }

  delete tracks[trackName];
  TrackStore.__emitChange();
};


TrackStore.getTrack = function(trackName) {
  if (!tracks[trackName]) {
    throw new Error('Invalid track. "' + track.name + '" doesn\'t exist.');
    return false;
  }

  return {
    name: trackName,
    roll: tracks[trackName].slice()
  };
}


TrackStore.getAllTracks = function() {
  return Object.keys(tracks).map(this.getTrack);
}


TrackStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "TRACK_ADD":
      addTrack(payload.track);
      break;
    case "TRACK_REMOVE":
      removeTrack(payload.trackName);
      break;
  }
};


module.exports = TrackStore;
