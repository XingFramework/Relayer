"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constructable = (function () {
  function Constructable() {
    _classCallCheck(this, Constructable);
  }

  _createClass(Constructable, [{
    key: "construct",

    /*
    constructor(classMap) {
      this.classMap = classMap;
    }
    */

    value: function construct(className) {
      var _classMap$className;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_classMap$className = this.classMap[className])["new"].apply(_classMap$className, [this.classMap].concat(args));
    }
  }], [{
    key: "new",

    // A little Rubyism, with very nice qualities
    value: function _new(classMap) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var instance = new (_bind.apply(this, [null].concat(_toConsumableArray(this.buildInjectors(classMap)), args)))();
      instance.classMap = classMap;
      return instance;
    }
  }, {
    key: "buildInjectors",
    value: function buildInjectors(classMap) {
      var _this = this;

      var factoryNames = this.factoryNames;
      return factoryNames.map(function (name) {
        if (classMap[name]) {
          return _this.buildSingleton(classMap, name);
        } else {
          var noFac = name.replace(/factory$/i, "");
          if (classMap[noFac]) {
            name = noFac;
            return _this.buildFactory(classMap, noFac);
          } else {
            return null;
          }
        }
      });
    }
  }, {
    key: "buildSingleton",
    value: function buildSingleton(classMap, name) {
      if (!classMap.singletons) {
        classMap.singletons = {};
      }
      if (!classMap.singletons[name]) {
        // this loses the full general case of NG services, but we don't care
        classMap.singletons[name] = new classMap[name]();
      }
      return classMap.singletons[name];
    }
  }, {
    key: "buildFactory",
    value: function buildFactory(classMap, name) {
      var namedClass = classMap[name];
      return function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return namedClass["new"].apply(namedClass, [classMap].concat(args));
      };
    }
  }, {
    key: "factoryNames",
    get: function () {
      return [];
    }
  }]);

  return Constructable;
})();

exports["default"] = Constructable;
module.exports = exports["default"];