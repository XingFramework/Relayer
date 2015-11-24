"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ResourceMapperJs = require("./ResourceMapper.js");

var _ResourceMapperJs2 = _interopRequireDefault(_ResourceMapperJs);

var _TemplatedUrlJs = require("../TemplatedUrl.js");

var _TemporaryTemplatedUrlJs = require("../TemporaryTemplatedUrl.js");

var _TemporaryTemplatedUrlJs2 = _interopRequireDefault(_TemporaryTemplatedUrlJs);

var _ResourceBuilderJs = require("../ResourceBuilder.js");

var _ResourceBuilderJs2 = _interopRequireDefault(_ResourceBuilderJs);

var _PrimaryResourceBuilderJs = require("../PrimaryResourceBuilder.js");

var _PrimaryResourceBuilderJs2 = _interopRequireDefault(_PrimaryResourceBuilderJs);

var _transformersPrimaryResourceTransformerJs = require("../transformers/PrimaryResourceTransformer.js");

var _transformersPrimaryResourceTransformerJs2 = _interopRequireDefault(_transformersPrimaryResourceTransformerJs);

var _ManyResourceMapperJs = require("./ManyResourceMapper.js");

var _ManyResourceMapperJs2 = _interopRequireDefault(_ManyResourceMapperJs);

var _injectorJs = require("../injector.js");

var ListResourceMapper = (function (_ResourceMapper) {
  function ListResourceMapper(templatedUrlFromUrlFactory, resourceBuilderFactory, primaryResourceBuilderFactory, primaryResourceTransformerFactory, manyResourceMapperFactory, temporaryTemplatedUrlFactory, transport, response, relationshipDescription, endpoint) {
    var useErrors = arguments[10] === undefined ? false : arguments[10];

    _classCallCheck(this, ListResourceMapper);

    _get(Object.getPrototypeOf(ListResourceMapper.prototype), "constructor", this).call(this, templatedUrlFromUrlFactory, resourceBuilderFactory, primaryResourceBuilderFactory, primaryResourceTransformerFactory, transport, response, relationshipDescription, endpoint, useErrors);
    this.temporaryTemplatedUrlFactory = temporaryTemplatedUrlFactory;
    this.manyResourceMapperFactory = manyResourceMapperFactory;
  }

  _inherits(ListResourceMapper, _ResourceMapper);

  _createClass(ListResourceMapper, [{
    key: "ResourceClass",
    get: function () {
      return this.relationshipDescription.ListResourceClass;
    }
  }, {
    key: "ItemResourceClass",
    get: function () {
      return this.relationshipDescription.ResourceClass;
    }
  }, {
    key: "mapNestedRelationships",
    value: function mapNestedRelationships() {
      var _this = this;

      // add mappings for list resource
      _get(Object.getPrototypeOf(ListResourceMapper.prototype), "mapNestedRelationships", this).call(this);

      this.resource = this.mapped;
      var manyResourceMapper = this.manyResourceMapperFactory(this.transport, this.resource.pathGet("$.data"), this.relationshipDescription);
      var uriTemplate = this.resource.pathGet("$.links.template");
      manyResourceMapper.uriTemplate = uriTemplate;
      this.mapped = manyResourceMapper.map();
      this.mapped.resource = this.resource;
      ["url", "uriTemplate", "uriParams"].forEach(function (func) {
        _this.mapped[func] = function () {
          var _resource;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return (_resource = this.resource)[func].apply(_resource, args);
        };
      });
      var mapped = this.mapped;
      ["remove", "update", "load"].forEach(function (func) {
        _this.mapped[func] = function () {
          var _resource$self;

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return (_resource$self = this.resource.self())[func].apply(_resource$self, [mapped].concat(args));
        };
      });
      Object.keys(this.resource.relationships).forEach(function (key) {
        _this.mapped[key] = function () {
          var _resource2;

          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return (_resource2 = this.resource)[key].apply(_resource2, args);
        };
      });

      this.mapped.create = function () {
        var _resource3,
            _this2 = this;

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return (_resource3 = this.resource).create.apply(_resource3, args).then(function (created) {
          _this2.push(created);
          return created;
        });
      };
      var ItemResourceClass = this.ItemResourceClass;
      var temporaryTemplatedUrlFactory = this.temporaryTemplatedUrlFactory;
      this.mapped["new"] = function () {
        var withUrl = arguments[0] === undefined ? false : arguments[0];

        var item = new ItemResourceClass();
        if (withUrl) {
          item.templatedUrl = temporaryTemplatedUrlFactory(uriTemplate);
        }
        return item;
      };
    }
  }]);

  return ListResourceMapper;
})(_ResourceMapperJs2["default"]);

exports["default"] = ListResourceMapper;

(0, _injectorJs.Inject)((0, _injectorJs.factory)(_TemplatedUrlJs.TemplatedUrlFromUrl), (0, _injectorJs.factory)(_ResourceBuilderJs2["default"]), (0, _injectorJs.factory)(_PrimaryResourceBuilderJs2["default"]), (0, _injectorJs.factory)(_transformersPrimaryResourceTransformerJs2["default"]), (0, _injectorJs.factory)(_ManyResourceMapperJs2["default"]), (0, _injectorJs.factory)(_TemporaryTemplatedUrlJs2["default"]))(ListResourceMapper);
module.exports = exports["default"];