import RelationshipInitializer from "./RelationshipInitializer.js";
import ListResource from "../ListResource.js";
import ManyRelationshipInitializer from "./ManyRelationshipInitializer.js";
import {Inject, factory, value} from "../injector.js";

export default class ListRelationshipInitializer extends RelationshipInitializer {

  constructor(ListResource,
    manyRelationshipInitializerFactory,
    ResourceClass,
    initialValues) {

    super(ResourceClass, initialValues);

    this.manyRelationshipInitializer = manyRelationshipInitializerFactory(ResourceClass, initialValues);
    this.ListResource = ListResource;
  }

  initialize() {
    var manyRelationships = this.manyRelationshipInitializer.initialize();
    var resource = new this.ListResource({data: manyRelationships.response, links: {}});
    manyRelationships.resource = resource;
    ["url", "uriTemplate", "uriParams", "create", "remove", "update", "load"].forEach((func) => {
      manyRelationships[func] = function(...args) {
        return resource[func](...args);
      };
    });
    return manyRelationships;
  }
}

Inject(value(ListResource), factory(ManyRelationshipInitializer))(ListRelationshipInitializer);
