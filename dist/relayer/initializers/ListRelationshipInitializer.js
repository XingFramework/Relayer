import RelationshipInitializer from "./RelationshipInitializer.js";

export default class ListRelationshipInitializer extends RelationshipInitializer {
  static new(classMap, ...args){
    var instance = new this(
      classMap.ListResource,
      this.buildFactory(classMap, "ManyRelationshipInitializer"),
      ...args);
    instance.classMap = classMap;
    return instance;
  }

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
