import RelationshipInitializer from "./RelationshipInitializer.js";
import SingleRelationshipInitializer from "./SingleRelationshipInitializer.js";
import {Inject, factory} from "../injector.js";

export default class ManyRelationshipInitializer extends RelationshipInitializer {

  constructor(singleRelationshipInitializerFactory,
    ResourceClass,
    initialValues) {
    super(ResourceClass, initialValues);
    this.singleRelationshipInitializerFactory = singleRelationshipInitializerFactory;
  }

  initialize() {
    var relationship = [];
    var response = [];
    if (this.initialValues) {
      this.initialValues.forEach((initialValue) => {
        var singleInitializer = this.singleRelationshipInitializerFactory(this.ResourceClass, initialValue);
        var singleRelationship = singleInitializer.initialize();
        relationship.push(singleRelationship);
        response.push(singleRelationship.response);
      });
    }
    return relationship;
  }
}

Inject(factory(SingleRelationshipInitializer))(ManyRelationshipInitializer);
