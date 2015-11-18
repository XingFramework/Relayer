import Constructable from '../Constructable.js';

export default class RelationshipInitializer extends Constructable {
  constructor(ResourceClass, initialValues) {
    super();
    this.ResourceClass = ResourceClass;
    this.initialValues = initialValues;
  }

  initialize() {
  }

}
