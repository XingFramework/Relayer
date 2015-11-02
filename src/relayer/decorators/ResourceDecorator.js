import Constructable from '../Constructable.js';

export default class ResourceDecorator extends Constructable {
  constructor(name){
    super();
    this.name = name;
  }

  addFunction(target, func){
    if (!(target.hasOwnProperty(this.name))) {
      target[this.name] = func;
    }
  }

  resourceApply(resource){
    //no-op
  }

  errorsApply(errors){
    //no-op
  }

  endpointApply(endpoint){
    //no-op
  }
}
