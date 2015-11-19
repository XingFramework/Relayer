import MultipleRelationshipDescription from "./MultipleRelationshipDescription.js";
import ManyRelationshipInitializer from "../initializers/ManyRelationshipInitializer.js";
import ManyResourceMapper from "../mappers/ManyResourceMapper.js";
import ManyResourceSerializer from "../mappers/ManyResourceSerializer.js";
import Inflector from "xing-inflector";
import EmbeddedRelationshipTransformer from "../transformers/EmbeddedRelationshipTransformer.js";
import SingleFromManyTransformer from "../transformers/SingleFromManyTransformer.js";
import LoadedDataEndpointFactory from "../endpoints/LoadedDataEndpoint.js";

export default class ManyRelationshipDescription extends MultipleRelationshipDescription {
}

Inject(
  factory(ManyRelationshipInitializer),
  factory(ManyResourceMapper),
  factory(ManyesourceSerializer),
  Inflector,
  factory(EmbeddedRelationshipTransformer),
  factory(SingleFromManyTransformer),
  factory(LoadedDataEndpoint)
)(ManyRelationshipDescription);
