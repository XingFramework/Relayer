"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// XXX This is a nasty but momentarily necessary hack
exports.setXingPromise = setXingPromise;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

var _ResourceJs = require("./Resource.js");

exports.Resource = _interopRequire(_ResourceJs);

var _endpointsJs = require("./endpoints.js");

_defaults(exports, _interopRequireWildcard(_endpointsJs));

var _serializersJs = require("./serializers.js");

_defaults(exports, _interopRequireWildcard(_serializersJs));

var _mappersJs = require("./mappers.js");

_defaults(exports, _interopRequireWildcard(_mappersJs));

var _transformersJs = require("./transformers.js");

_defaults(exports, _interopRequireWildcard(_transformersJs));

var _initializersJs = require("./initializers.js");

_defaults(exports, _interopRequireWildcard(_initializersJs));

var _decoratorsJs = require("./decorators.js");

_defaults(exports, _interopRequireWildcard(_decoratorsJs));

var _relationshipDescriptionsJs = require("./relationshipDescriptions.js");

_defaults(exports, _interopRequireWildcard(_relationshipDescriptionsJs));

var _ListResourceJs = require("./ListResource.js");

exports.ListResource = _interopRequire(_ListResourceJs);

var _PrimaryResourceBuilderJs = require("./PrimaryResourceBuilder.js");

exports.PrimaryResourceBuilder = _interopRequire(_PrimaryResourceBuilderJs);

var _ResourceBuilderJs = require("./ResourceBuilder.js");

exports.ResourceBuilder = _interopRequire(_ResourceBuilderJs);

var _ResourceDescriptionJs = require("./ResourceDescription.js");

Object.defineProperty(exports, "ResourceDescription", {
  enumerable: true,
  get: function get() {
    return _ResourceDescriptionJs.ResourceDescription;
  }
});

var _TransportJs = require("./Transport.js");

exports.Transport = _interopRequire(_TransportJs);

var _UrlHelperJs = require("./UrlHelper.js");

exports.UrlHelper = _interopRequire(_UrlHelperJs);

var _TemplatedUrlJs = require("./TemplatedUrl.js");

_defaults(exports, _interopRequireWildcard(_TemplatedUrlJs));

var _xingPromise = require("xing-promise");

exports.XingPromiseFactory = _interopRequire(_xingPromise);

var _RelationshipUtilitiesJs = require("./RelationshipUtilities.js");

exports.RelationshipUtilities = _interopRequire(_RelationshipUtilitiesJs);

var _xingInflector = require("xing-inflector");

exports.Inflector = _interopRequire(_xingInflector);
var singletons = {};
exports.singletons = singletons;
var XingPromise;exports.XingPromise = XingPromise;

function setXingPromise(xp) {
  exports.XingPromise = XingPromise = xp;
}