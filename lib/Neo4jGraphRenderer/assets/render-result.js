'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderResult = undefined;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _renderer = require('./renderer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderResult = exports.renderResult = function renderResult(selector, data) {
  var d3Graph = (0, _renderer.graphRenderer)();
  try {
    if (data) {
      var div = (0, _jquery2.default)('#' + selector);
      div.empty();
      d3Graph.render(selector, div, data);
    }
  } catch (e) {
    window.alert('Caught error: ' + e);
  }
};

exports.default = { renderResult: renderResult };