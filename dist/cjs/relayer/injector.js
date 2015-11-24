'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _bind = Function.prototype.bind;

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.Inject = Inject;
exports.factory = factory;
exports.value = value;
exports.singleton = singleton;
exports.instance = instance;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _MetaMapJs = require('./MetaMap.js');

var _MetaMapJs2 = _interopRequireDefault(_MetaMapJs);

var metaMap = new _MetaMapJs2['default']();

function metadataValueOrCall(key, target, cb) {
  if (metaMap.hasMetadata(key, target)) {
    return metaMap.getMetadata(key, target);
  } else {
    var value = cb();
    metaMap.defineMetadata(key, value, target);
    return value;
  }
}

function Inject() {
  for (var _len = arguments.length, dependencies = Array(_len), _key = 0; _key < _len; _key++) {
    dependencies[_key] = arguments[_key];
  }

  return function (target) {
    metaMap.defineMetadata('injectables', dependencies, target);
  };
}

function factory(Target) {
  return metadataValueOrCall('factory', Target, function () {
    return new FactoryInjectable(Target);
  });
}

function value(Target) {
  return metadataValueOrCall('value', Target, function () {
    return new ValueInjectable(Target);
  });
}

function singleton(Target) {
  return metadataValueOrCall('singleton', Target, function () {
    return new SingletonInjectable(Target);
  });
}

function instance(Target) {
  return metadataValueOrCall('instance', Target, function () {
    return new InstanceInjectable(Target);
  });
}

var Injectable = (function () {
  function Injectable() {
    _classCallCheck(this, Injectable);
  }

  _createClass(Injectable, [{
    key: 'instantiate',
    value: function instantiate() {
      var _this = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return metadataValueOrCall('instantiated', this, function () {
        var instantiated = _this._instantiate.apply(_this, args);
        injector.recordInstantiation(instantiated);
        return instantiated;
      });
    }
  }]);

  return Injectable;
})();

var ValueInjectable = (function (_Injectable) {
  function ValueInjectable(value) {
    _classCallCheck(this, ValueInjectable);

    _get(Object.getPrototypeOf(ValueInjectable.prototype), 'constructor', this).call(this);
    this.value = value;
  }

  _inherits(ValueInjectable, _Injectable);

  _createClass(ValueInjectable, [{
    key: '_instantiate',
    value: function _instantiate() {
      return this.value;
    }
  }]);

  return ValueInjectable;
})(Injectable);

var FactoryInjectable = (function (_Injectable2) {
  function FactoryInjectable(Target) {
    _classCallCheck(this, FactoryInjectable);

    _get(Object.getPrototypeOf(FactoryInjectable.prototype), 'constructor', this).call(this);
    this.Target = Target;
  }

  _inherits(FactoryInjectable, _Injectable2);

  _createClass(FactoryInjectable, [{
    key: '_instantiate',
    value: function _instantiate() {
      var _this2 = this;

      return function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return injector.instantiate.apply(injector, [instance(_this2.Target)].concat(args));
      };
    }
  }]);

  return FactoryInjectable;
})(Injectable);

var ConstructableInjectable = (function (_Injectable3) {
  function ConstructableInjectable(Target) {
    _classCallCheck(this, ConstructableInjectable);

    _get(Object.getPrototypeOf(ConstructableInjectable.prototype), 'constructor', this).call(this);
    this.Target = Target;
  }

  _inherits(ConstructableInjectable, _Injectable3);

  _createClass(ConstructableInjectable, [{
    key: '_instantiate',
    value: function _instantiate() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var finalArgs;
      if (metaMap.hasMetadata('injectables', this.Target)) {
        var instantiatedInjectables = injector.instantiateInjectables(metaMap.getMetadata('injectables', this.Target));
        finalArgs = instantiatedInjectables.concat(args);
      } else {
        finalArgs = args;
      }
      return new (_bind.apply(this.Target, [null].concat(_toConsumableArray(finalArgs))))();
    }
  }]);

  return ConstructableInjectable;
})(Injectable);

var SingletonInjectable = (function (_ConstructableInjectable) {
  function SingletonInjectable() {
    _classCallCheck(this, SingletonInjectable);

    if (_ConstructableInjectable != null) {
      _ConstructableInjectable.apply(this, arguments);
    }
  }

  _inherits(SingletonInjectable, _ConstructableInjectable);

  return SingletonInjectable;
})(ConstructableInjectable);

var InstanceInjectable = (function (_ConstructableInjectable2) {
  function InstanceInjectable() {
    _classCallCheck(this, InstanceInjectable);

    if (_ConstructableInjectable2 != null) {
      _ConstructableInjectable2.apply(this, arguments);
    }
  }

  _inherits(InstanceInjectable, _ConstructableInjectable2);

  _createClass(InstanceInjectable, [{
    key: 'instantiate',
    value: function instantiate() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this._instantiate.apply(this, args);
    }
  }]);

  return InstanceInjectable;
})(ConstructableInjectable);

var Injector = (function () {
  function Injector() {
    _classCallCheck(this, Injector);

    this._instantiations = [];
  }

  _createClass(Injector, [{
    key: 'recordInstantiation',
    value: function recordInstantiation(instantiated) {
      this._instantiations.push(instantiated);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._instantiations.forEach(function (instantiated) {
        return metaMap.deleteMetadata('instantiated', instantiated);
      });
    }
  }, {
    key: 'instantiateInjectables',
    value: function instantiateInjectables(injectables) {
      var _this3 = this;

      return injectables.map(function (injectable) {
        return _this3.instantiate(injectable);
      });
    }
  }, {
    key: 'instantiate',
    value: function instantiate(Target) {
      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      var injectable;
      if (!(Target instanceof Injectable)) {
        injectable = singleton(Target);
      } else {
        injectable = Target;
      }
      return injectable.instantiate.apply(injectable, args);
    }
  }, {
    key: 'XingPromise',
    get: function () {
      this._XingPromise = this._XingPromise || new ValueInjectable();
      return this._XingPromise;
    }
  }]);

  return Injector;
})();

var injector = new Injector();

exports['default'] = injector;