'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.describeResource = describeResource;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _APIErrorJs = require('./APIError.js');

var _APIErrorJs2 = _interopRequireDefault(_APIErrorJs);

var _a1atscript = require('a1atscript');

var _ConstructableJs = require('./Constructable.js');

var _ConstructableJs2 = _interopRequireDefault(_ConstructableJs);

var resourcesToInitialize = [];

function describeResource(resourceClass, defineFn) {
  resourcesToInitialize.push({ resourceClass: resourceClass, defineFn: defineFn });
}

var InitializedResourceClasses = (function (_Constructable) {
  function InitializedResourceClasses(resourceDescriptionFactory) {
    _classCallCheck(this, InitializedResourceClasses);

    _get(Object.getPrototypeOf(InitializedResourceClasses.prototype), 'constructor', this).call(this);
    this.resourceDescriptionFactory = resourceDescriptionFactory;
    this.initializeClasses();
  }

  _inherits(InitializedResourceClasses, _Constructable);

  _createClass(InitializedResourceClasses, [{
    key: 'buildDescription',
    value: function buildDescription(resourceToInitialize) {
      var resourceClass = resourceToInitialize.resourceClass;
      var defineFn = resourceToInitialize.defineFn;
      var resourceDescription = resourceClass.description(this.resourceDescriptionFactory);
      // wrap-around definitions because...
      defineFn(resourceDescription);
    }
  }, {
    key: 'applyDescription',
    value: function applyDescription(resourceToInitialize) {
      var resourceClass = resourceToInitialize.resourceClass;
      var resourceDescription = resourceClass.resourceDescription;
      var errorClass = function errorClass(responseData) {
        _APIErrorJs2['default'].call(this, responseData);
      };
      errorClass.relationships = {};
      errorClass.properties = {};
      errorClass.prototype = Object.create(_APIErrorJs2['default'].prototype);
      errorClass.prototype.constructor = errorClass;
      resourceDescription.applyToResource(resourceClass.prototype);
      resourceDescription.applyToError(errorClass.prototype);
      resourceClass.errorClass = errorClass;
      return resourceClass;
    }
  }, {
    key: 'initializeClasses',
    value: function initializeClasses() {
      var _this = this;

      resourcesToInitialize.forEach(function (resourceToInitialize) {
        _this.buildDescription(resourceToInitialize);
      });

      return resourcesToInitialize.map(function (resourceToInitialize) {
        _this.applyDescription(resourceToInitialize);
      });
    }
  }], [{
    key: 'factoryNames',
    get: function () {
      return ['ResourceDescriptionFactory'];
    }
  }]);

  return InitializedResourceClasses;
})(_ConstructableJs2['default']);

exports.InitializedResourceClasses = InitializedResourceClasses;

var ResourceDescription = (function (_Constructable2) {
  function ResourceDescription(jsonPropertyDecoratorFactory, relatedResourceDecoratorFactory, singleRelationshipDescriptionFactory, manyRelationshipDescriptionFactory, listRelationshipDescriptionFactory, mapRelationshipDescriptionFactory, inflector) {
    _classCallCheck(this, ResourceDescription);

    _get(Object.getPrototypeOf(ResourceDescription.prototype), 'constructor', this).call(this);

    this.jsonPropertyDecoratorFactory = jsonPropertyDecoratorFactory;
    this.relatedResourceDecoratorFactory = relatedResourceDecoratorFactory;
    this.singleRelationshipDescriptionFactory = singleRelationshipDescriptionFactory;
    this.manyRelationshipDescriptionFactory = manyRelationshipDescriptionFactory;
    this.listRelationshipDescriptionFactory = listRelationshipDescriptionFactory;
    this.mapRelationshipDescriptionFactory = mapRelationshipDescriptionFactory;
    this.inflector = inflector;

    this.decorators = {};
    this.allDecorators = [];
    this.parentDescription = null; //automated inheritance?
  }

  _inherits(ResourceDescription, _Constructable2);

  _createClass(ResourceDescription, [{
    key: 'chainFrom',
    value: function chainFrom(other) {
      if (this.parentDescription && this.parentDescription !== other) {
        throw new Error('Attempted to rechain description: existing parent if of ' + ('' + this.parentDescription.ResourceClass + ', new is of ' + other.ResourceClass));
      } else {
        this.parentDescription = other;
      }
    }
  }, {
    key: 'recordDecorator',
    value: function recordDecorator(name, decoratorDescription) {
      this.decorators[name] = this.decorators[name] || [];
      this.decorators[name].push(decoratorDescription);
      this.allDecorators.push(decoratorDescription);
      return decoratorDescription;
    }
  }, {
    key: 'applyToResource',
    value: function applyToResource(resource) {
      this.allDecorators.forEach(function (decorator) {
        decorator.resourceApply(resource);
      });
      if (this.parentDescription) {
        this.parentDescription.applyToResource(resource);
      }
    }
  }, {
    key: 'applyToError',
    value: function applyToError(error) {
      this.allDecorators.forEach(function (decorator) {
        decorator.errorsApply(error);
      });
      if (this.parentDescription) {
        this.parentDescription.applyToError(error);
      }
    }
  }, {
    key: 'applyToEndpoint',
    value: function applyToEndpoint(endpoint) {
      this.allDecorators.forEach(function (decorator) {
        decorator.endpointApply(endpoint);
      });
      if (this.parentDescription) {
        this.parentDescription.applyToEndpoint(endpoint);
      }
    }
  }, {
    key: 'property',
    value: function property(_property, initial) {
      this.jsonProperty(_property, '$.data.' + this.inflector.underscore(_property), initial);
    }
  }, {
    key: 'hasOne',
    value: function hasOne(property, rezClass, initialValues) {
      return this.relatedResource(property, rezClass, initialValues, this.singleRelationshipDescriptionFactory);
    }
  }, {
    key: 'hasMany',
    value: function hasMany(property, rezClass, initialValues) {
      return this.relatedResource(property, rezClass, initialValues, this.manyRelationshipDescriptionFactory);
    }
  }, {
    key: 'hasList',
    value: function hasList(property, rezClass, initialValues) {
      return this.relatedResource(property, rezClass, initialValues, this.listRelationshipDescriptionFactory);
    }
  }, {
    key: 'hasMap',
    value: function hasMap(property, rezClass, initialValue) {
      return this.relatedResource(property, rezClass, initialValue, this.mapRelationshipDescriptionFactory);
    }
  }, {
    key: 'jsonProperty',
    value: function jsonProperty(name, path, value, options) {
      return this.recordDecorator(name, this.jsonPropertyDecoratorFactory(name, path, value, options));
    }
  }, {
    key: 'relatedResource',
    value: function relatedResource(property, rezClass, initialValues, relationshipDescriptionFactory) {
      var relationship = relationshipDescriptionFactory(property, rezClass, initialValues);
      this.recordDecorator(name, this.relatedResourceDecoratorFactory(property, relationship));
      return relationship;
    }
  }], [{
    key: 'factoryNames',
    get: function () {
      return ['JsonPropertyDecoratorFactory', 'RelatedResourceDecoratorFactory', 'SingleRelationshipDescriptionFactory', 'ManyRelationshipDescriptionFactory', 'ListRelationshipDescriptionFactory', 'MapRelationshipDescriptionFactory', 'Inflector'];
    }
  }]);

  return ResourceDescription;
})(_ConstructableJs2['default']);

exports.ResourceDescription = ResourceDescription;