var $ = require('jquery');
var KeyActions = require('../actions/key_actions');
var KEYMAP = require('../constants/KeyMap');
var KeyStore = require('../stores/KeyStore');


var addHandlers = function(noteName) {
  var keyCode = KEYMAP[noteName];

  var callbacks = {
    keyDown: function(e) {
      if (KeyStore.listenersCanPress() && e.which === keyCode) {
       KeyActions.keyDown(noteName);
      }
    },
    keyUp: function(e) {
      e.which === keyCode && KeyActions.keyUp(noteName);
    }
  }

  $(document).on('keydown', callbacks.keyDown);
  $(document).on('keyup', callbacks.keyUp);

  return callbacks;
};


var KeyListener = function(noteName) {
  this.callbacks = addHandlers(noteName);
};


KeyListener.prototype = {
  removeHandlers: function() {
    $(document).off('keydown', this.callbacks.keyDown);
    $(document).off('keyup', this.callbacks.keyUp);
  }
};

module.exports = KeyListener;
