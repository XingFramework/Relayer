"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _PrimaryResourceTransformerJs = require("./PrimaryResourceTransformer.js");

var _PrimaryResourceTransformerJs2 = _interopRequireDefault(_PrimaryResourceTransformerJs);

var _SimpleFactoryInjectorJs = require("../SimpleFactoryInjector.js");

var CreateResourceTransformer = (function (_PrimaryResourceTransformer) {
  function CreateResourceTransformer(relationshipDescription, uriTemplate) {
    _classCallCheck(this, _CreateResourceTransformer);

    _get(Object.getPrototypeOf(_CreateResourceTransformer.prototype), "constructor", this).call(this, relationshipDescription);
    this.uriTemplate = uriTemplate;
  }

  _inherits(CreateResourceTransformer, _PrimaryResourceTransformer);

  var _CreateResourceTransformer = CreateResourceTransformer;

  _createClass(_CreateResourceTransformer, [{
    key: "transformResponse",
    value: function transformResponse(endpoint, response) {
      var _this = this;

      return response.then(function (resolvedResponse) {
        var resourceMapper = _this.primaryResourceMapperFactory(endpoint.transport, resolvedResponse.data, _this.relationshipDescription);
        resourceMapper.uriTemplate = _this.uriTemplate;
        var resource = resourceMapper.map();
        resource.templatedUrl.etag = resolvedResponse.etag;
        return resource;
      })["catch"](function (resolvedError) {
        throw _this.primaryResourceMapperFactory(endpoint.transport, resolvedError.data, _this.relationshipDescription, null, true).map();
      });
    }
  }]);

  CreateResourceTransformer = (0, _SimpleFactoryInjectorJs.SimpleFactory)("CreateResourceTransformerFactory", [])(CreateResourceTransformer) || CreateResourceTransformer;
  return CreateResourceTransformer;
})(_PrimaryResourceTransformerJs2["default"]);

exports["default"] = CreateResourceTransformer;
module.exports = exports["default"];