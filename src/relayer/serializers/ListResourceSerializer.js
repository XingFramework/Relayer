import Serializer from "./Serializer.js";

export default class ListResourceSerializer extends Serializer {
  static get factoryNames(){
    return ['ManyResourceSerializerFactory'];
  }

  constructor(manyResourceSerializerFactory,
    resource) {
    super(resource);
    this.manyResourceSerializerFactory = manyResourceSerializerFactory;
  }

  serialize() {
    var data = this.manyResourceSerializerFactory(this.resource).serialize();
    this.resource.resource.pathSet("$.data", data);
    return this.resource.resource.response;
  }
}
