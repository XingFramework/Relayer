import Constructable from '../Constructable.js';

export default class Serializer extends Constructable {
  constructor(resource) {
    super();
    this.resource = resource;
  }

  //override
  serialize() {

  }
}
