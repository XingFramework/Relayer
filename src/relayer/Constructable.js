export default class Object {
  // A little Rubism, with very nice qualities
  static new(...args) {
    return new this(...args);
  }

  constructor(classMap) {
    this.classMap = classMap;
  }

  construct(className, ...args) {
    return this.classMap[className].new(this.classMap, ...args);
  }
}
