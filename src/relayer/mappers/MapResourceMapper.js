import Mapper from "./Mapper.js";

export default class MapResourceMapper extends Mapper {
  static get factoryNames(){
    return ["SingleRelationshipDescriptionFactory"];
  }

  constructor(singleRelationshipDescriptionFactory,
    transport, response, relationshipDescription, useErrors = false) {
    super(transport, response, relationshipDescription, useErrors);
    this.singleRelationshipDescription = singleRelationshipDescriptionFactory("", this.ResourceClass);
  }

  initializeModel() {
    this.mapped = {};
  }

  mapNestedRelationships() {
    Object.keys(this.response).forEach((responseKey) => {
      var response = this.response[responseKey];
      var singleResourceMapper = this.singleRelationshipDescription.mapperFactory(this.transport,
        response, this.singleRelationshipDescription);
      this.mapped[responseKey] = singleResourceMapper.map();
    });
  }

}
