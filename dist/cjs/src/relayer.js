"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _relayerResourceDescriptionJs = require("./relayer/ResourceDescription.js");

var _relayerResourceJs = require("./relayer/Resource.js");

var _relayerResourceJs2 = _interopRequireDefault(_relayerResourceJs);

var _relayerListResourceJs = require("./relayer/ListResource.js");

var _relayerListResourceJs2 = _interopRequireDefault(_relayerListResourceJs);

var _relayerTransportJs = require("./relayer/Transport.js");

var _relayerTransportJs2 = _interopRequireDefault(_relayerTransportJs);

var _relayerUrlHelperJs = require("./relayer/UrlHelper.js");

var _relayerUrlHelperJs2 = _interopRequireDefault(_relayerUrlHelperJs);

var _relayerTransformersPrimaryResourceTransformerJs = require("./relayer/transformers/PrimaryResourceTransformer.js");

var _relayerTransformersPrimaryResourceTransformerJs2 = _interopRequireDefault(_relayerTransformersPrimaryResourceTransformerJs);

var _relayerRelationshipDescriptionsSingleRelationshipDescriptionJs = require("./relayer/relationshipDescriptions/SingleRelationshipDescription.js");

var _relayerRelationshipDescriptionsSingleRelationshipDescriptionJs2 = _interopRequireDefault(_relayerRelationshipDescriptionsSingleRelationshipDescriptionJs);

var _relayerEndpointsResolvedEndpointJs = require("./relayer/endpoints/ResolvedEndpoint.js");

var _relayerEndpointsResolvedEndpointJs2 = _interopRequireDefault(_relayerEndpointsResolvedEndpointJs);

var _relayerTemplatedUrlJs = require("./relayer/TemplatedUrl.js");

var _a1atscript = require("a1atscript");

var _xingPromise = require("xing-promise");

var _xingPromise2 = _interopRequireDefault(_xingPromise);

var _relayerInjectorJs = require("./relayer/injector.js");

var _relayerInjectorJs2 = _interopRequireDefault(_relayerInjectorJs);

var ResourceLayer = (function () {
  function ResourceLayer($provide) {
    var _this = this;

    _classCallCheck(this, _ResourceLayer);

    _relayerInjectorJs2["default"].reset();

    this.apis = {};
    this.$provide = $provide;
    this.$get = ["$injector", function ($injector) {
      var builtApis = {};
      Object.keys(_this.apis).forEach(function (apiName) {
        buildApis[apiName] = $injector.get(apiName);
      });
      return buildApis;
    }];
  }

  var _ResourceLayer = ResourceLayer;

  _createClass(_ResourceLayer, [{
    key: "createApi",
    value: function createApi(apiName, topLevelResource, baseUrl) {
      this.apis[apiName] = {
        topLevelResource: topLevelResource, baseUrl: baseUrl
      };
      this.$provide.factory(apiName, ["$http", "$q", function ($http, $q) {

        var XingPromise = _xingPromise2["default"].factory($q);
        _relayerInjectorJs2["default"].XingPromise.value = XingPromise;

        _relayerInjectorJs2["default"].instantiate(_relayerResourceDescriptionJs.InitializedResourceClasses);

        var apiBuilder = new APIBuilder($http, topLevelResource, baseUrl);
        return apiBuilder.build();
      }]);
    }
  }], [{
    key: "Resource",
    get: function () {
      return _relayerResourceJs2["default"];
    }
  }, {
    key: "ListResource",
    get: function () {
      return _relayerListResourceJs2["default"];
    }
  }, {
    key: "Describe",
    get: function () {
      return _relayerResourceDescriptionJs.describeResource;
    }
  }]);

  ResourceLayer = (0, _a1atscript.Provider)("relayer", ["$provide"])(ResourceLayer) || ResourceLayer;
  ResourceLayer = (0, _a1atscript.AsModule)("relayer", [])(ResourceLayer) || ResourceLayer;
  return ResourceLayer;
})();

exports["default"] = ResourceLayer;

var APIBuilder = (function () {
  function APIBuilder($http, topLevelResource, baseUrl) {
    _classCallCheck(this, APIBuilder);

    this.$http = $http;
    this.topLevelResource = topLevelResource;
    this.baseUrl = baseUrl;
  }

  _createClass(APIBuilder, [{
    key: "build",
    value: function build() {
      var $http = this.$http;
      var topLevelResource = this.topLevelResource;
      var baseUrl = this.baseUrl;

      var urlHelper = _relayerInjectorJs2["default"].instantiate((0, _relayerInjectorJs.instance)(_relayerUrlHelperJs2["default"]), baseUrl);
      var wellKnownUrl = urlHelper.fullUrlRegEx.exec(baseUrl)[3];

      var transport = _relayerInjectorJs2["default"].instantiate((0, _relayerInjectorJs.instance)(_relayerTransportJs2["default"]), urlHelper, $http);
      var templatedUrl = _relayerInjectorJs2["default"].instantiate((0, _relayerInjectorJs.instance)(_relayerTemplatedUrlJs.TemplatedUrlFromUrl), wellKnownUrl, wellKnownUrl);
      var relationshipDescription = _relayerInjectorJs2["default"].instantiate((0, _relayerInjectorJs.instance)(_relayerRelationshipDescriptionsSingleRelationshipDescriptionJs2["default"]), "", topLevelResource);
      var transformer = _relayerInjectorJs2["default"].instantiate((0, _relayerInjectorJs.instance)(_relayerTransformersPrimaryResourceTransformerJs2["default"]), relationshipDescription);

      var endpoint = _relayerInjectorJs2["default"].instantiate((0, _relayerInjectorJs.instance)(_relayerEndpointsResolvedEndpointJs2["default"]), transport, templatedUrl, transformer);
      topLevelResource.resourceDescription.applyToEndpoint(endpoint);
      return endpoint;
    }
  }]);

  return APIBuilder;
})();

module.exports = exports["default"];