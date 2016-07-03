var ReactDOM = require('react-dom');
var React = require('react');
var Organ = require('./components/Organ.jsx');

document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById('organ-grinder');
  ReactDOM.render(<Organ />, el);
});
