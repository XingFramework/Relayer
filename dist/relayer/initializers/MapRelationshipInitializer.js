import RelationshipInitializer from "./RelationshipInitializer.js";

export default class MapRelationshipInitializer extends RelationshipInitializer {
  static get factoryNames(){
    return ['SingleRelationshipInitializerFactory'];
  }

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
