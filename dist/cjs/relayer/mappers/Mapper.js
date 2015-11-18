'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ConstructableJs = require('../Constructable.js');

var _ConstructableJs2 = _interopRequireDefault(_ConstructableJs);

var Mapper = (function (_Constructable) {
  function Mapper(transport, response, relationshipDescription) {
    var useErrors = arguments[3] === undefined ? false : arguments[3];

    _classCallCheck(this, Mapper);

    _get(Object.getPrototypeOf(Mapper.prototype), 'constructor', this).call(this);
    this.transport = transport;
    this.response = response;
    this.relationshipDescription = relationshipDescription;
    this.useErrors = useErrors;
  }

  _inherits(Mapper, _Constructable);

  _createClass(Mapper, [{
    key: 'ResourceClass',
    get: function () {
      if (this.useErrors) {
        return this.relationshipDescription.ResourceClass.errorClass;
      } else {
        return this.relationshipDescription.ResourceClass;
      }
    }
  }, {
    key: 'mapperFactory',
    get: function () {
      return this.relationshipDescription.mapperFactory;
    }
  }, {
    key: 'serializerFactory',
    get: function () {
      return this.relationshipDescription.serializerFactory;
    }
  }, {
    key: 'map',
    value: function map() {
      this.initializeModel();
      this.mapNestedRelationships();
      return this.mapped;
    }
  }]);

  return Mapper;
})(_ConstructableJs2['default']);

exports['default'] = Mapper;
module.exports = exports['default'];