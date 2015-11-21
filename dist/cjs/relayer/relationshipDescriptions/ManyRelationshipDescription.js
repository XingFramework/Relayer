"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _MultipleRelationshipDescriptionJs = require("./MultipleRelationshipDescription.js");

var _MultipleRelationshipDescriptionJs2 = _interopRequireDefault(_MultipleRelationshipDescriptionJs);

var _initializersManyRelationshipInitializerJs = require("../initializers/ManyRelationshipInitializer.js");

var _initializersManyRelationshipInitializerJs2 = _interopRequireDefault(_initializersManyRelationshipInitializerJs);

var _mappersManyResourceMapperJs = require("../mappers/ManyResourceMapper.js");

var _mappersManyResourceMapperJs2 = _interopRequireDefault(_mappersManyResourceMapperJs);

var _serializersManyResourceSerializerJs = require("../serializers/ManyResourceSerializer.js");

var _serializersManyResourceSerializerJs2 = _interopRequireDefault(_serializersManyResourceSerializerJs);

var _xingInflector = require("xing-inflector");

var _xingInflector2 = _interopRequireDefault(_xingInflector);

var _transformersEmbeddedRelationshipTransformerJs = require("../transformers/EmbeddedRelationshipTransformer.js");

var _transformersEmbeddedRelationshipTransformerJs2 = _interopRequireDefault(_transformersEmbeddedRelationshipTransformerJs);

var _transformersSingleFromManyTransformerJs = require("../transformers/SingleFromManyTransformer.js");

var _transformersSingleFromManyTransformerJs2 = _interopRequireDefault(_transformersSingleFromManyTransformerJs);

var _endpointsLoadedDataEndpointJs = require("../endpoints/LoadedDataEndpoint.js");

var _endpointsLoadedDataEndpointJs2 = _interopRequireDefault(_endpointsLoadedDataEndpointJs);

var _injectorJs = require("../injector.js");

var ManyRelationshipDescription = (function (_MultipleRelationshipDescription) {
  function ManyRelationshipDescription() {
    _classCallCheck(this, ManyRelationshipDescription);

    if (_MultipleRelationshipDescription != null) {
      _MultipleRelationshipDescription.apply(this, arguments);
    }
  }

  _inherits(ManyRelationshipDescription, _MultipleRelationshipDescription);

  return ManyRelationshipDescription;
})(_MultipleRelationshipDescriptionJs2["default"]);

exports["default"] = ManyRelationshipDescription;

(0, _injectorJs.Inject)((0, _injectorJs.factory)(_initializersManyRelationshipInitializerJs2["default"]), (0, _injectorJs.factory)(_mappersManyResourceMapperJs2["default"]), (0, _injectorJs.factory)(_serializersManyResourceSerializerJs2["default"]), _xingInflector2["default"], (0, _injectorJs.factory)(_transformersEmbeddedRelationshipTransformerJs2["default"]), (0, _injectorJs.factory)(_transformersSingleFromManyTransformerJs2["default"]), (0, _injectorJs.factory)(_endpointsLoadedDataEndpointJs2["default"]))(ManyRelationshipDescription);
module.exports = exports["default"];