export default class Constructable {
  // A little Rubyism, with very nice qualities
  static new(classMap, ...args) {
    var instance = new this(...this.buildInjectors(classMap), ...args);
    instance.classMap = classMap;
    return instance;
  }

  static buildInjectors(classMap) {
    var factoryNames = this.factoryNames;
    return factoryNames.map((name) => {
      if(classMap[name]){
        return this.buildSingleton(classMap, name);
      } else {
        let noFac = name.replace(/factory$/i, "");
        if(classMap[noFac]){
          name = noFac;
          return this.buildFactory(classMap, noFac);
        } else {
          return null;
        }
      }
    });
  }

  static buildSingleton(classMap, name) {
    if(!classMap.singletons){ classMap.singletons = {}; }
    if(!classMap.singletons[name]){
      // this loses the full general case of NG services, but we don't care
      classMap.singletons[name] = new classMap[name]();
    }
    return classMap.singletons[name];
  }

  static buildFactory(classMap, name) {
    var namedClass = classMap[name];
    return (...args) => {
      return namedClass.new(classMap, ...args);
    };
  }

  static get factoryNames() {
    return [];
  }

  /*
  constructor(classMap) {
    this.classMap = classMap;
  }
  */

  construct(className, ...args) {
    return this.classMap[className].new(this.classMap, ...args);
  }
}
