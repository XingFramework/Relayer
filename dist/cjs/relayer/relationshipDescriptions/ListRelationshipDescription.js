"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _RelationshipDescriptionJs = require("./RelationshipDescription.js");

var _RelationshipDescriptionJs2 = _interopRequireDefault(_RelationshipDescriptionJs);

var _initializersListRelationshipInitializerJs = require("../initializers/ListRelationshipInitializer.js");

var _initializersListRelationshipInitializerJs2 = _interopRequireDefault(_initializersListRelationshipInitializerJs);

var _mappersListResourceMapperJs = require("../mappers/ListResourceMapper.js");

var _mappersListResourceMapperJs2 = _interopRequireDefault(_mappersListResourceMapperJs);

var _serializersListResourceSerializerJs = require("../serializers/ListResourceSerializer.js");

var _serializersListResourceSerializerJs2 = _interopRequireDefault(_serializersListResourceSerializerJs);

var _xingInflector = require("xing-inflector");

var _xingInflector2 = _interopRequireDefault(_xingInflector);

var _SingleRelationshipDescriptionJs = require("./SingleRelationshipDescription.js");

var _SingleRelationshipDescriptionJs2 = _interopRequireDefault(_SingleRelationshipDescriptionJs);

var _ListResourceJs = require("../ListResource.js");

var _ListResourceJs2 = _interopRequireDefault(_ListResourceJs);

var _transformersPrimaryResourceTransformerJs = require("../transformers/PrimaryResourceTransformer.js");

var _transformersPrimaryResourceTransformerJs2 = _interopRequireDefault(_transformersPrimaryResourceTransformerJs);

var _transformersEmbeddedRelationshipTransformerJs = require("../transformers/EmbeddedRelationshipTransformer.js");

var _transformersEmbeddedRelationshipTransformerJs2 = _interopRequireDefault(_transformersEmbeddedRelationshipTransformerJs);

var _transformersIndividualFromListTransformerJs = require("../transformers/IndividualFromListTransformer.js");

var _transformersIndividualFromListTransformerJs2 = _interopRequireDefault(_transformersIndividualFromListTransformerJs);

var _transformersCreateResourceTransformerJs = require("../transformers/CreateResourceTransformer.js");

var _transformersCreateResourceTransformerJs2 = _interopRequireDefault(_transformersCreateResourceTransformerJs);

var _endpointsResolvedEndpointJs = require("../endpoints/ResolvedEndpoint.js");

var _endpointsResolvedEndpointJs2 = _interopRequireDefault(_endpointsResolvedEndpointJs);

var _endpointsLoadedDataEndpointJs = require("../endpoints/LoadedDataEndpoint.js");

var _endpointsLoadedDataEndpointJs2 = _interopRequireDefault(_endpointsLoadedDataEndpointJs);

var _TemplatedUrlJs = require("../TemplatedUrl.js");

var _injectorJs = require("../injector.js");

var ListRelationshipDescription = (function (_RelationshipDescription) {
  function ListRelationshipDescription(relationshipInitializerFactory, resourceMapperFactory, resourceSerializerFactory, inflector, singleRelationshipDescriptionFactory, ListResource, primaryResourceTransformerFactory, embeddedRelationshipTransformerFactory, individualFromListTransformerFactory, createResourceTransformerFactory, resolvedEndpointFactory, loadedDataEndpointFactory, templatedUrlFromUrlFactory, templatedUrlFactory, name, ResourceClass, initialValues) {
    _classCallCheck(this, ListRelationshipDescription);

    _get(Object.getPrototypeOf(ListRelationshipDescription.prototype), "constructor", this).call(this, relationshipInitializerFactory, resourceMapperFactory, resourceSerializerFactory, inflector, name, ResourceClass, initialValues);

    this.singleRelationshipDescriptionFactory = singleRelationshipDescriptionFactory;
    this.ListResource = ListResource;
    this.primaryResourceTransformerFactory = primaryResourceTransformerFactory;
    this.embeddedRelationshipTransformerFactory = embeddedRelationshipTransformerFactory;
    this.individualFromListTransformerFactory = individualFromListTransformerFactory;
    this.createResourceTransformerFactory = createResourceTransformerFactory;
    this.resolvedEndpointFactory = resolvedEndpointFactory;
    this.loadedDataEndpointFactory = loadedDataEndpointFactory;
    this.templatedUrlFromUrlFactory = templatedUrlFromUrlFactory;
    this.templatedUrlFactory = templatedUrlFactory;
    this.canCreate = false;
    this._linkTemplatePath = null;
  }

  _inherits(ListRelationshipDescription, _RelationshipDescription);

  _createClass(ListRelationshipDescription, [{
    key: "ListResourceClass",
    get: function () {
      return this._ListResourceClass || this.ListResource;
    },
    set: function (ListResourceClass) {
      this._ListResourceClass = ListResourceClass;
    }
  }, {
    key: "linkTemplate",
    get: function () {
      return this._linkTemplatePath;
    },
    set: function (linkTemplate) {
      this._linkTemplatePath = "$.links." + this.inflector.underscore(linkTemplate);
    }
  }, {
    key: "linkTemplatePath",
    set: function (linkTemplatePath) {
      this._linkTemplatePath = linkTemplatePath;
    }
  }, {
    key: "hasParams",
    value: function hasParams(uriParams) {
      if (typeof uriParams == "string") {
        uriParams = this.ResourceClass.paramsFromShortLink(uriParams);
      }
      if (typeof uriParams == "object" && Object.keys(uriParams).length > 0) {
        return uriParams;
      } else {
        return false;
      }
    }
  }, {
    key: "embeddedEndpoint",
    value: function embeddedEndpoint(parent, uriParams) {
      var parentEndpoint = parent.self();
      var transformer;
      uriParams = this.hasParams(uriParams);
      if (uriParams) {
        transformer = this.individualFromListTransformerFactory(this.name, uriParams);
      } else {
        transformer = this.embeddedRelationshipTransformerFactory(this.name);
      }
      return this.loadedDataEndpointFactory(parentEndpoint, parent, transformer);
    }
  }, {
    key: "listResourceTransformer",
    value: function listResourceTransformer() {
      return this.primaryResourceTransformerFactory(this);
    }
  }, {
    key: "singleResourceTransformer",
    value: function singleResourceTransformer() {
      return this.primaryResourceTransformerFactory(this.singleRelationshipDescriptionFactory("", this.ResourceClass));
    }
  }, {
    key: "createRelationshipDescription",
    get: function () {
      return this.singleRelationshipDescriptionFactory("", this.ResourceClass);
    }
  }, {
    key: "linkedEndpoint",
    value: function linkedEndpoint(parent, uriParams) {

      var transport = parent.self().transport;
      var url, templatedUrl, primaryResourceTransformer, createTransformer;

      var ResourceClass = this.ResourceClass;

      createTransformer = null;
      uriParams = this.hasParams(uriParams);
      if (uriParams && this._linkTemplatePath) {
        url = parent.pathGet(this._linkTemplatePath);
        templatedUrl = this.templatedUrlFactory(url, uriParams);
        primaryResourceTransformer = this.singleResourceTransformer();
      } else {
        url = parent.pathGet(this.linksPath);
        templatedUrl = this.templatedUrlFromUrlFactory(url, url);
        templatedUrl.addDataPathLink(parent, this.linksPath);
        primaryResourceTransformer = this.listResourceTransformer();
        if (this.canCreate) {
          createTransformer = this.createResourceTransformerFactory(this.createRelationshipDescription, parent.pathGet(this._linkTemplatePath));
        }
      }

      var endpoint = this.resolvedEndpointFactory(transport, templatedUrl, primaryResourceTransformer, createTransformer);

      if (createTransformer) {
        endpoint["new"] = function () {
          return new ResourceClass();
        };
      }

      return endpoint;
    }
  }, {
    key: "decorateEndpoint",
    value: function decorateEndpoint(endpoint, uriParams) {
      var ResourceClass = this.ResourceClass;

      uriParams = this.hasParams(uriParams);

      if (!uriParams && this.canCreate) {
        endpoint["new"] = function () {
          return new ResourceClass();
        };
      }
    }
  }]);

  return ListRelationshipDescription;
})(_RelationshipDescriptionJs2["default"]);

exports["default"] = ListRelationshipDescription;

(0, _injectorJs.Inject)((0, _injectorJs.factory)(_initializersListRelationshipInitializerJs2["default"]), (0, _injectorJs.factory)(_mappersListResourceMapperJs2["default"]), (0, _injectorJs.factory)(_serializersListResourceSerializerJs2["default"]), _xingInflector2["default"], (0, _injectorJs.factory)(_SingleRelationshipDescriptionJs2["default"]), (0, _injectorJs.value)(_ListResourceJs2["default"]), (0, _injectorJs.factory)(_transformersPrimaryResourceTransformerJs2["default"]), (0, _injectorJs.factory)(_transformersEmbeddedRelationshipTransformerJs2["default"]), (0, _injectorJs.factory)(_transformersIndividualFromListTransformerJs2["default"]), (0, _injectorJs.factory)(_transformersCreateResourceTransformerJs2["default"]), (0, _injectorJs.factory)(_endpointsResolvedEndpointJs2["default"]), (0, _injectorJs.factory)(_endpointsLoadedDataEndpointJs2["default"]), (0, _injectorJs.factory)(_TemplatedUrlJs.TemplatedUrlFromUrl), (0, _injectorJs.factory)(_TemplatedUrlJs.TemplatedUrl))(ListRelationshipDescription);
module.exports = exports["default"];