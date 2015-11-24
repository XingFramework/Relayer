import MultipleRelationshipDescription from "./MultipleRelationshipDescription.js";
import ManyRelationshipInitializer from "../initializers/ManyRelationshipInitializer.js";
import ManyResourceMapper from "../mappers/ManyResourceMapper.js";
import ManyResourceSerializer from "../serializers/ManyResourceSerializer.js";
import Inflector from "xing-inflector";
import EmbeddedRelationshipTransformer from "../transformers/EmbeddedRelationshipTransformer.js";
import SingleFromManyTransformer from "../transformers/SingleFromManyTransformer.js";
import LoadedDataEndpoint from "../endpoints/LoadedDataEndpoint.js";
import {Inject, factory} from "../injector.js";

export default class ManyRelationshipDescription extends MultipleRelationshipDescription {
}

Inject(
  factory(ManyRelationshipInitializer),
  factory(ManyResourceMapper),
  factory(ManyResourceSerializer),
  Inflector,
  factory(EmbeddedRelationshipTransformer),
  factory(SingleFromManyTransformer),
  factory(LoadedDataEndpoint)
)(ManyRelationshipDescription);
