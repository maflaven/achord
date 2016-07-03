var ListenToMixin = {
  componentWillMount: function() {
    this.listeners = [];
  },
  listenTo: function(store, fn) {
    var listener = store.addListener(fn);
    this.listeners.push(listener);
  },
  componentWillUnmount: function() {
    this.listeners.forEach( function(listener) {
      listener.remove();
    });
  }
};


module.exports = ListenToMixin;
