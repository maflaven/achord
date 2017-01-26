var React = require('react');


var TrackSlider = React.createClass({
  getInitialState: function() {
    return {
      value: 0
    }
  },
  componentDidMount: function() {

  },
  handleChange: function(event) {
    this.setState({ value: event.target.value })
  },
  render: function() {
    return (
      <input type="range" value={this.state.value} onChange={this.handleChange} />
    );
  }
});


module.exports = TrackSlider;
