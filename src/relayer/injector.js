import 'reflect-metadata';

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

function metadataValueOrCall(key, target, cb) {
  if (Reflect.hasMetadata(key, target)) {
    return Reflect.getMetadata(key, target);
  } else {
    var value = cb();
    Reflect.defineMetadata(key, value, target);
    return value;
  }
}

class Injectable {
  constructor() {

  }

  instantiate(...args) {
    metadataValueOrCall('instantiated', this, () => this._instantiate(...args));
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
    return function(...args) {
      return injector.instantiate(Target, ...args);
    };
  }
}

class SingletonInjectable extends Injectable {
  constructor(Target) {
    super();
    this.Target = Target;
  }

  _instantiate(...args) {
    if (Reflect.hasMetadata('injectables', Target)) {
      var instantiatedInjectables = injector.instantiateInjectables(Reflect.getMetadata('injectables', Target));
      finalArgs = instantiatedInjectables.concat(args);
    } else {
      finalArgs = args;
    }
    return new Target(...finalArgs);
  }
}

var injector = {
  instantiateInjectables(injectables) {
    return injectables.map((injectable) => {
      return this.instantiate(injectable);
    });
  }

  instantiate(Target, ...args) {
    var injectable;
    if !(Target instanceof Injectable) {
      injectable = singleton(Target);
    } else {
      injectable = Target;
    }
    return injectable.instantiate(...args);
  }
}

export default injector;
