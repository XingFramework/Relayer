import MultipleRelationshipDescription from "./MultipleRelationshipDescription.js";
import MapRelationshipInitializer from "../initializers/MapRelationshipInitializer.js";
import MapResourceMapper from "../mappers/MapResourceMapper.js";
import MapResourceSerializer from "../serializers/MapResourceSerializer.js";
import Inflector from "xing-inflector";
import EmbeddedRelationshipTransformer from "../transformers/EmbeddedRelationshipTransformer.js";
import SingleFromManyTransformer from "../transformers/SingleFromManyTransformer.js";
import LoadedDataEndpoint from "../endpoints/LoadedDataEndpoint.js";
import {Inject, factory} from "../injector.js";

export default class MapRelationshipDescription extends MultipleRelationshipDescription {

}

Inject(
  factory(MapRelationshipInitializer),
  factory(MapResourceMapper),
  factory(MapResourceSerializer),
  Inflector,
  factory(EmbeddedRelationshipTransformer),
  factory(SingleFromManyTransformer),
  factory(LoadedDataEndpoint)
)(MapRelationshipDescription);
