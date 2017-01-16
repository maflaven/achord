var _ = require('underscore');
var $ = require('jquery');
var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');


var TrackStore = new Store(Dispatcher);


var tracks = {};
var newTrackIndex = 0;


var addTrack = function(track) {
  if ( TrackStore.hasTrack({ name: track.name }) ) {
    throw new Error('Invalid track. "' + track.name + '" already exists.');
    return;
  }

  track.id = newTrackIndex;
  newTrackIndex++;
  tracks[track.id] = track;

  TrackStore.__emitChange();
};


var removeTrack = function(trackId) {
  if ( !TrackStore.hasTrackId(trackId) ) {
    throw new Error('Invalid track. ID "' + trackId + '" doesn\'t exist.');
    return false;
  }

  delete tracks[trackId];

  TrackStore.__emitChange();
};


var updateTrack = function(options) {
  if ( !TrackStore.hasTrackId(options.id) ) {
    throw new Error('Invalid track. ID "' + options.id + '" doesn\'t exist.');
    return false;
  }

  tracks[options.id] = $.extend(true, tracks[options.id], options);

  TrackStore.__emitChange();
};


TrackStore.hasTrack = function(track) {
  return !!_.findWhere(tracks, track);
};


TrackStore.hasTrackId = function(trackId) {
  return tracks.hasOwnProperty(trackId);
};


TrackStore.getTrack = function(trackId) {
  if ( !TrackStore.hasTrackId(trackId) ) {
    throw new Error('Invalid track. ID "' + options.id + '" doesn\'t exist.');
    return false;
  }

  return $.extend(true, {}, tracks[trackId]);
};


TrackStore.getAllTracks = function() {
  return Object.keys(tracks).map(TrackStore.getTrack);
};


TrackStore.getNewId = function() {
  return newTrackIndex > 0 ? newTrackIndex - 1 : undefined;
};


TrackStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "TRACK_ADD":
      addTrack(payload.track);
      break;
    case "TRACK_REMOVE":
      removeTrack(payload.trackId);
      break;
    case "TRACK_UPDATE":
      updateTrack(payload.options);
      break;
  }
};


module.exports = TrackStore;
