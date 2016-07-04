var $ = require('jquery');
var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');


var TrackStore = new Store(Dispatcher);


var tracks = {};


var addTrack = function(track) {
  if (TrackStore.hasTrack(track.name)) {
    throw new Error('Invalid track. "' + track.name + '" already exists.');
    return;
  }

  tracks[track.name] = track.roll;
  TrackStore.__emitChange();
};


var removeTrack = function(trackName) {
  if (!TrackStore.hasTrack(trackName)) {
    throw new Error('Invalid track. "' + track.name + '" doesn\'t exist.');
    return;
  }

  delete tracks[trackName];
  TrackStore.__emitChange();
};


var updateTrackName = function(oldName, newName) {
  if (!TrackStore.hasTrack(oldName)) {
    throw new Error('Invalid track. "' + track.name + '" doesn\'t exist.');
    return false;
  }

  var track = {
    nmme: newName,
    roll: tracks[oldName].slice()
  };

  delete tracks[oldName];

  addTrack(track);
  TrackStore.__emitChange();
};


TrackStore.hasTrack = function(trackName) {
  return tracks.hasOwnProperty(trackName);
};


TrackStore.getTrack = function(trackName) {
  if (!TrackStore.hasTrack(trackName)) {
    throw new Error('Invalid track. "' + track.name + '" doesn\'t exist.');
    return false;
  }

  return {
    name: trackName,
    roll: tracks[trackName].slice()
  };
};


TrackStore.getAllTracks = function() {
  return Object.keys(tracks).map(TrackStore.getTrack);
};


TrackStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "TRACK_ADD":
      addTrack(payload.track);
      break;
    case "TRACK_REMOVE":
      removeTrack(payload.trackName);
      break;
    case "TRACK_NAME_UPDATE":
      updateTrackName(payload.oldName, payload.newName);
      break;
  }
};


module.exports = TrackStore;
