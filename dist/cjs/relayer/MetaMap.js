"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MetaMap = (function () {
  function MetaMap() {
    _classCallCheck(this, MetaMap);

    this._metadataMap = new Map();
  }

  _createClass(MetaMap, [{
    key: "_getOrCreateMetadata",
    value: function _getOrCreateMetadata(target) {
      var metadata = this._metadataMap.get(target);
      if (!metadata) {
        metadata = new Map();
        this._metadataMap.set(target, metadata);
      }
      return metadata;
    }
  }, {
    key: "defineMetadata",
    value: function defineMetadata(key, value, target) {
      this._getOrCreateMetadata(target).set(key, value);
    }
  }, {
    key: "hasMetadata",
    value: function hasMetadata(key, target) {
      return this._getOrCreateMetadata(target).has(key);
    }
  }, {
    key: "getMetadata",
    value: function getMetadata(key, target) {
      return this._getOrCreateMetadata(target).get(key);
    }
  }, {
    key: "deleteMetadata",
    value: function deleteMetadata(key, target) {
      this._getOrCreateMetadata(target)["delete"](key);
    }
  }]);

  return MetaMap;
})();

exports["default"] = MetaMap;
module.exports = exports["default"];