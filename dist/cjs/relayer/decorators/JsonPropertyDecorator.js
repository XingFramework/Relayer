"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ResourceDecoratorJs = require("./ResourceDecorator.js");

var _ResourceDecoratorJs2 = _interopRequireDefault(_ResourceDecoratorJs);

var _endpointsLoadedDataEndpointJs = require("../endpoints/LoadedDataEndpoint.js");

var _endpointsLoadedDataEndpointJs2 = _interopRequireDefault(_endpointsLoadedDataEndpointJs);

var _transformersEmbeddedPropertyTransformerJs = require("../transformers/EmbeddedPropertyTransformer.js");

var _transformersEmbeddedPropertyTransformerJs2 = _interopRequireDefault(_transformersEmbeddedPropertyTransformerJs);

var _endpointsPromiseEndpointJs = require("../endpoints/PromiseEndpoint.js");

var _endpointsPromiseEndpointJs2 = _interopRequireDefault(_endpointsPromiseEndpointJs);

var _injectorJs = require("../injector.js");

var JsonPropertyDecorator = (function (_ResourceDecorator) {
  function JsonPropertyDecorator(loadedDataEndpointFactory, embeddedPropertyTransformerFactory, promiseEndpointFactory, name, path, value, options) {
    _classCallCheck(this, JsonPropertyDecorator);

    _get(Object.getPrototypeOf(JsonPropertyDecorator.prototype), "constructor", this).call(this, name);

    this.path = path;
    this.options = options || {};
    this.loadedDataEndpointFactory = loadedDataEndpointFactory;
    this.embeddedPropertyTransformerFactory = embeddedPropertyTransformerFactory;
    this.promiseEndpointFactory = promiseEndpointFactory;
    this.value = value;
  }

  _inherits(JsonPropertyDecorator, _ResourceDecorator);

  _createClass(JsonPropertyDecorator, [{
    key: "recordApply",
    value: function recordApply(target) {
      target.constructor.properties[this.name] = this.path;
      if (!target.hasOwnProperty(this.name)) {
        var afterSet = this.options.afterSet;
        var path = this.path;

        Object.defineProperty(target, this.name, {
          enumerable: true,
          configurable: true,
          get: function get() {
            return this.pathGet(path);
          },
          set: function set(value) {
            var result = this.pathSet(path, value);
            if (afterSet) {
              afterSet.call(this);
            }
            return result;
          }
        });
      }
    }
  }, {
    key: "resourceApply",
    value: function resourceApply(resource) {
      if (this.value !== undefined) {
        resource.setInitialValue(this.path, this.value);
      }
      this.recordApply(resource);
    }
  }, {
    key: "errorsApply",
    value: function errorsApply(errors) {
      this.recordApply(errors);
    }
  }, {
    key: "endpointFn",
    get: function () {

      if (!this._endpointFn) {

        var path = this.path;
        var promiseEndpointFactory = this.promiseEndpointFactory;
        var loadedDataEndpointFactory = this.loadedDataEndpointFactory;
        var embeddedPropertyTransformerFactory = this.embeddedPropertyTransformerFactory;
        this._endpointFn = function () {
          var _this = this;

          var uriParams = arguments[0] === undefined ? {} : arguments[0];

          // 'this' in here = Endpoint

          var newPromise = function newPromise() {
            return _this.load().then(function (resource) {
              return loadedDataEndpointFactory(resource.self(), resource, [embeddedPropertyTransformerFactory(path)]);
            });
          };

          var newEndpoint = promiseEndpointFactory(newPromise);

          return newEndpoint;
        };
      }

      return this._endpointFn;
    }
  }, {
    key: "endpointApply",
    value: function endpointApply(target) {
      this.addFunction(target, this.endpointFn);
    }
  }]);

  return JsonPropertyDecorator;
})(_ResourceDecoratorJs2["default"]);

exports["default"] = JsonPropertyDecorator;

(0, _injectorJs.Inject)((0, _injectorJs.factory)(_endpointsLoadedDataEndpointJs2["default"]), (0, _injectorJs.factory)(_transformersEmbeddedPropertyTransformerJs2["default"]), (0, _injectorJs.factory)(_endpointsPromiseEndpointJs2["default"]))(JsonPropertyDecorator);
module.exports = exports["default"];