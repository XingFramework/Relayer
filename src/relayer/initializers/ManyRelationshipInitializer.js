import RelationshipInitializer from "./RelationshipInitializer.js";

export default class ManyRelationshipInitializer extends RelationshipInitializer {
  static get factoryNames() {
    return ['SingleRelationshipInitializerFactory'];
  }

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
