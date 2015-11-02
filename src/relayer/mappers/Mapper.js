import Constructable from '../Constructable.js';
export default class Mapper extends Constructable {
  constructor(transport, response, relationshipDescription, useErrors = false) {
    super();
    this.transport = transport;
    this.response = response;
    this.relationshipDescription = relationshipDescription;
    this.useErrors = useErrors;
  }

  get ResourceClass() {
    if (this.useErrors) {
      return this.relationshipDescription.ResourceClass.errorClass;
    } else {
      return this.relationshipDescription.ResourceClass;
    }
  }

  get mapperFactory() {
    return this.relationshipDescription.mapperFactory;
  }

  get serializerFactory() {
    return this.relationshipDescription.serializerFactory;
  }

  map() {
    this.initializeModel();
    this.mapNestedRelationships();
    return this.mapped;
  }
}
