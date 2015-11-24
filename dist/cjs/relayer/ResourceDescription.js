"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.describeResource = describeResource;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _APIErrorJs = require("./APIError.js");

var _APIErrorJs2 = _interopRequireDefault(_APIErrorJs);

var _decoratorsJsonPropertyDecoratorJs = require("./decorators/JsonPropertyDecorator.js");

var _decoratorsJsonPropertyDecoratorJs2 = _interopRequireDefault(_decoratorsJsonPropertyDecoratorJs);

var _decoratorsRelatedResourceDecoratorJs = require("./decorators/RelatedResourceDecorator.js");

var _decoratorsRelatedResourceDecoratorJs2 = _interopRequireDefault(_decoratorsRelatedResourceDecoratorJs);

var _relationshipDescriptionsSingleRelationshipDescriptionJs = require("./relationshipDescriptions/SingleRelationshipDescription.js");

var _relationshipDescriptionsSingleRelationshipDescriptionJs2 = _interopRequireDefault(_relationshipDescriptionsSingleRelationshipDescriptionJs);

var _relationshipDescriptionsManyRelationshipDescriptionJs = require("./relationshipDescriptions/ManyRelationshipDescription.js");

var _relationshipDescriptionsManyRelationshipDescriptionJs2 = _interopRequireDefault(_relationshipDescriptionsManyRelationshipDescriptionJs);

var _relationshipDescriptionsListRelationshipDescriptionJs = require("./relationshipDescriptions/ListRelationshipDescription.js");

var _relationshipDescriptionsListRelationshipDescriptionJs2 = _interopRequireDefault(_relationshipDescriptionsListRelationshipDescriptionJs);

var _relationshipDescriptionsMapRelationshipDescriptionJs = require("./relationshipDescriptions/MapRelationshipDescription.js");

var _relationshipDescriptionsMapRelationshipDescriptionJs2 = _interopRequireDefault(_relationshipDescriptionsMapRelationshipDescriptionJs);

var _xingInflector = require("xing-inflector");

var _xingInflector2 = _interopRequireDefault(_xingInflector);

var _injectorJs = require("./injector.js");

var resourcesToInitialize = [];

function describeResource(resourceClass, defineFn) {
  resourcesToInitialize.push({ resourceClass: resourceClass, defineFn: defineFn });
}

var InitializedResourceClasses = (function () {
  function InitializedResourceClasses(resourceDescriptionFactory) {
    _classCallCheck(this, InitializedResourceClasses);

    this.resourceDescriptionFactory = resourceDescriptionFactory;
    this.initializeClasses();
  }

  _createClass(InitializedResourceClasses, [{
    key: "buildDescription",
    value: function buildDescription(resourceToInitialize) {
      var resourceClass = resourceToInitialize.resourceClass;
      var defineFn = resourceToInitialize.defineFn;
      var resourceDescription = resourceClass.description(this.resourceDescriptionFactory);
      // wrap-around definitions because...
      defineFn(resourceDescription);
    }
  }, {
    key: "applyDescription",
    value: function applyDescription(resourceToInitialize) {
      var resourceClass = resourceToInitialize.resourceClass;
      var resourceDescription = resourceClass.resourceDescription;
      var errorClass = function errorClass(responseData) {
        _APIErrorJs2["default"].call(this, responseData);
      };
      errorClass.relationships = {};
      errorClass.properties = {};
      errorClass.prototype = Object.create(_APIErrorJs2["default"].prototype);
      errorClass.prototype.constructor = errorClass;
      resourceDescription.applyToResource(resourceClass.prototype);
      resourceDescription.applyToError(errorClass.prototype);
      resourceClass.errorClass = errorClass;
      return resourceClass;
    }
  }, {
    key: "initializeClasses",
    value: function initializeClasses() {
      var _this = this;

      resourcesToInitialize.forEach(function (resourceToInitialize) {
        _this.buildDescription(resourceToInitialize);
      });

      return resourcesToInitialize.map(function (resourceToInitialize) {
        _this.applyDescription(resourceToInitialize);
      });
    }
  }]);

  return InitializedResourceClasses;
})();

exports.InitializedResourceClasses = InitializedResourceClasses;

var ResourceDescription = (function () {
  function ResourceDescription(jsonPropertyDecoratorFactory, relatedResourceDecoratorFactory, singleRelationshipDescriptionFactory, manyRelationshipDescriptionFactory, listRelationshipDescriptionFactory, mapRelationshipDescriptionFactory, inflector) {
    _classCallCheck(this, ResourceDescription);

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

  _createClass(ResourceDescription, [{
    key: "chainFrom",
    value: function chainFrom(other) {
      if (this.parentDescription && this.parentDescription !== other) {
        throw new Error("Attempted to rechain description: existing parent if of " + ("" + this.parentDescription.ResourceClass + ", new is of " + other.ResourceClass));
      } else {
        this.parentDescription = other;
      }
    }
  }, {
    key: "recordDecorator",
    value: function recordDecorator(name, decoratorDescription) {
      this.decorators[name] = this.decorators[name] || [];
      this.decorators[name].push(decoratorDescription);
      this.allDecorators.push(decoratorDescription);
      return decoratorDescription;
    }
  }, {
    key: "applyToResource",
    value: function applyToResource(resource) {
      this.allDecorators.forEach(function (decorator) {
        decorator.resourceApply(resource);
      });
      if (this.parentDescription) {
        this.parentDescription.applyToResource(resource);
      }
    }
  }, {
    key: "applyToError",
    value: function applyToError(error) {
      this.allDecorators.forEach(function (decorator) {
        decorator.errorsApply(error);
      });
      if (this.parentDescription) {
        this.parentDescription.applyToError(error);
      }
    }
  }, {
    key: "applyToEndpoint",
    value: function applyToEndpoint(endpoint) {
      this.allDecorators.forEach(function (decorator) {
        decorator.endpointApply(endpoint);
      });
      if (this.parentDescription) {
        this.parentDescription.applyToEndpoint(endpoint);
      }
    }
  }, {
    key: "property",
    value: function property(_property, initial) {
      this.jsonProperty(_property, "$.data." + this.inflector.underscore(_property), initial);
    }
  }, {
    key: "hasOne",
    value: function hasOne(property, rezClass, initialValues) {
      return this.relatedResource(property, rezClass, initialValues, this.singleRelationshipDescriptionFactory);
    }
  }, {
    key: "hasMany",
    value: function hasMany(property, rezClass, initialValues) {
      return this.relatedResource(property, rezClass, initialValues, this.manyRelationshipDescriptionFactory);
    }
  }, {
    key: "hasList",
    value: function hasList(property, rezClass, initialValues) {
      return this.relatedResource(property, rezClass, initialValues, this.listRelationshipDescriptionFactory);
    }
  }, {
    key: "hasMap",
    value: function hasMap(property, rezClass, initialValue) {
      return this.relatedResource(property, rezClass, initialValue, this.mapRelationshipDescriptionFactory);
    }
  }, {
    key: "jsonProperty",
    value: function jsonProperty(name, path, value, options) {
      return this.recordDecorator(name, this.jsonPropertyDecoratorFactory(name, path, value, options));
    }
  }, {
    key: "relatedResource",
    value: function relatedResource(property, rezClass, initialValues, relationshipDescriptionFactory) {
      var relationship = relationshipDescriptionFactory(property, rezClass, initialValues);
      this.recordDecorator(name, this.relatedResourceDecoratorFactory(property, relationship));
      return relationship;
    }
  }]);

  return ResourceDescription;
})();

exports.ResourceDescription = ResourceDescription;

(0, _injectorJs.Inject)((0, _injectorJs.factory)(ResourceDescription))(InitializedResourceClasses);

(0, _injectorJs.Inject)((0, _injectorJs.factory)(_decoratorsJsonPropertyDecoratorJs2["default"]), (0, _injectorJs.factory)(_decoratorsRelatedResourceDecoratorJs2["default"]), (0, _injectorJs.factory)(_relationshipDescriptionsSingleRelationshipDescriptionJs2["default"]), (0, _injectorJs.factory)(_relationshipDescriptionsManyRelationshipDescriptionJs2["default"]), (0, _injectorJs.factory)(_relationshipDescriptionsListRelationshipDescriptionJs2["default"]), (0, _injectorJs.factory)(_relationshipDescriptionsMapRelationshipDescriptionJs2["default"]), _xingInflector2["default"])(ResourceDescription);