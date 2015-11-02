import MultipleRelationshipDescription from "./MultipleRelationshipDescription.js";

export default class MapRelationshipDescription extends MultipleRelationshipDescription {
  static get factoryNames(){
    return [
      'MapRelationshipInitializerFactory',
      'MapResourceMapperFactory',
      'MapResourceSerializerFactory',
      'Inflector',
      'EmbeddedRelationshipTransformerFactory',
      'SingleFromManyTransformerFactory',
      'LoadedDataEndpointFactory'
    ];
  }
}
