"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ConstructableJs = require("./Constructable.js");

var _ConstructableJs2 = _interopRequireDefault(_ConstructableJs);

var ResourceBuilder = (function (_Constructable) {
  function ResourceBuilder(templatedUrlFromUrlFactory, resolvedEndpointFactory, throwErrorTransformerFactory, createResourceTransformerFactory, transport, response, primaryResourceTransformer, ResourceClass, relationshipDescription) {
    _classCallCheck(this, ResourceBuilder);

    _get(Object.getPrototypeOf(ResourceBuilder.prototype), "constructor", this).call(this);

    this.transport = transport;
    this.ResourceClass = ResourceClass;
    this.relationshipDescription = relationshipDescription;

    this.templatedUrlFromUrlFactory = templatedUrlFromUrlFactory;
    this.resolvedEndpointFactory = resolvedEndpointFactory;
    this.throwErrorTransformerFactory = throwErrorTransformerFactory;
    this.createResourceTransformerFactory = createResourceTransformerFactory;
    this.response = response;
    this.primaryResourceTransformer = primaryResourceTransformer;
  }

  _inherits(ResourceBuilder, _Constructable);

  _createClass(ResourceBuilder, [{
    key: "build",
    value: function build() {
      var uriTemplate = arguments[0] === undefined ? null : arguments[0];

      var resource = new this.ResourceClass(this.response);
      if (resource.pathGet("$.links.self")) {
        if (uriTemplate) {
          resource.templatedUrl = this.templatedUrlFromUrlFactory(uriTemplate, resource.pathGet("$.links.self"));
        } else {
          resource.templatedUrl = this.templatedUrlFromUrlFactory(resource.pathGet("$.links.self"), resource.pathGet("$.links.self"));
        }
        resource.templatedUrl.addDataPathLink(resource, "$.links.self");
        if (this.relationshipDescription.canCreate) {
          var createUriTemplate = uriTemplate || resource.pathGet("$.links.template");
          var createResourceTransformer = this.createResourceTransformerFactory(this.relationshipDescription.createRelationshipDescription, createUriTemplate);
        } else {
          var createResourceTransformer = this.throwErrorTransformerFactory();
        }
        var endpoint = this.resolvedEndpointFactory(this.transport, resource.templatedUrl, this.primaryResourceTransformer, createResourceTransformer);
        resource.self = function () {
          return endpoint;
        };
      }
      return resource;
    }
  }], [{
    key: "factoryNames",
    get: function () {
      return ["TemplatedUrlFromUrlFactory", "ResolvedEndpointFactory", "ThrowErrorTransformerFactory", "CreateResourceTransformerFactory"];
    }
  }]);

  return ResourceBuilder;
})(_ConstructableJs2["default"]);

exports["default"] = ResourceBuilder;
module.exports = exports["default"];