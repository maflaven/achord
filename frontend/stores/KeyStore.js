var $ = require('jquery');
var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var KeyStore = new Store(Dispatcher);

var keysPressed = {};
var listenersCanPress = true;


KeyStore.pressedKeys = function() {
  return $.extend({}, keysPressed)
};


KeyStore.listenersCanPress = function() {
  return listenersCanPress;
};


var addKey = function(key) {
  keysPressed[key] = true;
  KeyStore.__emitChange();
};


var removeKey = function(key) {
  delete keysPressed[key];
  KeyStore.__emitChange();
};


var enableListenerPresses = function() {
  listenersCanPress = true;
  KeyStore.__emitChange();
};


var disableListenerPresses = function() {
  listenersCanPress = false;
  KeyStore.__emitChange();
};


var resetKeys = function(keysArray) {
  keysPressed = keysArray;

  KeyStore.__emitChange();
}


KeyStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "KEY_PRESSED":
      addKey(payload.key);
      break;
    case "KEY_RELEASED":
      removeKey(payload.key);
      break;
    case "KEYS_RESET":
      resetKeys(payload.keysArray);
      break;
    case "LISTENER_PRESSES_ENABLE":
      enableListenerPresses();
      break;
    case "LISTENER_PRESSES_DISABLE":
      disableListenerPresses();
      break;
  }
};


module.exports = KeyStore;
