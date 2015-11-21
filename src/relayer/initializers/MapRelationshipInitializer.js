import RelationshipInitializer from "./RelationshipInitializer.js";
import SingleRelationshipInitializer from "./SingleRelationshipInitializer.js";
import {Inject, factory} from "../injector.js";

export default class MapRelationshipInitializer extends RelationshipInitializer {

  constructor(singleRelationshipInitializerFactory,
    ResourceClass,
    initialValues) {
    super(ResourceClass, initialValues);
    this.singleRelationshipInitializerFactory = singleRelationshipInitializerFactory;
  }

  initialize() {
    var relationship = {};
    var response = {};
    if (this.initialValues) {
      Object.keys(this.initialValues).forEach((key) => {
        var singleInitializer = this.singleRelationshipInitializerFactory(this.ResourceClass, this.initialValues[key]);
        var singleRelationship = singleInitializer.initialize();
        relationship[key] = singleRelationship;
        response[key] = singleRelationship.response;
      });
    }
    return relationship;
  }
}

Inject(factory(SingleRelationshipInitializer))(MapRelationshipInitializer);
