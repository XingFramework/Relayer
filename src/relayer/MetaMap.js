import _WeakMap from "./WeakMap.js";

export default class MetaMap {
  constructor() {
  this._metadataMap = new _WeakMap();
  }

  _getOrCreateMetadata(target) {
  var metadata = this._metadataMap.get(target);
  if (!metadata) {
    metadata = new Map();
    this._metadataMap.set(target, metadata);
  }
  return metadata;
  }

  defineMetadata(key, value, target) {
  this._getOrCreateMetadata(target).set(key, value);
  }

  hasMetadata(key, target) {
  return this._getOrCreateMetadata(target).has(key)
  }

  getMetadata(key, target) {
  return this._getOrCreateMetadata(target).get(key);
  }

  deleteMetadata(key, target) {
  this._getOrCreateMetadata(target).delete(key);
  }
}
