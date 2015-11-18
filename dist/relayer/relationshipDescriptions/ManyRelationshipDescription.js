import MultipleRelationshipDescription from "./MultipleRelationshipDescription.js";

export default class ManyRelationshipDescription extends MultipleRelationshipDescription {
  static get factoryNames(){
    return ['ManyRelationshipInitializerFactory',
      'ManyResourceMapperFactory',
      'ManyResourceSerializerFactory',
      'Inflector',
      'EmbeddedRelationshipTransformerFactory',
      'SingleFromManyTransformerFactory',
      'LoadedDataEndpointFactory'];
  }

}
