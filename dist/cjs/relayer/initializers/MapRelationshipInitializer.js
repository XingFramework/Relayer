"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _RelationshipInitializerJs = require("./RelationshipInitializer.js");

var _RelationshipInitializerJs2 = _interopRequireDefault(_RelationshipInitializerJs);

var _SingleRelationshipInitializerJs = require("./SingleRelationshipInitializer.js");

var _SingleRelationshipInitializerJs2 = _interopRequireDefault(_SingleRelationshipInitializerJs);

var _injectorJs = require("../injector.js");

var MapRelationshipInitializer = (function (_RelationshipInitializer) {
  function MapRelationshipInitializer(singleRelationshipInitializerFactory, ResourceClass, initialValues) {
    _classCallCheck(this, MapRelationshipInitializer);

    _get(Object.getPrototypeOf(MapRelationshipInitializer.prototype), "constructor", this).call(this, ResourceClass, initialValues);
    this.singleRelationshipInitializerFactory = singleRelationshipInitializerFactory;
  }

  _inherits(MapRelationshipInitializer, _RelationshipInitializer);

  _createClass(MapRelationshipInitializer, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      var relationship = {};
      var response = {};
      if (this.initialValues) {
        Object.keys(this.initialValues).forEach(function (key) {
          var singleInitializer = _this.singleRelationshipInitializerFactory(_this.ResourceClass, _this.initialValues[key]);
          var singleRelationship = singleInitializer.initialize();
          relationship[key] = singleRelationship;
          response[key] = singleRelationship.response;
        });
      }
      return relationship;
    }
  }]);

  return MapRelationshipInitializer;
})(_RelationshipInitializerJs2["default"]);

exports["default"] = MapRelationshipInitializer;

(0, _injectorJs.Inject)((0, _injectorJs.factory)(_SingleRelationshipInitializerJs2["default"]))(MapRelationshipInitializer);
module.exports = exports["default"];