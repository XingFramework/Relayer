"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _MultipleRelationshipDescriptionJs = require("./MultipleRelationshipDescription.js");

var _MultipleRelationshipDescriptionJs2 = _interopRequireDefault(_MultipleRelationshipDescriptionJs);

var _initializersMapRelationshipInitializerJs = require("../initializers/MapRelationshipInitializer.js");

var _initializersMapRelationshipInitializerJs2 = _interopRequireDefault(_initializersMapRelationshipInitializerJs);

var _mappersMapResourceMapperJs = require("../mappers/MapResourceMapper.js");

var _mappersMapResourceMapperJs2 = _interopRequireDefault(_mappersMapResourceMapperJs);

var _serializersMapResourceSerializerJs = require("../serializers/MapResourceSerializer.js");

var _serializersMapResourceSerializerJs2 = _interopRequireDefault(_serializersMapResourceSerializerJs);

var _xingInflector = require("xing-inflector");

var _xingInflector2 = _interopRequireDefault(_xingInflector);

var _transformersEmbeddedRelationshipTransformerJs = require("../transformers/EmbeddedRelationshipTransformer.js");

var _transformersEmbeddedRelationshipTransformerJs2 = _interopRequireDefault(_transformersEmbeddedRelationshipTransformerJs);

var _transformersSingleFromManyTransformerJs = require("../transformers/SingleFromManyTransformer.js");

var _transformersSingleFromManyTransformerJs2 = _interopRequireDefault(_transformersSingleFromManyTransformerJs);

var _endpointsLoadedDataEndpointJs = require("../endpoints/LoadedDataEndpoint.js");

var _endpointsLoadedDataEndpointJs2 = _interopRequireDefault(_endpointsLoadedDataEndpointJs);

var _injectorJs = require("../injector.js");

var MapRelationshipDescription = (function (_MultipleRelationshipDescription) {
  function MapRelationshipDescription() {
    _classCallCheck(this, MapRelationshipDescription);

    if (_MultipleRelationshipDescription != null) {
      _MultipleRelationshipDescription.apply(this, arguments);
    }
  }

  _inherits(MapRelationshipDescription, _MultipleRelationshipDescription);

  return MapRelationshipDescription;
})(_MultipleRelationshipDescriptionJs2["default"]);

exports["default"] = MapRelationshipDescription;

(0, _injectorJs.Inject)((0, _injectorJs.factory)(_initializersMapRelationshipInitializerJs2["default"]), (0, _injectorJs.factory)(_mappersMapResourceMapperJs2["default"]), (0, _injectorJs.factory)(_serializersMapResourceSerializerJs2["default"]), _xingInflector2["default"], (0, _injectorJs.factory)(_transformersEmbeddedRelationshipTransformerJs2["default"]), (0, _injectorJs.factory)(_transformersSingleFromManyTransformerJs2["default"]), (0, _injectorJs.factory)(_endpointsLoadedDataEndpointJs2["default"]))(MapRelationshipDescription);
module.exports = exports["default"];