var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();

// naive WeakMap shim
function CreateWeakMapPolyfill() {
  var UUID_SIZE = 16;
  var isNode = typeof global !== "undefined" && Object.prototype.toString.call(global.process) === '[object process]';
  var nodeCrypto = isNode && require("crypto");
  var hasOwn = Object.prototype.hasOwnProperty;
  var keys = {};
  var rootKey = CreateUniqueKey();
  function WeakMap() {
    this._key = CreateUniqueKey();
  }
  WeakMap.prototype = {
    has: function (target) {
      var table = GetOrCreateWeakMapTable(target, false);
      if (table) {
        return this._key in table;
      }
      return false;
    },
    get: function (target) {
      var table = GetOrCreateWeakMapTable(target, false);
      if (table) {
        return table[this._key];
      }
      return undefined;
    },
    set: function (target, value) {
      var table = GetOrCreateWeakMapTable(target, true);
      table[this._key] = value;
      return this;
    },
    delete: function (target) {
      var table = GetOrCreateWeakMapTable(target, false);
      if (table && this._key in table) {
        return delete table[this._key];
      }
      return false;
    },
    clear: function () {
      // NOTE: not a real clear, just makes the previous data unreachable
      this._key = CreateUniqueKey();
    }
  };
  function FillRandomBytes(buffer, size) {
    for (var i = 0; i < size; ++i) {
      buffer[i] = Math.random() * 255 | 0;
    }
  }
  function GenRandomBytes(size) {
    if (nodeCrypto) {
      var data = nodeCrypto.randomBytes(size);
      return data;
    }
    else if (typeof Uint8Array === "function") {
      var data = new Uint8Array(size);
      if (typeof crypto !== "undefined") {
        crypto.getRandomValues(data);
      }
      else if (typeof msCrypto !== "undefined") {
        msCrypto.getRandomValues(data);
      }
      else {
        FillRandomBytes(data, size);
      }
      return data;
    }
    else {
      var data = new Array(size);
      FillRandomBytes(data, size);
      return data;
    }
  }
  function CreateUUID() {
    var data = GenRandomBytes(UUID_SIZE);
    // mark as random - RFC 4122 § 4.4
    data[6] = data[6] & 0x4f | 0x40;
    data[8] = data[8] & 0xbf | 0x80;
    var result = "";
    for (var offset = 0; offset < UUID_SIZE; ++offset) {
      var byte = data[offset];
      if (offset === 4 || offset === 6 || offset === 8) {
        result += "-";
      }
      if (byte < 16) {
        result += "0";
      }
      result += byte.toString(16).toLowerCase();
    }
    return result;
  }
  function CreateUniqueKey() {
    var key;
    do {
      key = "@@WeakMap@@" + CreateUUID();
    } while (hasOwn.call(keys, key));
    keys[key] = true;
    return key;
  }
  function GetOrCreateWeakMapTable(target, create) {
    if (!hasOwn.call(target, rootKey)) {
      if (!create) {
        return undefined;
      }
      Object.defineProperty(target, rootKey, { value: Object.create(null) });
    }
    return target[rootKey];
  }
  return WeakMap;
}

export default _WeakMap;
