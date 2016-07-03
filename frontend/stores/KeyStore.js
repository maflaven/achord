var $ = require('jquery');
var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var KeyStore = new Store(Dispatcher);

var keysPressed = {};


KeyStore.pressedKeys = function() {
  return $.extend({}, keysPressed)
};


var addKey = function(key) {
  keysPressed[key] = true;
  KeyStore.__emitChange();
};


var removeKey = function(key) {
  delete keysPressed[key];
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
  }
};


module.exports = KeyStore;
