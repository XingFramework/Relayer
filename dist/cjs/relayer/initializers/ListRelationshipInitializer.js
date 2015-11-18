"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _RelationshipInitializerJs = require("./RelationshipInitializer.js");

var _RelationshipInitializerJs2 = _interopRequireDefault(_RelationshipInitializerJs);

var ListRelationshipInitializer = (function (_RelationshipInitializer) {
  function ListRelationshipInitializer(ListResource, manyRelationshipInitializerFactory, ResourceClass, initialValues) {
    _classCallCheck(this, ListRelationshipInitializer);

    _get(Object.getPrototypeOf(ListRelationshipInitializer.prototype), "constructor", this).call(this, ResourceClass, initialValues);

    this.manyRelationshipInitializer = manyRelationshipInitializerFactory(ResourceClass, initialValues);
    this.ListResource = ListResource;
  }

  _inherits(ListRelationshipInitializer, _RelationshipInitializer);

  _createClass(ListRelationshipInitializer, [{
    key: "initialize",
    value: function initialize() {
      var manyRelationships = this.manyRelationshipInitializer.initialize();
      var resource = new this.ListResource({ data: manyRelationships.response, links: {} });
      manyRelationships.resource = resource;
      ["url", "uriTemplate", "uriParams", "create", "remove", "update", "load"].forEach(function (func) {
        manyRelationships[func] = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return resource[func].apply(resource, args);
        };
      });
      return manyRelationships;
    }
  }], [{
    key: "new",
    value: function _new(classMap) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var instance = new (_bind.apply(this, [null].concat([classMap.ListResource, this.buildFactory(classMap, "ManyRelationshipInitializer")], args)))();
      instance.classMap = classMap;
      return instance;
    }
  }]);

  return ListRelationshipInitializer;
})(_RelationshipInitializerJs2["default"]);

exports["default"] = ListRelationshipInitializer;
module.exports = exports["default"];