var KeyStore = require('../stores/KeyStore');
var KeyActions = require('../actions/key_actions');


var Track = function(options) {
  if (options) {
    this.id = options.id;
    this.name = options.name;
    this.roll = options.roll;
    this.onStopPlayback = options.onStopPlayback;
  }
};


Track.prototype = {
  startRecording: function() {
    this.roll = [];
    this.recordStartTime = Date.now();
  },
  addNotes: function(notesArray) {
    var keyChange = {
      timeSlice: Date.now() - this.recordStartTime,
      notes: Array.isArray(notesArray) ? notesArray : KeyStore.pressedKeys()
    };

    this.roll = this.roll.concat([keyChange]);
  },
  stopRecording: function() {
    this.addNotes([]);
  },
  onInterval: function() {
    var playBackCurrentTime = Date.now() - this.playBackStartTime;
    var currentKeyChange = this.roll[this.currentIndex];

    if (this.currentIndex < this.roll.length) {

      if (playBackCurrentTime >= currentKeyChange.timeSlice) {
        KeyActions.keysReset(currentKeyChange.notes);
        this.currentIndex++;
      }

    } else {
      this.stop();
    }
  },
  play: function() {
    if (this.interval) return;

    this.playBackStartTime = Date.now();

    if (this.paused) {
      this.playBackStartTime -= this.roll[this.currentIndex].timeSlice;
    } else {
      this.currentIndex = 0;
    }

    this.interval = setInterval(this.onInterval.bind(this), 10);
  },
  pause: function() {
    this.paused = true;

    this.clearOrganAndInterval();
  },
  stop: function() {
    this.paused = false;

    this.clearOrganAndInterval();

    this.currentIndex = 0;

    this.stopCallback && this.stopCallback();
  },
  clearOrganAndInterval: function() {
    if (!this.interval) return;

    clearInterval(this.interval);

    delete this.interval;

    KeyActions.keysReset([]);
  },
  bindStopCallback: function(callback) {
    if (typeof callback === 'function') {
      this.stopCallback = callback;
    } else {
      throw "Invalid callback.";
    }
  }
}


module.exports = Track;
