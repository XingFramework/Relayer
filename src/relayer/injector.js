import {} from 'reflect-metadata';

function metadataValueOrCall(key, target, cb) {
  if (Reflect.hasOwnMetadata(key, target)) {
    return Reflect.getMetadata(key, target);
  } else {
    var value = cb();
    Reflect.defineMetadata(key, value, target);
    return value;
  }
}

export function Inject(...dependencies) {
  return function(target) {
    Reflect.defineMetadata('injectables', dependencies, target);
  }
}

export function factory(Target) {
  return metadataValueOrCall('factory', Target, () => {
    return new FactoryInjectable(Target);
  });
}

export function value(Target) {
  return metadataValueOrCall('value', Target, () => {
    return new ValueInjectable(Target);
  });
}

export function singleton(Target) {
  return metadataValueOrCall('singleton', Target, () => {
    return new SingletonInjectable(Target);
  });
}

export function instance(Target) {
  return metadataValueOrCall('instance', Target, () => {
    return new InstanceInjectable(Target);
  });
}

class Injectable {
  constructor() {

  }

  instantiate(...args) {
    return metadataValueOrCall('instantiated', this, () => {
      var instantiated = this._instantiate(...args)
      injector.recordInstantiation(instantiated);
      return instantiated;
    });
  }
}

class ValueInjectable extends Injectable {

  constructor(value) {
    super();
    this.value = value;
  }

  _instantiate() {
    return this.value;
  }
}

class FactoryInjectable extends Injectable {

  constructor(Target) {
    super();
    this.Target = Target;
  }

  _instantiate() {
    return (...args) => injector.instantiate(instance(this.Target), ...args);
  }
}

class ConstructableInjectable extends Injectable {
  constructor(Target) {
    super();
    this.Target = Target;
  }

  _instantiate(...args) {
    var finalArgs;
    if (Reflect.hasOwnMetadata('injectables', this.Target)) {
      var instantiatedInjectables = injector.instantiateInjectables(Reflect.getMetadata('injectables', this.Target));
      finalArgs = instantiatedInjectables.concat(args);
    } else {
      finalArgs = args;
    }
    return new this.Target(...finalArgs);
  }
}

class SingletonInjectable extends ConstructableInjectable {

}

class InstanceInjectable extends ConstructableInjectable {
  instantiate(...args) {
    return this._instantiate(...args);
  }
}

class Injector {
  constructor() {
    this._instantiations = [];
  }

  recordInstantiation(instantiated) {
    this._instantiations.push(instantiated);
  }

  reset() {
    this._instantiations.forEach((instantiated) => Reflect.deleteMetadata("instantiated", instantiated));
  }

  instantiateInjectables(injectables) {
    return injectables.map((injectable) => {
      return this.instantiate(injectable);
    });
  }

  instantiate(Target, ...args) {
    var injectable;
    if (!(Target instanceof Injectable)) {
      injectable = singleton(Target);
    } else {
      injectable = Target;
    }
    return injectable.instantiate(...args);
  }

  get XingPromise() {
    this._XingPromise = this._XingPromise || new ValueInjectable();
    return this._XingPromise;
  }
}

var injector = new Injector();

export default injector;
