# Table of Contents
- [Components](#components)
- [Stores](#stores)
- [Utilities](#utilities)

# Components

## Organ
- main component
- iterates through list of keys and generates OrganKeys
- OrganKeys create Notes that use Chrome's audio API
- OrganKeys also bind listener to KeyStore
  - if key isPressed, key's note will "start"

## Recorder
- sub-component of Organ that generates Tracks
- onRecord, creates a new Track and adds a listener to that Track to be sensitive to key state changes in the KeyStore. Changes are stored on that track's roll
- onStopRecord, adds the Track to the TrackStore

## Jukebox
- sub-component of Organ that is sensitive to TrackStore changes
- on initialization, generates TrackPlayers, and updates whenever a Track is added/removed from store

## TrackPlayer
- sub-component of Jukebox that allows playback of Tracks
- features play/pause, stop, delete

## TrackName
- sub-component of TrackPlayer that displays and allows updates to a Track's name

# Stores

## KeyStore
- exposes the following functions via Dispatcher:
  - addKey
  - removeKey
  - resetKeys
  - enableListenerPresses
  - disableListenerPresses
- exposes the following public functions:
  - pressedKeys
  - listenersCanPress

## TrackStore
- exposes the following functions via Dispatcher:
  - addTrack
  - removeTrack
  - updateTrack
- exposes the following public functions:
  - hasTrack
  - hasTrackId
  - getNewId
  - getTrack
  - getAllTracks

# Utilities

## KeyListener
- listens for keypress of initialized noteName
- on key(Down|Up), sends a KeyAction to the KeyStore to either add or remove the noteName from the list of pressed keys

## Note
- the connection to Chrome's audio API
- exposes "start" and "stop" functions that govern whether the note is played through Chrome

## Track
- exposes the following methods:
  - startRecording
  - stopRecording
  - play
  - pause
  - stop
  - bindStopCallback

# Known Issues
- starting then stopping recording during track playback causes the playing track's stop method to be unresponsive until after the track is finished playing
