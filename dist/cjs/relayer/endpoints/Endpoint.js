'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ConstructableJs = require('../Constructable.js');

var _ConstructableJs2 = _interopRequireDefault(_ConstructableJs);

var Endpoint = (function (_Constructable) {
  function Endpoint() {
    _classCallCheck(this, Endpoint);

    _get(Object.getPrototypeOf(Endpoint.prototype), 'constructor', this).call(this);
  }

  _inherits(Endpoint, _Constructable);

  _createClass(Endpoint, [{
    key: 'create',
    value: function create(resource, res, rej) {
      return this.endpointPromise().then(function (endpoint) {
        if (endpoint._create) {
          return endpoint._create(resource);
        } else {
          return endpoint.create(resource);
        }
      }).then(res, rej);
    }
  }, {
    key: 'update',
    value: function update(resource, res, rej) {
      return this.endpointPromise().then(function (endpoint) {
        if (endpoint._update) {
          return endpoint._update(resource);
        } else {
          return endpoint.update(resource);
        }
      }).then(res, rej);
    }
  }, {
    key: 'load',
    value: function load(res, rej) {
      return this.endpointPromise().then(function (endpoint) {
        if (endpoint._load) {
          return endpoint._load();
        } else {
          return endpoint.load();
        }
      }).then(res, rej);
    }
  }, {
    key: 'get',
    value: function get(prop) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return this.load().then(function (response) {
        if (typeof response[prop] == 'function') {
          return response[prop].apply(response, args);
        } else {
          return response[prop];
        }
      });
    }
  }, {
    key: 'remove',
    value: function remove(res, rej) {
      return this.endpointPromise().then(function (endpoint) {
        return endpoint._remove();
      }).then(res, rej);
    }
  }]);

  return Endpoint;
})(_ConstructableJs2['default']);

exports['default'] = Endpoint;
module.exports = exports['default'];