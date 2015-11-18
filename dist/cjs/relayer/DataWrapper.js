'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _jsonpathJs = require('./jsonpath.js');

var _jsonpathJs2 = _interopRequireDefault(_jsonpathJs);

var _ConstructableJs = require('./Constructable.js');

var _ConstructableJs2 = _interopRequireDefault(_ConstructableJs);

var DataWrapper = (function (_Constructable) {
  function DataWrapper(response) {
    _classCallCheck(this, DataWrapper);

    _get(Object.getPrototypeOf(DataWrapper.prototype), 'constructor', this).call(this);
    this._response = response;
  }

  _inherits(DataWrapper, _Constructable);

  _createClass(DataWrapper, [{
    key: 'pathBuild',
    value: function pathBuild(path, value) {
      //XXX ???
      //Partly this requires the opposite of jsonPath - find a reasonable set of fields
      //that would satisfy the path... or paths
      //i.e. we've been neglecting jsonPath's "descendant" operator

      var segments = path.split('.');

      var root = segments.shift();
      if (root !== '$') {
        console.log('root of path ' + path + ' was ' + root + ', not "$"');
        return false;
      }

      var target = segments.pop();
      var thumb = this._response;

      segments.forEach(function (segment) {
        if (segment === '') {
          return;
        }

        if (!thumb[segment]) {
          thumb[segment] = {}; //XXX arrays? next segment is number? or [] in path...
        }

        thumb = thumb[segment];
      });

      thumb[target] = value;
    }
  }, {
    key: 'pathGet',
    value: function pathGet(path) {
      var temp = (0, _jsonpathJs2['default'])(this._response, path, { flatten: false, wrap: true });
      if (temp.length === 0) {
        return undefined;
      } else {
        return temp[0];
      }
    }
  }, {
    key: 'pathSet',
    value: function pathSet(jsonpath, value) {
      var path = (0, _jsonpathJs2['default'])(this._response, jsonpath, { wrap: true, resultType: 'path' });
      if (path && path.length > 0) {
        path = path[0];
        if (path[0] !== '$') {
          console.log('Warning! root of normalized path \'' + path + '\' was \'' + path[0] + '\', not \'$\'');
        }
        var root = path.shift();
        var target = path.pop();
        var thumb = this._response;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var segment = _step.value;

            thumb = thumb[segment];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (thumb[target] != value) {
          this._dirty = true;
        }
        thumb[target] = value;
      } else {}
    }
  }, {
    key: 'pathClear',
    value: function pathClear(jsonpath) {
      var path = (0, _jsonpathJs2['default'])(this._response, jsonpath, { wrap: true, resultType: 'path' });
      if (path && path.length === 0) {
        return;
      }
      path = path[0];
      if (path[0] !== '$') {
        console.log('root of normalized path was \'' + path[0] + '\', not \'$\'');
      }
      var root = path.shift();
      var target = path.pop();
      var thumb = this._response;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = path[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var segment = _step2.value;

          thumb = thumb[segment];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      delete thumb[target];
    }
  }]);

  return DataWrapper;
})(_ConstructableJs2['default']);

exports['default'] = DataWrapper;
module.exports = exports['default'];

// raise error here?