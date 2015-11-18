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

var RelationshipDescription = (function (_Constructable) {
  function RelationshipDescription(relationshipInitializerFactory, resourceMapperFactory, resourceSerializerFactory, inflector, name, ResourceClass, initialValues) {
    _classCallCheck(this, RelationshipDescription);

    _get(Object.getPrototypeOf(RelationshipDescription.prototype), 'constructor', this).call(this);

    this.initializer = relationshipInitializerFactory(ResourceClass, initialValues);
    this.mapperFactory = resourceMapperFactory;
    this.serializerFactory = resourceSerializerFactory;
    this.inflector = inflector;
    this.name = name;
    this.ResourceClass = ResourceClass;
    this.initialValues = initialValues;
    this.async = true;
    if (initialValues === undefined) {
      this.initializeOnCreate = false;
    } else {
      this.initializeOnCreate = true;
    }
  }

  _inherits(RelationshipDescription, _Constructable);

  _createClass(RelationshipDescription, [{
    key: 'linksPath',
    get: function () {
      this._linksPath = this._linksPath || '$.links.' + this.inflector.underscore(this.name);
      return this._linksPath;
    },
    set: function (linksPath) {
      this._linksPath = linksPath;
      return this._linksPath;
    }
  }, {
    key: 'dataPath',
    get: function () {
      this._dataPath = this._dataPath || '$.data.' + this.inflector.underscore(this.name);
      return this._dataPath;
    },
    set: function (dataPath) {
      this._dataPath = dataPath;
      return this._dataPath;
    }
  }, {
    key: 'decorateEndpoint',
    value: function decorateEndpoint(endpoint, uriParams) {}
  }]);

  return RelationshipDescription;
})(_ConstructableJs2['default']);

exports['default'] = RelationshipDescription;
module.exports = exports['default'];

// override