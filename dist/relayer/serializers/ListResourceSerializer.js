import Serializer from "./Serializer.js";
import ManyResourceSerializer from "./ManyResourceSerializer.js";
import {Inject, factory} from "../injector.js";

export default class ListResourceSerializer extends Serializer {

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

Inject(factory(ManyResourceSerializer))(ListResourceSerializer);
