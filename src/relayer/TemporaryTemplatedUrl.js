import {TemplatedUrl} from "./TemplatedUrl.js";

export default class TemporaryTemplatedUrl extends TemplatedUrl {

  static get index() {
    this._index = this._index || 1;
    return this._index;
  }

  static set index(index) {
    this._index = index;
    return this._index;
  }

  constructor(uriTemplate) {
    super(uriTemplate);
    var url = this._uriTemplate.fill((varName) => `relayer-${TemporaryTemplatedUrl.index}`);
    TemporaryTemplatedUrl.index += 1;
    this._setUrl(url);
  }

}
