"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _relayerResourceDescriptionJs = require("./relayer/ResourceDescription.js");

var _relayerResourceJs = require("./relayer/Resource.js");

var _relayerResourceJs2 = _interopRequireDefault(_relayerResourceJs);

var _relayerEndpointsJs = require("./relayer/endpoints.js");

var Endpoints = _interopRequireWildcard(_relayerEndpointsJs);

var _relayerSerializersJs = require("./relayer/serializers.js");

var Serializers = _interopRequireWildcard(_relayerSerializersJs);

var _relayerMappersJs = require("./relayer/mappers.js");

var Mappers = _interopRequireWildcard(_relayerMappersJs);

var _relayerTransformersJs = require("./relayer/transformers.js");

var Transformers = _interopRequireWildcard(_relayerTransformersJs);

var _relayerInitializersJs = require("./relayer/initializers.js");

var Initializers = _interopRequireWildcard(_relayerInitializersJs);

var _relayerDecoratorsJs = require("./relayer/decorators.js");

var Decorators = _interopRequireWildcard(_relayerDecoratorsJs);

var _relayerRelationshipDescriptionsJs = require("./relayer/relationshipDescriptions.js");

var RelationshipDescriptions = _interopRequireWildcard(_relayerRelationshipDescriptionsJs);

var _relayerListResourceJs = require("./relayer/ListResource.js");

var _relayerListResourceJs2 = _interopRequireDefault(_relayerListResourceJs);

var _relayerPrimaryResourceBuilderJs = require("./relayer/PrimaryResourceBuilder.js");

var _relayerPrimaryResourceBuilderJs2 = _interopRequireDefault(_relayerPrimaryResourceBuilderJs);

var _relayerResourceBuilderJs = require("./relayer/ResourceBuilder.js");

var _relayerResourceBuilderJs2 = _interopRequireDefault(_relayerResourceBuilderJs);

var _relayerTransportJs = require("./relayer/Transport.js");

var _relayerTransportJs2 = _interopRequireDefault(_relayerTransportJs);

var _relayerUrlHelperJs = require("./relayer/UrlHelper.js");

var _relayerUrlHelperJs2 = _interopRequireDefault(_relayerUrlHelperJs);

var _relayerTemplatedUrlJs = require("./relayer/TemplatedUrl.js");

var TemplatedUrls = _interopRequireWildcard(_relayerTemplatedUrlJs);

var _xingPromise = require("xing-promise");

var _xingPromise2 = _interopRequireDefault(_xingPromise);

var _relayerRelationshipUtilitiesJs = require("./relayer/RelationshipUtilities.js");

var _relayerRelationshipUtilitiesJs2 = _interopRequireDefault(_relayerRelationshipUtilitiesJs);

var _a1atscript = require("a1atscript");

var _xingInflector = require("xing-inflector");

var _xingInflector2 = _interopRequireDefault(_xingInflector);

var _relayerEverythingJs = require("./relayer/everything.js");

var classMap = _interopRequireWildcard(_relayerEverythingJs);

// This is the first class built after the introduction of the Constructable top class.
// Using construct instead of factoryNames is a goal state, but tests require
// changing to make that happen

var _relayerConstructableJs = require("./relayer/Constructable.js");

var _relayerConstructableJs2 = _interopRequireDefault(_relayerConstructableJs);

var ResourceLayer = (function () {
  function ResourceLayer($provide) {
    var _this = this;

    _classCallCheck(this, _ResourceLayer);

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
        var UrlHelper = classMap.UrlHelper;
        var Transport = classMap.Transport;
        var TemplatedUrlFromUrl = classMap.TemplatedUrlFromUrl;
        var PrimaryResourceTransformer = classMap.PrimaryResourceTransformer;
        var SingleRelationshipDescription = classMap.SingleRelationshipDescription;
        var ResolvedEndpoint = classMap.ResolvedEndpoint;

        classMap.setXingPromise(classMap.XingPromiseFactory.factory($q));

        _relayerResourceDescriptionJs.InitializedResourceClasses["new"](classMap);

        var orchestrator = TopLevelOrchestrator["new"](classMap, $http, topLevelResource, baseUrl);
        return orchestrator.arrange();
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

var TopLevelOrchestrator = (function (_Constructable) {
  function TopLevelOrchestrator($http, topLevelResource, baseUrl) {
    _classCallCheck(this, TopLevelOrchestrator);

    _get(Object.getPrototypeOf(TopLevelOrchestrator.prototype), "constructor", this).call(this);
    this.$http = $http;
    this.topLevelResource = topLevelResource;
    this.baseUrl = baseUrl;
  }

  _inherits(TopLevelOrchestrator, _Constructable);

  _createClass(TopLevelOrchestrator, [{
    key: "arrange",
    value: function arrange() {
      var $http = this.$http;
      var topLevelResource = this.topLevelResource;
      var baseUrl = this.baseUrl;

      var urlHelper = this.construct("UrlHelper", baseUrl);
      var wellKnownUrl = urlHelper.fullUrlRegEx.exec(baseUrl)[3];

      var transport = this.construct("Transport", urlHelper, $http);
      var templatedUrl = this.construct("TemplatedUrlFromUrl", wellKnownUrl, wellKnownUrl);
      var transformer = this.construct("PrimaryResourceTransformer", this.construct("SingleRelationshipDescription", "", topLevelResource));

      var endpoint = this.construct("ResolvedEndpoint", transport, templatedUrl, transformer);
      topLevelResource.resourceDescription.applyToEndpoint(endpoint);
      return endpoint;
    }
  }]);

  return TopLevelOrchestrator;
})(_relayerConstructableJs2["default"]);

module.exports = exports["default"];