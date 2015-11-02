import Serializer from "./Serializer.js";

export default class ManyResourceSerializer extends Serializer {
  static get factoryNames(){
    return ['ResourceSerializerFactory'];
  }

  constructor(resourceSerializerFactory, resource) {
    super(resource);
    this.resourceSerializerFactory = resourceSerializerFactory;
  }

  serialize() {
    return this.resource.map((resource) => this.resourceSerializerFactory(resource).serialize());
  }
}
