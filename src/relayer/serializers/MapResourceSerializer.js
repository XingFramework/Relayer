import Serializer from "./Serializer.js";

export default class MapResourceSerializer extends Serializer {
  static get factoryNames(){
    return ['ResourceSerializerFactory'];
  }

  constructor(resourceSerializerFactory, resource) {
    super(resource);
    this.resourceSerializerFactory = resourceSerializerFactory;
  }

  serialize() {
    return Object.keys(this.resource).reduce((data, key) => {
      data[key] = this.resourceSerializerFactory(this.resource[key]).serialize();
      return data;
    }, {});
  }
}
