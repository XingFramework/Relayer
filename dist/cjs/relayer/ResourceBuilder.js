"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _TemplatedUrlJs = require("./TemplatedUrl.js");

var _endpointsResolvedEndpointJs = require("./endpoints/ResolvedEndpoint.js");

var _endpointsResolvedEndpointJs2 = _interopRequireDefault(_endpointsResolvedEndpointJs);

var _transformersThrowErrorTransformerJs = require("./transformers/ThrowErrorTransformer.js");

var _transformersThrowErrorTransformerJs2 = _interopRequireDefault(_transformersThrowErrorTransformerJs);

var _transformersCreateResourceTransformerJs = require("./transformers/CreateResourceTransformer.js");

var _transformersCreateResourceTransformerJs2 = _interopRequireDefault(_transformersCreateResourceTransformerJs);

var _injectorJs = require("./injector.js");

var ResourceBuilder = (function () {
  function ResourceBuilder(templatedUrlFromUrlFactory, resolvedEndpointFactory, throwErrorTransformerFactory, createResourceTransformerFactory, transport, response, primaryResourceTransformer, ResourceClass, relationshipDescription) {
    _classCallCheck(this, ResourceBuilder);

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
  }]);

  return ResourceBuilder;
})();

exports["default"] = ResourceBuilder;

(0, _injectorJs.Inject)((0, _injectorJs.factory)(_TemplatedUrlJs.TemplatedUrlFromUrl), (0, _injectorJs.factory)(_endpointsResolvedEndpointJs2["default"]), (0, _injectorJs.factory)(_transformersThrowErrorTransformerJs2["default"]), (0, _injectorJs.factory)(_transformersCreateResourceTransformerJs2["default"]))(ResourceBuilder);
module.exports = exports["default"];