import RelationshipInitializer from "./RelationshipInitializer.js";
import ListResource from "../ListResource.js";
import ListDecorator from "../ListDecorator.js";
import ManyRelationshipInitializer from "./ManyRelationshipInitializer.js";
import {Inject, factory, value, singleton} from "../injector.js";

export default class ListRelationshipInitializer extends RelationshipInitializer {

  constructor(ListResource,
    manyRelationshipInitializerFactory,
    listDecorator,
    ResourceClass,
    initialValues) {

    super(ResourceClass, initialValues);

    this.manyRelationshipInitializer = manyRelationshipInitializerFactory(ResourceClass, initialValues);
    this.ListResource = ListResource;
    this.listDecorator = listDecorator;
  }

  initialize() {
    var manyRelationships = this.manyRelationshipInitializer.initialize();
    var resource = new this.ListResource({data: manyRelationships.response, links: {}});
    this.listDecorator.decorate(manyRelationships, resource, this.ListResource.ItemResourceClass);
    return manyRelationships;
  }
}

Inject(value(ListResource), factory(ManyRelationshipInitializer), singleton(ListDecorator))(ListRelationshipInitializer);
