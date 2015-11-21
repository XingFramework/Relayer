import Serializer from "./Serializer.js";
import ResourceSerializer from "./ResourceSerializer.js";
import {Inject, factory} from "../injector.js";

export default class MapResourceSerializer extends Serializer {

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

Inject(factory(ResourceSerializer))(MapResourceSerializer);
