import Serializer from "./Serializer.js";
import ResourceSerializer from "./ResourceSerializer.js";
import {Inject, factory} from "../injectors.js";

export default class ManyResourceSerializer extends Serializer {

  constructor(resourceSerializerFactory, resource) {
    super(resource);
    this.resourceSerializerFactory = resourceSerializerFactory;
  }

  serialize() {
    return this.resource.map((resource) => this.resourceSerializerFactory(resource).serialize());
  }
}

Inject(factory(ResourceSerializer))(ManyResourceSerializer);
